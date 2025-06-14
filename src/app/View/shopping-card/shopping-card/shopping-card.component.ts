import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LkDirectionInfoDto } from 'src/app/Core/Models/LookUp';
import { BasketProduct, ProductDto } from 'src/app/Core/Models/product';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { BasketService } from 'src/app/Core/Services/basket.service';
import { LookUpService } from 'src/app/Core/Services/look-up.service';
import { ProductService } from 'src/app/Core/Services/product.service';
import { SharedService } from 'src/app/Core/Services/shared.service';

@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.scss'],
})
export class ShoppingCardComponent implements OnInit {
  directionInfosList: LkDirectionInfoDto[] = [];
  ListProduct: BasketProduct[] = [];
  openLoginModal=false
  Islogged=false
  userInfo:any
  Code=""
  TotalPrice=0
  IsAddPromoCode=false
  constructor(private router:Router, private lookupservice:LookUpService,private productService:ProductService,
     private basketService: BasketService, private shardservice:SharedService, private Authservice:AuthService,private toast: NgToastService){}
  ngOnInit(): void {
    this.lookupservice.getDirectionInfos().subscribe((res) => {
      this.directionInfosList = res;
      this.ListProduct.forEach((item) => {
        item.selections['frontGlass'] =
          this.directionInfosList.find((a) => a.directionId == 1)?.id! + '';
        this.basketService.updateItem(item);
      });
    });
    this.loadBasketFromStorage();

    this.Authservice.IsLogged$.subscribe((res) => {
      this.Islogged = res;
    });
    this.Authservice.UserInfo$.subscribe((res) => {
      this.userInfo = res;
    });
  }
  counter = 1;
  CheckOut() {


    let validSelections: any[] = [];
    this.ListProduct.forEach((element) => {
      validSelections.push(
        element.selections['frontGlass'] == '' ||
          element.selections['frontSides'] == '' ||
          element.selections['backSides'] == '' ||
          element.selections['rearGlass'] == ''
      );
    });

    if (validSelections.some((a) => a)) {

  this.customErrorMessage = 'هناك حقول يجب ادخالها تأكد من ادخال كل الجوانب لجميع المنتجات المراد شراؤها';
  this.showCustomError = true;
  this.errorShakeClass = 'animate-shake'; 

  setTimeout(() => {
    this.showCustomError = false;
  }, 3000);
    } else {
      const encryptedText = this.shardservice.encryptData({List :this.ListProduct, TotalPrice: this.TotalPrice});

      this.router.navigate(['Card/CheckOut', encryptedText]);
    }
  }
showCustomError: boolean = false;
customErrorMessage: string = '';
errorShakeClass: string = '';

    loadBasketFromStorage() {
      this.basketService.cartItems$.subscribe(items => {
        this.ListProduct = items;
       this.TotalPrice = this.basketService.getTotalPrice()
      });
    }
    
    saveBasketToStorage() {
      localStorage.setItem('cart', JSON.stringify(this.ListProduct));
    }
    
    
    UpdateCounter(item: BasketProduct, change: number) {
      item.quantity = Math.max(1, item.quantity + change); // Minimum 1
      this.basketService.updateItem(item); // ✅ Update via service
      // this.toast.success({detail:"تم تعديل هذا المنتج في السلة",summary:'سلة',duration:2000, position:"topLeft"});
    }
    
    
    updateSelection(item: BasketProduct, type: string, selectedId: any) {
      if (!item.selections) {
        item.selections = {
          frontGlass: null,
          frontSides: null,
          backSides: null,
          rearGlass: null
        };
      }
    
      item.selections[type] = selectedId;
      this.basketService.updateItem(item); 

    }

    AddPromoCode(){
      this.lookupservice.getPromoCodes(this.Code).subscribe(res=>{
        this.TotalPrice= res.isPercentage ? (this.TotalPrice - (this.TotalPrice* res.value/100)) : this.TotalPrice -res.value

    this.errorMessage = "تم اضافة الكوبون بنجاح";
    this.showError = true;
    this.shakeClass = 'shake';
       this.IsAddPromoCode=true
    setTimeout(() => {
      this.shakeClass = '';
    }, 400);

    setTimeout(() => {
      this.showError = false;
    }, 2000); 

      },()=>{
    this.customErrorMessage = "الكود الذي أدخلته غير صحيح أو منتهي";
    this.showCustomError = true;
    this.errorShakeClass = 'shake';

    setTimeout(() => {
      this.errorShakeClass = '';
    }, 400);

    setTimeout(() => {
      this.showCustomError = false;
    }, 2000);
  });
    
    }
   messageType = 'success'
showError = false;
errorMessage = '';
shakeClass = '';

RemoveItem(Index: number) {
  this.basketService.removeItemByIndex(Index);
  this.errorMessage = "تم حذف المنتج من السلة";
  this.showError = true;
  this.shakeClass = 'shake';

  setTimeout(() => {
    this.shakeClass = '';
  }, 400); 

  setTimeout(() => {
    this.showError = false;
  }, 1000);
}



}
