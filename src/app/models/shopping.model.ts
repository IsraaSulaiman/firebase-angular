import { Product } from './product.model';

export class Cart {
  constructor(public items: Item[]) {}

  get totalCount() {
    const count = this.items.reduce((curr, prev) => curr + prev.quantity, 0);
    return count;
  }

  get totalPrice() {
    return this.items.reduce((curr, prev) => curr + prev.totalPrice, 0);
  }

  getQuantity(product: Product) {
    let index = this.items.findIndex(item => item.id == product.id);
    return index != -1 ? this.items[index].quantity : 0;
  }
}

export interface shoppingCartProductContainer {
  product: Product;
  quantity: number;
}

export class Item {
  quantity: number;
  title: string;
  imageUrl: string;
  price: number;
  quantitiy: number;
  id: string;

  constructor(init?: Partial<Item>) {
    Object.assign(this, init);
  }

  get totalPrice() {
    return +this.price * this.quantity;
  }
}
