import { RcFile } from "antd/es/upload";

export const convertPrice = (price: number) => {
  try {
    // Chuyển đổi số thành chuỗi và định dạng lại bằng dấu chấm
    const formattedPrice = price.toLocaleString("vi-VN");
    // console.log(price, formattedPrice);
    return `${formattedPrice}đ`;
  } catch (error) {
    return null;
  }
};

export const isJsonString = (data: any) => {
  try {
    JSON.parse(data);
  } catch (error) {
    return false;
  }
  return true;
};

export const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

export const validateNumber = (rule: any, value: any): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (isNaN(value)) {
      reject('Please enter a valid number');
    } else {
      resolve();
    }
  });
};

export const convertDateToString = (date: Date) => date ? date.toLocaleString("vi-VN") : '';
