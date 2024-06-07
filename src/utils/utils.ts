interface CartItem {
  id: string;
  image: string;
  price: number;
  title: string;
}
  
export const isItemInCart = (itemId: string, cart: CartItem[]): boolean => {
  return cart.some((cartItem: {id: string}) => cartItem.id === itemId);
};