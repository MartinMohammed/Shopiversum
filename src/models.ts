export type CartItem = {
  // if we have the id we can look up all the additional information about (e.g. title, price)
  id: number;
  //   name: string; // would be duplicated information
  quantity: number; // helps us to calculate the total price
};
