export interface AadhaarData {
  name: string;
  dob: string;
  gender: string;
  aadhaarNumber: string;
  address: string;
  pincode?: string;
  mobile?: string;
  fatherName?: string;
  mobileNumber?: string; 
  guardianName?:string;
}

export interface UploadedImage {
  file: File;
  preview: string;
}