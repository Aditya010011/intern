
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { generateCodeFeedback } from '@/services/openaiService';

interface CodeEditorProps {
  defaultLanguage?: 'javascript' | 'python' | 'java' | 'cpp';
}

export const CodeEditor = ({ defaultLanguage = 'javascript' }: CodeEditorProps) => {
  const [code, setCode] = useState('// Write your code here');
  const [language, setLanguage] = useState<'javascript' | 'python' | 'java' | 'cpp'>(defaultLanguage);
  const [output, setOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [feedback, setFeedback] = useState('');
  const { toast } = useToast();

  // Sample language templates
  useEffect(() => {
    const templates = {
      javascript: '// JavaScript example\nfunction greet(name) {\n  return `Hello, ${name}!`;\n}\n\nconsole.log(greet("World"));',
      python: '# Python example\ndef greet(name):\n    return f"Hello, {name}!"\n\nprint(greet("World"))',
      java: '// Java example\npublic class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello, World!");\n    }\n}',
      cpp: '// C++ example\n#include <iostream>\n\nint main() {\n    std::cout << "Hello, World!" << std::endl;\n    return 0;\n}'
    };
    
    setCode(templates[language]);
    setOutput('');
    setFeedback('');
  }, [language]);

  const handleRunCode = () => {
    setIsRunning(true);
    
    // This is a simple simulation of code execution
    // In a real implementation, you would use a sandboxed execution environment
    try {
      let simulatedOutput = '';
      
      // Simplified simulation based on language
      if (language === 'javascript') {
        // Simple and very limited JS execution simulation
        if (code.includes('console.log')) {
          // Extract content inside console.log's parentheses 
          const match = code.match(/console\.log\((.*)\)/);
          if (match && match[1]) {
            let value = match[1];
            // Handle string literals
            if ((value.startsWith('"') && value.endsWith('"')) || 
                (value.startsWith("'") && value.endsWith("'"))) {
              value = value.slice(1, -1);
            }
            // Very simple string template handling
            if (value.includes('`') && value.includes('${')) {
              value = value.replace(/`(.*)\${(.*)}(.*)`/, (_, before, expr, after) => {
                if (expr.trim() === 'name') {
                  return `${before}World${after}`;
                }
                return `${before}${expr}${after}`;
              });
            }
            simulatedOutput = value;
          }
        }
      } else if (language === 'python') {
        // Simulate Python print output
        if (code.includes('print')) {
          const match = code.match(/print\((.*)\)/);
          if (match && match[1]) {
            simulatedOutput = match[1].replace(/["']/g, '');
            // Very simple f-string handling
            if (simulatedOutput.includes('f"') || simulatedOutput.includes("f'")) {
              simulatedOutput = simulatedOutput.replace(/f["'](.*)\{(.*)\}(.*)["']/, (_, before, expr, after) => {
                if (expr.trim() === 'name') {
                  return `${before}World${after}`;
                }
                return `${before}${expr}${after}`;
              });
            }
          }
        }
      } else {
        // For other languages, just return Hello, World!
        simulatedOutput = "Hello, World!";
      }
      
      setOutput(simulatedOutput);
      
      toast({
        title: "Code executed",
        description: "Your code was executed successfully.",
      });
    } catch (error) {
      console.error('Error executing code:', error);
      setOutput('Error executing code. Please try again.');
      
      toast({
        title: "Execution Error",
        description: "There was a problem running your code.",
        variant: "destructive"
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleAnalyzeCode = async () => {
    setIsAnalyzing(true);
    
    try {
      const feedbackText = await generateCodeFeedback(code, language);
      setFeedback(feedbackText);
    } catch (error) {
      console.error('Error analyzing code:', error);
      setFeedback('Error analyzing your code. Please try again later.');
      
      toast({
        title: "Analysis Error",
        description: "There was a problem analyzing your code.",
        variant: "destructive"
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="border rounded-lg shadow-sm bg-white overflow-hidden">
      <div className="p-4 border-b">
        <h2 className="text-xl font-semibold">Code Playground</h2>
        <p className="text-gray-500 text-sm mt-1">Practice coding and get AI feedback</p>
      </div>
      
      <Tabs defaultValue={language} className="w-full" onValueChange={(value) => setLanguage(value as any)}>
        <div className="p-4 border-b">
          <TabsList>
            <TabsTrigger value="javascript">JavaScript</TabsTrigger>
            <TabsTrigger value="python">Python</TabsTrigger>
            <TabsTrigger value="java">Java</TabsTrigger>
            <TabsTrigger value="cpp">C++</TabsTrigger>
          </TabsList>
        </div>
        
        {/* Code editor */}
        <div className="p-4">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full h-64 font-mono p-4 border rounded-md bg-gray-50"
            spellCheck={false}
          />
        </div>
        
        <div className="p-4 border-t bg-gray-50 flex gap-2">
          <Button onClick={handleRunCode} disabled={isRunning}>
            {isRunning ? 'Running...' : 'Run Code'}
          </Button>
          <Button onClick={handleAnalyzeCode} variant="outline" disabled={isAnalyzing}>
            {isAnalyzing ? 'Analyzing...' : 'Get AI Feedback'}
          </Button>
        </div>
      </Tabs>
      
      <Separator />
      
      {/* Output and feedback area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <div className="border rounded-md bg-gray-50 p-4">
          <h3 className="text-sm font-medium mb-2">Output</h3>
          <ScrollArea className="h-48">
            <pre className="font-mono text-sm">{output || 'Run your code to see output'}</pre>
          </ScrollArea>
        </div>
        
        <div className="border rounded-md bg-gray-50 p-4">
          <h3 className="text-sm font-medium mb-2">AI Feedback</h3>
          <ScrollArea className="h-48">
            <div className="prose prose-sm">
              {feedback ? (
                <div className="whitespace-pre-wrap">{feedback}</div>
              ) : (
                <p className="text-gray-500">Click "Get AI Feedback" to receive code analysis</p>
              )}
            </div>
          </ScrollArea>
        </div>
      </div>
    </div>
  );
};
