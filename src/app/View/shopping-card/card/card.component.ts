import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { ProductDto } from 'src/app/Core/Models/product';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { BasketService } from 'src/app/Core/Services/basket.service';
import { LookUpService } from 'src/app/Core/Services/look-up.service';
import { ProductService } from 'src/app/Core/Services/product.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  isWhiteVisible = false;
  Islogged=false
  userInfo:any
  ListProduct:ProductDto[]=[]
    constructor(private router:Router, private lookupservice:LookUpService,private productService:ProductService,
      private basketService:BasketService,private toast: NgToastService,private Authservice:AuthService
    ){}
    
  ngOnInit(): void {
    
    this.productService.getProduct().subscribe(res=>{
      this.ListProduct =res
    })
    this.Authservice.IsLogged$.subscribe(res=>{
      this.Islogged=res
    })
    this.Authservice.UserInfo$.subscribe(res=>{
      this.userInfo=res
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
        ProductId: item.id,
        name: item.name,
        price: item.price,
        imageUrl: item.imageUrls[0],
        quantity: 1,
        selections:{frontGlass:"", frontSides:"", backSides:"", rearGlass:""}
      });
    
     this.basketService.saveCartToStorage(cart)
    //  this.toast.success({detail:"تم اضافة منتج الي السلة",summary:'سلة',duration:3000,  position: 'topLeft'
    //  });
    this.successMessage = "تم إضافة منتج إلى السلة";
  this.showSuccess = true;
  this.successShakeClass = 'vertical-shake';

  // إزالة كلاس الهزة بعد نصف ثانية
  setTimeout(() => {
    this.successShakeClass = '';
  }, 1000);

     setTimeout(()=> this.router.navigateByUrl("Card/ShopingCard"),1000)
     // إخفاء الرسالة بعد 3 ثواني
  setTimeout(() => {
    this.showSuccess = false;
  }, 3000);


  }

showSuccess = false;
successMessage = '';
successShakeClass = '';



  
  
  addFavorit(id:number,val:boolean){


    if(this.Islogged && this.userInfo){
       if(val){
      this.productService.AddFavorite({productId:id}).subscribe(res=>{
        this.ListProduct.find(a=>a.id == id)!.isFavorite = val
        this.toast.success({detail:"تم اضافة المنتج المفضلة",summary:'سلة',duration:5000,  position: 'topLeft'})

      })
    }else{
      this.productService.RemoveFavorite(id).subscribe(res=>{
        this.ListProduct.find(a=>a.id == id)!.isFavorite = val
        this.toast.warning({detail:"تم ازالة المنتج من المفضلة",summary:'سلة',duration:5000,  position: 'topLeft'})

      })
    }

    }else{
      this.toast.warning({detail:"يجب تسجيل الدخول لاستخدام هذة الخدمة",summary:'سلة',duration:5000,  position: 'topLeft'})

    }

  }
}
