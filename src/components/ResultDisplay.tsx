import {  FileText, User, Calendar, CreditCard, MapPin, Copy, Check, PinIcon } from 'lucide-react';
import { useState } from 'react';
import type { AadhaarData } from '../interface/IAadhaar';
import Skeleton from './Skeleton';

const ResultsDisplay: React.FC<{
  data: AadhaarData;
  isLoading: boolean;
}> = ({ data, isLoading }) => {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const copyToClipboard = async (text: string, fieldName: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(fieldName);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const copyAllData = async () => {
    const allDataText = Object.entries(data)
      .filter(([_, value]) => value)
      .map(([key, value]) => {
        const label = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
        return `${label}: ${value}`;
      })
      .join('\n');

    try {
      await navigator.clipboard.writeText(allDataText);
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch (err) {
      console.error('Failed to copy all data: ', err);
    }
  };

  if (isLoading) {
    return (
    <Skeleton/>
    );
  }

  const fields = [
    { label: 'Full Name', value: data.name, icon: User, key: 'name' },
    { label: 'Date of Birth', value: data.dob, icon: Calendar, key: 'dob' },
    { label: 'Aadhaar Number', value: data.aadhaarNumber, icon: CreditCard, key: 'aadhaarNumber' },
    { label: 'Gender', value: data.gender, icon: User, key: 'gender' },
    { label: 'Address', value: data.address, icon: MapPin, key: 'address' },
    { label: 'Guardian\'s Name', value: data.guardianName, icon: User, key: 'guardianName' },
    { label: 'Mobile Number', value: data.mobileNumber, icon: User, key: 'mobileNumber' },
    { label: 'Pin Code', value: data.pincode, icon: PinIcon, key: 'pincode' },

  ];

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold text-gray-800">Extracted Details</h3>
        </div>
        <button
          onClick={copyAllData}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {copiedAll ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy All
            </>
          )}
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fields.map(({ label, value, icon: Icon, key }) => (
          value && (
            <div key={label} className="bg-gray-50 rounded-lg p-4 border border-gray-200 group">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-blue-600" />
                  <label className="text-sm font-medium text-gray-600">{label}</label>
                </div>
                <button
                  onClick={() => copyToClipboard(value, key)}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-200 rounded"
                  title="Copy to clipboard"
                >
                  {copiedField === key ? (
                    <Check className="w-4 h-4 text-green-600" />
                  ) : (
                    <Copy className="w-4 h-4 text-gray-500" />
                  )}
                </button>
              </div>
              <p className="text-gray-800 font-medium break-all">{value}</p>
            </div>
          )
        ))}
      </div>
    </div>
  );
};

export default ResultsDisplay