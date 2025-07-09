import { axiosInstanceMultipart } from "../config/Api";

export const proceedToPayment = (formData: FormData) => {
  return axiosInstanceMultipart.post(`/api/ocr`, formData);
};