import React, { useState, useCallback } from "react";
import { Upload, CheckCircle, Crop, X } from "lucide-react";
import Cropper from "react-easy-crop";
import getCroppedImg from "../helper/cropImage";
import type { UploadedImage } from "../interface/IAadhaar";

interface ImageUploadProps {
  title: string;
  image: UploadedImage | null;
  onImageUpload: (file: File) => void;
  icon: React.ReactNode;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  title,
  image,
  onImageUpload,
  icon,
}) => {
  const [showCrop, setShowCrop] = useState(false);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [aspect, setAspect] = useState<number | undefined>(undefined); // updated
  const [isFreeform, setIsFreeform] = useState(true);

  const aspectRatios = [
    { label: "Freeform (Adjustable)", value: "null" },
    { label: "Square (1:1)", value: "1" },
    { label: "ID Card (4:3)", value: (4 / 3).toString() },
    { label: "Widescreen (16:9)", value: (16 / 9).toString() },
    { label: "Photo (3:2)", value: (3 / 2).toString() },
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
        setShowCrop(true);
        setIsFreeform(true);
        setAspect(undefined);
        setZoom(1);
      };
      reader.readAsDataURL(file);
    }
  };

  const onCropComplete = useCallback((_: any, croppedAreaPixels: any) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropDone = async () => {
    if (imageSrc && croppedAreaPixels) {
      try {
        const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
        const croppedFile = new File([croppedBlob], "cropped-image.jpg", {
          type: "image/jpeg",
        });
        onImageUpload(croppedFile);
        setShowCrop(false);
        setImageSrc(null);
      } catch (error) {
        console.error("Error cropping image:", error);
      }
    }
  };

  const handleAspectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setZoom(1);
    if (value === "null") {
      setIsFreeform(true);
      setAspect(undefined);
    } else {
      const newAspect = parseFloat(value);
      setIsFreeform(false);
      setAspect(newAspect);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-4">
        {icon}
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      </div>

      <div className="space-y-4">
        <label
          htmlFor={`upload-${title}`}
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors duration-200"
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 mb-4 text-blue-500" aria-hidden="true" />
            <p className="mb-2 text-sm text-gray-600 text-center">
              <span className="font-semibold">Click to upload</span>
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10MB)</p>
          </div>
          <input
            id={`upload-${title}`}
            type="file"
            className="hidden"
            accept="image/png,image/jpeg,image/jpg"
            onChange={handleFileChange}
            aria-label={`Upload ${title}`}
          />
        </label>

        {image && (
          <div className="relative w-full">
            <img
              src={image.preview}
              alt={`${title} preview`}
              className="w-full h-48 object-cover rounded-lg border border-gray-300"
            />
            <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1">
              <CheckCircle className="w-4 h-4" aria-hidden="true" />
            </div>
          </div>
        )}
      </div>

      {showCrop && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-xl overflow-hidden relative flex flex-col">
            <div className="relative h-96">
              <Cropper
                image={imageSrc!}
                crop={crop}
                zoom={zoom}
                minZoom={1}
                aspect={isFreeform ? undefined : aspect}
                restrictPosition={false}
                showGrid={true}
                cropShape="rect"
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
                style={{
                  containerStyle: { height: "100%", width: "100%" },
                  cropAreaStyle: {
                    border: "2px solid #3b82f6",
                    boxShadow: "0 0 0 1px rgba(0,0,0,0.5)",
                  },
                }}
              />
            </div>
            <div className="flex flex-col gap-4 p-4 bg-gray-100">
              <div className="flex items-center gap-2">
                <label
                  htmlFor="aspect-ratio"
                  className="text-sm font-medium text-gray-700"
                >
                  Crop Mode:
                </label>
                <select
                  id="aspect-ratio"
                  value={isFreeform ? "null" : aspect?.toString()}
                  onChange={handleAspectChange}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label="Select crop mode"
                >
                  {aspectRatios.map((ratio) => (
                    <option key={ratio.label} value={ratio.value}>
                      {ratio.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-center gap-3">
                <label
                  htmlFor="zoom-range"
                  className="text-sm font-medium text-gray-700"
                >
                  Zoom:
                </label>
                <input
                  type="range"
                  id="zoom-range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full accent-blue-500"
                />
                <span className="text-sm text-gray-600">
                  {zoom.toFixed(1)}x
                </span>
              </div>
              <div className="flex justify-between">
                <button
                  onClick={() => setShowCrop(false)}
                  className="flex items-center gap-1 px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                  aria-label="Cancel cropping"
                >
                  <X size={16} />
                  Cancel
                </button>
                <button
                  onClick={handleCropDone}
                  className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                  aria-label="Crop and save image"
                >
                  <Crop size={16} />
                  Crop & Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
