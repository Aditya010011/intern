
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';

const Dashboard = () => {
  const { user, signOut } = useAuth();

  return (
    <MainLayout>
      <div className="px-4 py-8 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome back, {user?.email}
            </p>
          </div>
          <Button onClick={signOut} variant="outline">Sign Out</Button>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-2">Your Progress</h2>
            <p className="text-gray-600">Track your learning journey here.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-2">Enrolled Courses</h2>
            <p className="text-gray-600">Access your enrolled courses.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="font-semibold text-lg mb-2">Certifications</h2>
            <p className="text-gray-600">View and download your certifications.</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
