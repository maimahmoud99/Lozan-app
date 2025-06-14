import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductDto } from 'src/app/Core/Models/product';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { BasketService } from 'src/app/Core/Services/basket.service';
import { LookUpService } from 'src/app/Core/Services/look-up.service';
import { ProductService } from 'src/app/Core/Services/product.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.scss']
})
export class FavoriteComponent implements OnInit {

  ListProduct:ProductDto[]=[]
   constructor(private router:Router, private lookupservice:LookUpService,private productService:ProductService,
        private basketService:BasketService,private toast: NgToastService,private Authservice:AuthService
      ){}
  ngOnInit(): void {
  this.productService.GetFavoriteProductFavorite().subscribe(res=>{
    this.ListProduct = res
  })
  }

   addToCart(item: ProductDto) {
      let cart = [];
    
      const cartStorage = localStorage.getItem('cart');
      if (cartStorage) {
        cart = JSON.parse(cartStorage);
      }
    
      
        // Else add new product
        cart.push({
          Id:cart.length == 0 ? 1 : cart[cart.length-1].Id + 1 ,
          ProductId: item.id,          name: item.name,
          price: item.price,
          imageUrl: item.imageUrls[0],
          quantity: 1,
          selections:{frontGlass:"", frontSides:"", backSides:"", rearGlass:""}
        });
      
       this.basketService.saveCartToStorage(cart)
       this.toast.success({detail:"تم اضافة منتج الي السلة",summary:'سلة',duration:5000,  position: 'topLeft'
       });
    
  
    }

    RemoveFavorite(id:any){
      this.productService.RemoveFavorite(id).subscribe(res=>{
      this.ListProduct = this.ListProduct.filter(a=>a.id != id)

        this.toast.warning({detail:"تم ازالة المنتج من المفضلة",summary:'سلة',duration:5000,  position: 'topLeft'})

      })

    }
   
}
