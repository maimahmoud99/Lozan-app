import { Injectable } from '@angular/core';
import { BasketProduct } from '../Models/product';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private cartItems = new BehaviorSubject<BasketProduct[]>(this.getCartFromStorage());
  cartItems$ = this.cartItems.asObservable();

  constructor() {}

  private getCartFromStorage(): BasketProduct[] {
    const storedCart = localStorage.getItem('cart');
    return storedCart ? JSON.parse(storedCart) : [];
  }

  public saveCartToStorage(items: BasketProduct[]) {
    localStorage.setItem('cart', JSON.stringify(items));
    this.cartItems.next(items); 
  }

  getCartCount(): number {
    return this.cartItems.value.reduce((acc, item) => acc + item.quantity, 0);
  }

  addItem(item: BasketProduct) {
    const currentItems = this.cartItems.value;
    currentItems.push(item);
    this.saveCartToStorage(currentItems);
  }

  updateItem(item: BasketProduct) {
    const currentItems = this.cartItems.value.map(x => x.Id === item.Id ? item : x);
    this.saveCartToStorage(currentItems);
  }

  removeItemByIndex(index: number) {
    const currentItems = [...this.cartItems.value]; // clone array
    currentItems.splice(index, 1); // remove item at index
    this.saveCartToStorage(currentItems);
  }
  
  getTotalPrice(): number {
    return this.cartItems.value.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  }
}
