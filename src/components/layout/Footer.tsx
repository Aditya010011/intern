
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
          <div>
            <h3 className="text-xl font-bold text-primary">TechMentor</h3>
            <p className="mt-4 text-sm text-gray-600">
              Advanced interactive learning platform for technology professionals and graduates.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Technologies</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/tech/python" className="text-sm text-gray-600 hover:text-primary">Python</Link></li>
              <li><Link to="/tech/devops" className="text-sm text-gray-600 hover:text-primary">DevOps</Link></li>
              <li><Link to="/tech/cloud" className="text-sm text-gray-600 hover:text-primary">Cloud Computing</Link></li>
              <li><Link to="/tech/linux" className="text-sm text-gray-600 hover:text-primary">Linux</Link></li>
              <li><Link to="/tech/networking" className="text-sm text-gray-600 hover:text-primary">Networking</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">More Technologies</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/tech/storage" className="text-sm text-gray-600 hover:text-primary">Storage</Link></li>
              <li><Link to="/tech/virtualization" className="text-sm text-gray-600 hover:text-primary">Virtualization</Link></li>
              <li><Link to="/tech/objectstorage" className="text-sm text-gray-600 hover:text-primary">Object Storage</Link></li>
              <li><Link to="/tech/ai" className="text-sm text-gray-600 hover:text-primary">AI & Machine Learning</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">Company</h4>
            <ul className="mt-4 space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-primary">About</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-primary">Contact</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-primary">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-primary">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            &copy; {new Date().getFullYear()} TechMentor. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
