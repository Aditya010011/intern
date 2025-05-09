
import { MainLayout } from '@/components/layout/MainLayout';

const About = () => {
  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">About TechMentor</h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="lead text-xl text-gray-600 mb-6">
              TechMentor is a next-generation learning platform designed to help technology professionals master essential skills through AI-powered tutoring.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Mission</h2>
            <p>
              Our mission is to democratize technology education by providing accessible, personalized learning experiences that adapt to each learner's unique needs and goals. We believe that with the right guidance, anyone can master complex technical skills.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">The TechMentor Approach</h2>
            <p>
              What sets TechMentor apart is our revolutionary approach to tech education:
            </p>
            
            <ul className="list-disc pl-5 space-y-2 my-4">
              <li><strong>AI Tutors:</strong> Each technology domain has a dedicated AI tutor that provides personalized instruction, answers questions, and adapts to your learning style.</li>
              <li><strong>Hands-on Learning:</strong> We believe in learning by doing, with interactive exercises that reinforce concepts and build practical skills.</li>
              <li><strong>Advanced Research Tools:</strong> Access to cutting-edge AI chatbots helps you explore topics more deeply and find solutions to complex problems.</li>
              <li><strong>Continuous Feedback:</strong> Regular assessments and feedback help you understand your progress and identify areas for improvement.</li>
            </ul>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Technology Domains</h2>
            <p>
              TechMentor covers a comprehensive range of technology domains essential for modern IT professionals:
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 my-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Python</h3>
                <p className="text-gray-600">From basic syntax to advanced frameworks and applications.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">DevOps</h3>
                <p className="text-gray-600">CI/CD, automation, and modern deployment practices.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Cloud Computing</h3>
                <p className="text-gray-600">Major cloud platforms, architecture, and deployment strategies.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Linux</h3>
                <p className="text-gray-600">System administration, shell scripting, and configuration.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Networking</h3>
                <p className="text-gray-600">Protocols, infrastructure, security, and troubleshooting.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Storage</h3>
                <p className="text-gray-600">Storage systems, RAID, backup solutions, and management.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Virtualization</h3>
                <p className="text-gray-600">Virtual environments, hypervisors, and virtual networking.</p>
              </div>
              <div className="border rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">Object Storage</h3>
                <p className="text-gray-600">Concepts, implementation, and best practices.</p>
              </div>
              <div className="border rounded-lg p-4 md:col-span-2">
                <h3 className="text-lg font-medium mb-2">AI & Machine Learning</h3>
                <p className="text-gray-600">Algorithms, frameworks, and practical applications of AI and ML technologies.</p>
              </div>
            </div>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Our Team</h2>
            <p>
              TechMentor was founded by a team of technology experts and education specialists passionate about improving tech education through AI. Our team combines decades of industry experience with cutting-edge expertise in artificial intelligence, learning science, and educational technology.
            </p>
            
            <h2 className="text-2xl font-semibold mt-8 mb-4">Join Us</h2>
            <p>
              Whether you're starting your tech journey or advancing your career, TechMentor provides the guidance, resources, and support you need to succeed. Join our community of learners and start mastering essential tech skills today.
            </p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default About;
