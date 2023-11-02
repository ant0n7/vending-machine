interface IVendingOptions {
  id: number;
  name: string;
  price: number;
  inventory: number;
}

export const VendingOptions: IVendingOptions[] = [
  { id: 1, name: "Coke", price: 3.5, inventory: 10 },
  { id: 2, name: "Fanta", price: 3, inventory: 14 },
  { id: 3, name: "Sprite", price: 2.5, inventory: 16 },
  { id: 4, name: "Red Bull", price: 5, inventory: 9 },
  { id: 5, name: "Coke Light", price: 3, inventory: 20 },
  { id: 6, name: "Kiwi", price: 2, inventory: 14 },
  { id: 7, name: "Orange", price: 1.5, inventory: 20 },
  { id: 8, name: "Soda", price: 4.5, inventory: 15 },
  { id: 9, name: "7Up", price: 7.5, inventory: 5 },
];

export const PriceRange = [0.05, 0.1, 0.2, 0.5, 1.0, 2.0, 5.0];

interface IChange {
  id: number;
  amount: number;
  inStore: number;
}

export const VendingChange: IChange[] = [
  { id: 1, amount: 0.05, inStore: 10 },
  { id: 2, amount: 0.1, inStore: 10 },
  { id: 3, amount: 0.2, inStore: 10 },
  { id: 4, amount: 0.5, inStore: 10 },
  { id: 5, amount: 1.0, inStore: 10 },
  { id: 6, amount: 2.0, inStore: 10 },
  { id: 7, amount: 5.0, inStore: 10 },
];
