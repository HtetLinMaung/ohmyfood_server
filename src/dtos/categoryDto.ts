export interface CategoryInput {
  name: string;
  price: number;
  discountPercent: number;
  openHour: string;
  closeHour: string;
  imageUrl: string;
  tags: string[];
  types: string[];
  menus: string[];
}
