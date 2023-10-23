export const convertPrice = (price) => {
  try {
    const result = price?.toLocaleString().replaceAll(",", ".");
    console.log(price, result);
    return `${result}đ`;
  } catch (error) {
    return null;
  }
};
