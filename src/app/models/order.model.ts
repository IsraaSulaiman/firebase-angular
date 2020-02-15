import { Cart } from './shopping.model';

export class Order {
  datePlaced: number;
  items: OrderItem[];

  constructor(public shipping: any, shoppingCart: Cart, public userId: string) {
    this.datePlaced = new Date().getTime();
    this.items = shoppingCart.items.map(item => {
      return {
        product: {
          title: item.title,
          imageUrl: item.imageUrl,
          price: item.price
        },
        quantity: item.quantity,
        totalPrice: item.totalPrice
      };
    });
  }
}

export interface OrderItem {
  product: {
    title: string;
    imageUrl: string;
    price: number;
  };
  quantity: number;
  totalPrice: number;
}
