import { Award, Clock, Eye, FileText, Shield, Users } from "lucide-react";

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: Eye,
      title: "Advanced OCR Technology",
      description: "State-of-the-art AI algorithms for accurate text extraction from any quality document image.",
      color: "blue"
    },
    {
      icon: Shield,
      title: "Secure Processing",
      description: "Bank-grade security ensures your sensitive document data is processed safely and privately.",
      color: "indigo"
    },
    {
      icon: Clock,
      title: "Lightning Fast",
      description: "Process documents in under 3 seconds with our optimized processing pipeline.",
      color: "purple"
    },
    {
      icon: FileText,
      title: "Multiple Formats",
      description: "Support for various image formats including JPG, PNG, JPEG with high accuracy.",
      color: "blue"
    },
    {
      icon: Users,
      title: "Batch Processing",
      description: "Process multiple documents simultaneously for increased productivity.",
      color: "indigo"
    },
    {
      icon: Award,
      title: "99.9% Accuracy",
      description: "Industry-leading accuracy rates validated by thousands of real-world tests.",
      color: "purple"
    }
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Document Processing
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our OCR system combines cutting-edge AI with user-friendly design to deliver exceptional results every time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white rounded-xl shadow-lg p-8 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <div className={`w-16 h-16 bg-${feature.color}-100 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className={`w-8 h-8 text-${feature.color}-600`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection