import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar } from '@/components/ui/avatar';
import { useToast } from '@/hooks/use-toast';
import { generateTutorResponse } from '@/services/openaiService';
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'tutor';
  timestamp: Date;
}

interface TutorChatProps {
  tutorName: string;
  tutorAvatar: string;
  technology: string;
  techColor: string;
}

export const TutorChat = ({ 
  tutorName, 
  tutorAvatar,
  technology,
  techColor 
}: TutorChatProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Hello! I'm ${tutorName}, your ${technology} tutor. How can I help you today?`,
      sender: 'tutor',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollArea = scrollAreaRef.current;
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      // Format messages for the API - ensure correct typing
      const apiMessages = messages
        .concat(userMessage)
        .map(msg => ({
          role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
          content: msg.content
        }));

      // Get response from OpenAI
      const responseContent = await generateTutorResponse(
        apiMessages,
        technology
      );
      
      const tutorResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: responseContent,
        sender: 'tutor',
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, tutorResponse]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Connection Error",
        description: "Unable to get a response. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const switchToAIAssistant = () => {
    toast({
      title: "AI Assistant Mode",
      description: "Switching to advanced AI research assistant.",
    });
  };

  return (
    <div className="flex flex-col h-[600px] border rounded-lg overflow-hidden shadow-sm">
      {/* Header */}
      <div className="flex items-center p-4 border-b bg-white">
        <Avatar className="h-10 w-10">
          <img src={tutorAvatar} alt={tutorName} />
        </Avatar>
        <div className="ml-3">
          <h3 className="font-medium">{tutorName}</h3>
          <p className="text-sm text-muted-foreground">{technology} Expert</p>
        </div>
      </div>
      
      {/* Chat Area */}
      <ScrollArea className="flex-1 p-4 bg-gray-50" ref={scrollAreaRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.sender === 'user'
                    ? 'bg-primary text-white'
                    : 'bg-white border shadow-sm'
                }`}
                style={{
                  borderLeft: message.sender === 'tutor' ? `4px solid ${techColor}` : undefined
                }}
              >
                <p className="whitespace-pre-wrap">{message.content}</p>
                <span className={`text-xs ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'} block mt-1`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-lg p-3 shadow-sm max-w-[80%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" />
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 rounded-full bg-gray-300 animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      
      {/* Chat Controls */}
      <div className="p-4 border-t bg-white flex items-center">
        <Button 
          variant="outline" 
          size="icon" 
          className="mr-2"
          onClick={switchToAIAssistant}
          title="Switch to AI Research Assistant"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2c1.1 0 2 .9 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1V4c0-1.1.9-2 2-2h2Z"/><path d="M12 17.5v-5"/><path d="m8.8 18.4-5.4 1.8a1 1 0 0 1-1.3-1.3l1.8-5.4c.2-.5.6-.8 1.1-.9 3.3-.4 5.9-3 5.9-6.2V4"/><path d="m15.2 18.4 5.4 1.8a1 1 0 0 0 1.3-1.3l-1.8-5.4c-.2-.5-.6-.8-1.1-.9-3.3-.4-5.9-3-5.9-6.2V4"/></svg>
        </Button>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type your question here..."
          className="flex-1"
        />
        <Button
          onClick={handleSendMessage}
          disabled={!inputValue.trim() || isTyping}
          className="ml-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
          Send
        </Button>
      </div>
    </div>
  );
};
