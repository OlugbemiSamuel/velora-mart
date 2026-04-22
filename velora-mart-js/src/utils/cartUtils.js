export const calculateCartQuantity = (carts) => {
  return carts?.reduce((acc, item) => acc + item.quantity, 0) || 0;
};