export const convertPrice = (price) => {
  try {
    // Chuyển đổi số thành chuỗi và định dạng lại bằng dấu chấm
    const formattedPrice = price.toLocaleString("vi-VN");
    console.log(price, formattedPrice);
    return `${formattedPrice}đ`;
  } catch (error) {
    return null;
  }
};
