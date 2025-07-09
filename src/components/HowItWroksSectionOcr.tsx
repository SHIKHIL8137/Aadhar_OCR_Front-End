import React from "react";


const HowItWorksSectionOrc: React.FC = () => {
  const data = [
              {
                step: "1",
                title: "Upload Front",
                desc: "Upload clear image of Aadhaar front side",
              },
              {
                step: "2",
                title: "Upload Back",
                desc: "Upload clear image of Aadhaar back side",
              },
              {
                step: "3",
                title: "Process",
                desc: "Click Extract Details to start OCR",
              },
              {
                step: "4",
                title: "View Results",
                desc: "Review extracted information",
              },
            ]
  return(
            <div className="mt-12 bg-white rounded-xl shadow-lg p-6 border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            How to use:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {data.map(({ step, title, desc }) => (
              <div key={step} className="text-center">
                <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-lg mx-auto mb-3">
                  {step}
                </div>
                <h4 className="font-medium text-gray-800 mb-1">{title}</h4>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
  )
}

export default HowItWorksSectionOrc