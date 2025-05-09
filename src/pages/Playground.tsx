
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CodeEditor } from '@/components/playground/CodeEditor';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const Playground = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Coding Playground</h1>
          <p className="text-gray-600 mt-2">
            Practice coding with real-time AI feedback and guidance
          </p>
        </div>

        <Tabs defaultValue="code-editor" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="code-editor">Code Editor</TabsTrigger>
            <TabsTrigger value="challenges">Challenges</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
          </TabsList>
          
          <TabsContent value="code-editor" className="space-y-8">
            <CodeEditor />
          </TabsContent>
          
          <TabsContent value="challenges" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Coding Challenge Cards */}
              <Card>
                <CardHeader>
                  <CardTitle>Beginner: FizzBuzz</CardTitle>
                  <CardDescription>Classic programming challenge</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Write a program that prints numbers from 1 to 100, but for multiples of 3 print "Fizz", for multiples of 5 print "Buzz", and for multiples of both print "FizzBuzz".
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Intermediate: Palindrome Checker</CardTitle>
                  <CardDescription>String manipulation challenge</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Create a function that checks if a string is a palindrome (reads the same backward as forward), ignoring spaces, punctuation, and capitalization.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Advanced: Binary Search Tree</CardTitle>
                  <CardDescription>Data structures challenge</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Implement a binary search tree with methods for insertion, deletion, and traversal (in-order, pre-order, and post-order).
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="projects" className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Project Cards */}
              <Card>
                <CardHeader>
                  <CardTitle>To-Do List App</CardTitle>
                  <CardDescription>Frontend Project</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Build a to-do list application with features like adding, deleting, and marking tasks as complete. Use React for the frontend.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Weather Dashboard</CardTitle>
                  <CardDescription>API Integration Project</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Create a dashboard that displays weather information for different cities using a public weather API. Implement search functionality.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>E-commerce API</CardTitle>
                  <CardDescription>Backend Project</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600">
                    Develop a RESTful API for an e-commerce platform with endpoints for products, users, orders, and authentication.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Playground;
