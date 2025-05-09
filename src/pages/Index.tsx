
import { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { TechnologyCard } from '@/components/technologies/TechnologyCard';
import { TutorChat } from '@/components/tutors/TutorChat';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const technologies = [
  {
    title: "Python",
    slug: "python",
    description: "Learn Python programming from basics to advanced concepts with practical exercises.",
    color: "#3776AB",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor"><path d="M14 13.5h2.5a2 2 0 0 0 2-1.5 2 2 0 0 0-2-2h-9a2 2 0 0 0-2 2 2 2 0 0 0 2 2H10"/><path d="M10 17V5.5a2 2 0 0 0-2-2 2 2 0 0 0-2 2v5"/><path d="M14 6.5v11a2 2 0 0 0 2 2 2 2 0 0 0 2-2v-5"/></svg>,
    modules: 8,
    exercises: 24,
    tutor: {
      name: "Dr. Ana Python",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ana"
    }
  },
  {
    title: "DevOps",
    slug: "devops",
    description: "Master continuous integration, delivery, and deployment practices.",
    color: "#EE3424",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="16" cy="16" r="6"/><circle cx="8" cy="16" r="6"/><circle cx="12" cy="8" r="6"/><line x1="12" y1="2" x2="12" y2="14"/><line x1="16" y1="16" x2="8" y2="16"/></svg>,
    modules: 6,
    exercises: 18,
    tutor: {
      name: "Sam Jenkins",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sam"
    }
  },
  {
    title: "Cloud Computing",
    slug: "cloud",
    description: "Learn to deploy and manage applications on major cloud platforms.",
    color: "#4285F4",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>,
    modules: 7,
    exercises: 21,
    tutor: {
      name: "Alex Cloud",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
    }
  },
  {
    title: "Linux",
    slug: "linux",
    description: "Master Linux administration, shell scripting, and system configuration.",
    color: "#FCC624",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>,
    modules: 5,
    exercises: 15,
    tutor: {
      name: "Lina Penguin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lina"
    }
  },
  {
    title: "Networking",
    slug: "networking",
    description: "Understand network protocols, configuration, and troubleshooting.",
    color: "#00BCF2",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="16" y="16" width="6" height="6" rx="1"/><rect x="2" y="16" width="6" height="6" rx="1"/><rect x="9" y="2" width="6" height="6" rx="1"/><path d="M5 16v-3a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v3"/><path d="M12 12V8"/></svg>,
    modules: 6,
    exercises: 18,
    tutor: {
      name: "Mike Router",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
    }
  },
  {
    title: "Storage",
    slug: "storage",
    description: "Learn about storage systems, RAID configurations, and data backup solutions.",
    color: "#FF6F00",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M12 12h.01"/><path d="M17 12h.01"/><path d="M7 12h.01"/></svg>,
    modules: 4,
    exercises: 12,
    tutor: {
      name: "Sarah Storage",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah"
    }
  },
  {
    title: "Virtualization",
    slug: "virtualization",
    description: "Master virtualization technologies and hypervisor management.",
    color: "#0F9D58",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="M3 9h12"/><path d="M3 15h12"/><path d="M9 9v6"/></svg>,
    modules: 5,
    exercises: 15,
    tutor: {
      name: "Victor VM",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Victor"
    }
  },
  {
    title: "Object Storage",
    slug: "objectstorage",
    description: "Understand object storage concepts, implementation, and best practices.",
    color: "#FF9900",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="m3.3 7 8.7 5 8.7-5"/><path d="M12 22V12"/></svg>,
    modules: 4,
    exercises: 12,
    tutor: {
      name: "Olivia Object",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Olivia"
    }
  },
  {
    title: "AI & Machine Learning",
    slug: "ai",
    description: "Explore artificial intelligence concepts, machine learning algorithms, and their applications.",
    color: "#9B30FF",
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"/><path d="M2 5h20"/><path d="M3 3v2"/><path d="M7 3v2"/><path d="M17 3v2"/><path d="M21 3v2"/><path d="m19 5-7 7-7-7"/></svg>,
    modules: 8,
    exercises: 24,
    tutor: {
      name: "Dr. Alan Neural",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alan"
    }
  }
];

const Index = () => {
  const [activeTech, setActiveTech] = useState(technologies[0]);
  
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/90 to-accent/90 text-white py-16 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="animate-fade-in">
              <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
                Master Tech Skills with AI Tutors
              </h1>
              <p className="text-lg opacity-90 mb-8 max-w-lg">
                Interactive learning platform with dedicated AI tutors for Python, DevOps, Cloud Computing, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  Get Started
                </Button>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  Explore Technologies
                </Button>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <div className="w-full h-80 rounded-lg bg-white/10 backdrop-blur-sm p-6 shadow-xl animate-float">
                  <div className="flex items-center mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <div className="ml-4 text-sm opacity-70">AI Tutor Conversation</div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex">
                      <div className="bg-primary/20 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Hello! I'm your Python tutor. How can I help you today?</p>
                      </div>
                    </div>
                    <div className="flex justify-end">
                      <div className="bg-white/20 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">I'm having trouble with list comprehensions. Can you explain them?</p>
                      </div>
                    </div>
                    <div className="flex">
                      <div className="bg-primary/20 rounded-lg p-3 max-w-[80%]">
                        <p className="text-sm">Sure! List comprehensions are a concise way to create lists...</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -right-10 top-10 w-40 h-40 rounded-full bg-white/10 backdrop-blur-sm"></div>
          <div className="absolute left-10 bottom-10 w-32 h-32 rounded-full bg-white/5 backdrop-blur-sm"></div>
          <div className="absolute right-1/3 bottom-10 w-64 h-64 rounded-full bg-white/5 backdrop-blur-sm"></div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore Technologies</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose from a wide range of technology domains and start learning with your personal AI tutor.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {technologies.map((tech) => (
              <TechnologyCard
                key={tech.slug}
                title={tech.title}
                description={tech.description}
                icon={tech.icon}
                color={tech.color}
                slug={tech.slug}
                modules={tech.modules}
                exercises={tech.exercises}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose TechMentor?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform combines cutting-edge AI with proven learning methodologies to provide the best tech education.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="p-6 border rounded-lg shadow-sm bg-white">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI Tutors</h3>
              <p className="text-gray-600">
                Personalized learning with dedicated AI tutors for each technology domain, available 24/7.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm bg-white">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/><path d="m2 12 5.2-1.9a7 7 0 0 1 5.6 0L18 12"/><path d="M2 12v.5a10 10 0 0 0 5.17 8.77"/><path d="M22 12v.5a10 10 0 0 1-5.17 8.77"/><path d="M12 12v10"/><path d="m4.2 22 7.8-3.5 7.8 3.5"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hands-on Learning</h3>
              <p className="text-gray-600">
                Interactive projects and exercises to apply what you've learned in real-world scenarios.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm bg-white">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Advanced Chatbots</h3>
              <p className="text-gray-600">
                Access to cutting-edge AI assistants including Grok, Co-Pilot, and Chat-GPT for research support.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm bg-white">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
              <p className="text-gray-600">
                Detailed analytics and feedback on your learning journey to help you improve continuously.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm bg-white">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><path d="M12 22v-4"/><path d="M9 7V2h6v5"/><path d="M16 22 2 8c-1.5-1.5-1-3.5 0-5s3.5-1.5 5 0l14 14c1.5 1.5 1 3.5 0 5s-3.5 1.5-5 0z"/><path d="m8.5 11.5 5 5"/><path d="m14 6 2 2"/><path d="m10 10 2 2"/><path d="m16 12 2 2"/><path d="m9 19 2 2"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Personalized Learning</h3>
              <p className="text-gray-600">
                Adaptive learning pathways tailored to your skill level, goals, and learning pace.
              </p>
            </div>
            
            <div className="p-6 border rounded-lg shadow-sm bg-white">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary"><rect width="18" height="10" x="3" y="3" rx="1"/><rect width="18" height="8" x="3" y="15" rx="1"/><line x1="7" y1="7" x2="17" y2="7"/><line x1="7" y1="19" x2="17" y2="19"/></svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Industry-Relevant</h3>
              <p className="text-gray-600">
                Curriculum designed by industry experts to ensure you learn the skills employers value most.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Try an AI Tutor Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Try an AI Tutor</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Get a taste of our interactive learning experience by chatting with one of our AI tutors.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="python" className="w-full">
              <TabsList className="grid grid-cols-3 md:grid-cols-9 mb-8">
                {technologies.map((tech) => (
                  <TabsTrigger 
                    key={tech.slug} 
                    value={tech.slug}
                    onClick={() => setActiveTech(tech)}
                    className="text-xs sm:text-sm"
                  >
                    {tech.title}
                  </TabsTrigger>
                ))}
              </TabsList>
              
              {technologies.map((tech) => (
                <TabsContent key={tech.slug} value={tech.slug}>
                  <TutorChat 
                    tutorName={tech.tutor.name}
                    tutorAvatar={tech.tutor.avatar}
                    technology={tech.title}
                    techColor={tech.color}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/90 to-accent/90 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Your Learning Journey?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of tech professionals who are advancing their careers with TechMentor's AI-powered learning platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              View Pricing
            </Button>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Index;
