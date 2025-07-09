import { Eye, Menu, X } from "lucide-react";
import { useState } from "react";
type NavigationProps = {
  setPage: (page: "home" | "ocr") => void;
  page: string;
  scrollToHowItWorks: () => void;
};

const Navigation: React.FC<NavigationProps> = ({
  page,
  setPage,
  scrollToHowItWorks,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-lg py-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Aadhaar OCR</h1>
              <p className="text-xs text-gray-600">Smart Document Processing</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {page === "home" && (
              <>
                <button
                  onClick={scrollToHowItWorks}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  How It Works
                </button>
                <button
                  onClick={() => setPage("ocr")}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
                >
                  Try OCR
                </button>
              </>
            )}
          </div>
          {page === 'home' && <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>}
        </div>
        {isMenuOpen && page ==='home' && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
                  <button
                    onClick={scrollToHowItWorks}
                    className="text-gray-700 hover:text-blue-600 transition-colors"
                  >
                    How It Works
                  </button>
                  <button
                    onClick={() => setPage("ocr")}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-105"
                  >
                    Try OCR
                  </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
