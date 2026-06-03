import { Shield, Home, Sparkles, Code2, Target } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen text-gray-800 font-sans">
      
      {/* Hero Header Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-800 text-white py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Redefining Your Real Estate Experience
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto">
            Connecting direct property buyers and dealers seamlessly through data integrity, responsive design, and cutting-edge security architectures.
          </p>
        </div>
      </section>

      {/* Core Mission & Vision */}
      <section className="max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-2 gap-12">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
          <div className="p-3 bg-blue-100 text-blue-600 rounded-xl">
            <Target className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">
              To eliminate non-transparent real estate pipelines by empowering dealers to control their listing portals directly, while allowing customers to explore and bookmark high-fidelity property images with absolute zero friction.
            </p>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex items-start space-x-4">
          <div className="p-3 bg-indigo-100 text-indigo-600 rounded-xl">
            <Sparkles className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Why Our App Is Best</h3>
            <p className="text-gray-600 leading-relaxed">
              Unlike generic static boards, our system dynamically extracts role authority claims directly from secure token claims. This keeps your dashboard, private bookmarks, and asset manipulation workflows lightning-fast and structurally protected.
            </p>
          </div>
        </div>
      </section>

      {/* Platform Features Grid */}
      <section className="bg-gray-100 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900">Key Platform Architectures</h2>
            <p className="text-gray-600 mt-2">Engineered from the ground up for elite marketplace operations.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-xl shadow-sm text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">RBAC Token Security</h4>
              <p className="text-gray-600 text-sm">
                Strict Role-Based Access Control filters separate customer interactions cleanly from dealer structural inventory operations.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-xl shadow-sm text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center">
                <Home className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Multi-Step Image Forms</h4>
              <p className="text-gray-600 text-sm">
                Dealers append listing definitions seamlessly through logical multi-step state controls linked with optimized blob storage pathways.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-xl shadow-sm text-center space-y-3">
              <div className="mx-auto w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                <Code2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-bold text-gray-900">Spring Boot & MySQL Backed</h4>
              <p className="text-gray-600 text-sm">
                Data persistence stays highly normalized with relational integrity constraints running on an optimized indexing layout.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Developer Profile Card */}
      <section className="max-w-4xl mx-auto py-16 px-4 text-center">
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 md:p-12 space-y-6">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900">Meet the Developer</h2>
            <p className="text-blue-600 font-medium mt-1">Full-Stack Software Engineer</p>
          </div>
          
          <div className="w-24 h-24 bg-gradient-to-tr from-blue-600 to-indigo-600 text-white rounded-full mx-auto flex items-center justify-center text-3xl font-extrabold shadow-md">
            P
          </div>

          <div className="max-w-xl mx-auto">
            <p className="text-gray-600 leading-relaxed">
              Hi, I am Prakash. As an MCA scholar specializing in backend web architectures and modern interface design systems, I built this RealEstate system to bridge high-throughput Spring Boot micro-services cleanly with modular, atomic frontend component views.
            </p>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-center space-x-6 text-sm text-gray-500">
            <div><span className="font-semibold text-gray-800">Stack:</span> Java 21 / Spring Boot / MySQL / React / Tailwind CSS</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;