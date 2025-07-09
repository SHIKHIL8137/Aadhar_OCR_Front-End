import { Upload, Camera, FileText, Eye } from 'lucide-react';

export const SuspenseLoader: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4">
        {/* Logo/Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="bg-blue-600 p-4 rounded-full animate-pulse">
              <Eye className="w-12 h-12 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-indigo-500 rounded-full animate-bounce"></div>
          </div>
        </div>
        
        {/* Loading Text */}
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Aadhaar OCR</h2>
          <p className="text-gray-600 animate-pulse">Loading application...</p>
        </div>
        
        {/* Loading Animation */}
        <div className="space-y-4">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full animate-pulse"></div>
          </div>
          
          {/* Feature Loading Items */}
          <div className="space-y-3">
            {[
              { icon: Upload, text: 'Initializing upload components' },
              { icon: Camera, text: 'Setting up image processing' },
              { icon: Eye, text: 'Loading OCR engine' },
              { icon: FileText, text: 'Preparing result display' }
            ].map(({ icon: Icon, text }, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg animate-pulse"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="bg-blue-100 p-2 rounded-full">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">{text}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Loading Dots */}
        <div className="flex justify-center mt-6 space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 200}ms` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};


export const AppLoader: React.FC<{ message?: string }> = ({ message = 'Loading...' }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center">
        <div className="relative mb-4">
          <div className="w-16 h-16 border-4 border-blue-200 rounded-full animate-spin border-t-blue-600"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Eye className="w-6 h-6 text-blue-600 animate-pulse" />
          </div>
        </div>
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
};


