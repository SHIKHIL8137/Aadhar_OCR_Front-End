import { useState } from "react";
import type { AadhaarData, UploadedImage } from "../interface/IAadhaar";
import { ArrowLeft, Camera, Eye, RefreshCw } from "lucide-react";
import ImageUpload from "../components/ImageUpload";
import ResultsDisplay from "../components/ResultDisplay";
import { proceedToPayment } from "../api/Apis";
import { toast } from "sonner";
import HowItWorksSectionOrc from "../components/HowItWroksSectionOcr";
type OcrProps = {
  setPage: (page: "home" | "ocr") => void;
};

const Ocr: React.FC<OcrProps> = ({ setPage }) => {
  const [frontImage, setFrontImage] = useState<UploadedImage | null>(null);
  const [backImage, setBackImage] = useState<UploadedImage | null>(null);
  const [extractedData, setExtractedData] = useState<AadhaarData | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (file: File, side: "front" | "back") => {
    const preview = URL.createObjectURL(file);
    const imageData = { file, preview };

    if (side === "front") {
      setFrontImage(imageData);
    } else {
      setBackImage(imageData);
    }
  };

  const processOCR = async () => {
    if (!frontImage || !backImage) {
      toast.error("Please upload both front and back images");
      return;
    }
    const allowedTypes = ["image/png", "image/jpg", "image/jpeg"];
    const maxSizeMB = 10 * 1024 * 1024;

    if (!allowedTypes.includes(frontImage.file.type)) {
      toast.error("Front image must be PNG, JPG, or JPEG");
      return;
    }

    if (frontImage.file.size > maxSizeMB) {
      toast.error("Front image must be less than 10MB");
      return;
    }

    if (!allowedTypes.includes(backImage.file.type)) {
      toast.error("Back image must be PNG, JPG, or JPEG");
      return;
    }
    if (backImage.file.size > maxSizeMB) {
      toast.error("Back image must be less than 10MB");
      return;
    }

    setIsProcessing(true);

    const formData = new FormData();
    formData.append("frontImage", frontImage.file);
    formData.append("backImage", backImage.file);

    try {
      const response = await proceedToPayment(formData);
      setExtractedData(response.data?.data);
    } catch (error: any) {
      console.error("OCR error:", error);
      toast.error(
        error?.response?.data?.message || "Failed to process Aadhaar images"
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const resetAll = () => {
    setFrontImage(null);
    setBackImage(null);
    setExtractedData(null);
    setIsProcessing(false);
  };

  const canProcess = frontImage && backImage && !isProcessing;
  const hasData = frontImage || backImage || extractedData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <button
          onClick={() => setPage("home")}
          className="flex mb-5 items-center gap-2 text-sky-700 px-5 py-2 hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 transform hover:scale-105"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <ImageUpload
            title="Front Side"
            image={frontImage}
            onImageUpload={(file) => handleImageUpload(file, "front")}
            icon={<Camera className="w-6 h-6 text-blue-600" />}
          />
          <ImageUpload
            title="Back Side"
            image={backImage}
            onImageUpload={(file) => handleImageUpload(file, "back")}
            icon={<Camera className="w-6 h-6 text-blue-600" />}
          />
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            onClick={processOCR}
            disabled={!canProcess}
            className={`px-8 py-4 rounded-xl font-semibold text-white transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              canProcess
                ? "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-lg"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing Images...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Extract Details
              </div>
            )}
          </button>

          {hasData && (
            <button
              onClick={resetAll}
              disabled={isProcessing}
              className={`px-8 py-4 rounded-xl font-semibold transition-all transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300 ${
                isProcessing
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700 shadow-lg"
              }`}
            >
              <div className="flex items-center gap-2">
                <RefreshCw className="w-5 h-5" />
                Reset All
              </div>
            </button>
          )}
        </div>

        {(extractedData || isProcessing) && (
          <ResultsDisplay
            data={extractedData || ({} as AadhaarData)}
            isLoading={isProcessing}
          />
        )}
        <HowItWorksSectionOrc/>
      </main>
    </div>
  );
};

export default Ocr;
