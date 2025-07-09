import type { UploadedImage } from "../interface/IAadhaar";
import { Upload, CheckCircle } from "lucide-react";

const ImageUpload: React.FC<{
  title: string;
  image: UploadedImage | null;
  onImageUpload: (file: File) => void;
  icon: React.ReactNode;
}> = ({ title, image, onImageUpload, icon }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageUpload(file);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>

      <div className="space-y-4">
        <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-blue-500" />
            <p className="mb-2 text-sm text-gray-600">
              <span className="font-semibold">Click to upload</span> or drag and
              drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
        </label>

        {image && (
          <div className="relative">
            <img
              src={image.preview}
              alt={title}
              className="w-full h-48 object-cover rounded-lg border border-gray-300"
            />
            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
              <CheckCircle className="w-4 h-4" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;
