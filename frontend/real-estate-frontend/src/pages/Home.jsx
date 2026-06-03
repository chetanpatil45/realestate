import { Link } from 'react-router-dom';
import { Home as HomeIcon, Building2, Search, ShieldCheck, ArrowRight } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      
      {/* Navigation Bar */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="p-2 bg-blue-600 text-white rounded-lg">
              <HomeIcon className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold text-gray-900 tracking-tight">RealEstate Hub</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/about" className="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">
              About Us
            </Link>
            <Link 
              to="/login" 
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-all shadow-sm"
            >
              Login / Register
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 grid lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
            <span>Seamless Property Matching Portal</span>
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-950 tracking-tight leading-none">
            Find Your Dream Space. <br />
            <span className="text-blue-600">No Hassle.</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-lg leading-relaxed">
            A secure, role-segmented real estate ecosystem connecting direct property dealers with active customers looking for premium listings.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
            <Link 
              to="/login" 
              className="flex items-center justify-center space-x-2 px-6 py-3 text-base font-medium text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              <span>Get Started Now</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link 
              to="/about" 
              className="flex items-center justify-center px-6 py-3 text-base font-medium text-gray-700 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Right Feature Graphic Layout */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl w-fit">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Smart Browsing</h3>
              <p className="text-gray-500 text-sm">Customers scan properties instantly with fast high-res asset views.</p>
            </div>
            <div className="bg-gradient-to-tr from-blue-600 to-indigo-700 p-6 rounded-2xl text-white space-y-2 h-40 flex flex-col justify-end">
              <span className="text-3xl font-black">100%</span>
              <p className="text-blue-100 text-sm font-medium">Verified Direct Listings</p>
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl w-fit">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Dealer Controls</h3>
              <p className="text-gray-500 text-sm">Agents update details via structured multi-step forms seamlessly.</p>
            </div>
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 space-y-3">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl w-fit">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 text-lg">Secure JWT Checks</h3>
              <p className="text-gray-500 text-sm">State protection keeps unauthorized profiles guarded away.</p>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Home;