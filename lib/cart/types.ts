export type CartItem = {
  id: string;
  name: string;
  priceCents: number;
  imageUrl?: string;
  quantity: number;
};

export type CartState = {
  items: CartItem[];
};

export const CART_STORAGE_KEY = "pic_cart_v1";
