import { CheckCircle, Eye, FileText, Upload } from "lucide-react";

const HowItWorksSection: React.FC = () => {
  const steps = [
    {
      step: "1",
      title: "Upload Images",
      description: "Upload clear images of both sides of your Aadhaar card using our intuitive interface.",
      icon: Upload
    },
    {
      step: "2",
      title: "Processing",
      description: "Our advanced OCR engine processes the images ",
      icon: Eye
    },
    {
      step: "3",
      title: "Extract Data",
      description: "All relevant information is extracted and organized in a structured format.",
      icon: FileText
    },
    {
      step: "4",
      title: "Copy & Use",
      description: "Copy individual fields or all data at once for your applications.",
      icon: CheckCircle
    }
  ];

  return (
    <section id="how-it-works" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Simple 4-step process to extract accurate data from your Aadhaar cards in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center relative">
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-1/2 w-full h-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 transform translate-x-8"></div>
              )}
              
              <div className="bg-white rounded-xl shadow-lg p-8 relative z-10 hover:shadow-xl transition-shadow">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <step.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


export default HowItWorksSection