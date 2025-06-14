import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { LkDirectionInfoDto } from 'src/app/Core/Models/LookUp';
import { BasketProduct, ProductDto } from 'src/app/Core/Models/product';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { BasketService } from 'src/app/Core/Services/basket.service';
import { LookUpService } from 'src/app/Core/Services/look-up.service';
import { ProductService } from 'src/app/Core/Services/product.service';
import { SharedService } from 'src/app/Core/Services/shared.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit , AfterViewInit {
 
  @ViewChild('myDiv') myDiv!: ElementRef;

  product:BasketProduct ={ProductId:0,imageUrl:"",name:"",price:0,quantity:0,selections:{}}
    directionInfosList:LkDirectionInfoDto[]=[]
  productId=0
    constructor(private router:Router, private lookupservice:LookUpService,private productService:ProductService,private route:ActivatedRoute,
         private basketService: BasketService, private shardservice:SharedService, private Authservice:AuthService,private toast: NgToastService){}
    Images:string[]=[]
  ngOnInit(): void {
  this.route.paramMap.subscribe(params => {
    this.productId =  parseInt(params.get('id')!);
    this.productService.getProductById(this.productId).subscribe(res => {
      this.product.ProductId = res.id;
      this.product.imageUrl = res.imageUrls[0];
      this.Images = res.imageUrls;
      this.product.name = res.name;
      this.product.price = res.price;
      this.product.quantity = 1;
      
      // تأكد أن selections موجودة
      if (!this.product.selections) {
        this.product.selections = {
          frontGlass: "",
          frontSides: "",
          backSides: "",
          rearGlass: ""
        };
      }
    });
  });

  this.lookupservice.getDirectionInfos().subscribe(res => {
    this.directionInfosList = res;

    // ابحث في القائمة عن قيمة 'شفاف (مطابق للمرور)' اللي هي frontGlass directionId = 1
    const defaultFrontGlass = this.directionInfosList.find(item =>
      item.directionId === 1 && item.name.includes('شفاف') && item.name.includes('مطابق للمرور')
    );

    if (defaultFrontGlass) {
      this.product.selections['frontGlass'] = defaultFrontGlass.id + '';
    }
  });
}

  ngAfterViewInit() {
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const element = document.getElementById(fragment);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
    }

  UpdateCounter(item: BasketProduct, change: number) {
    item.quantity = Math.max(1, item.quantity + change); // Minimum 1
    this.basketService.updateItem(item); // ✅ Update via service
    this.toast.success({detail:"تم تعديل هذا المنتج في السلة",summary:'سلة',duration:2000, position:"topLeft"});

  }
  
  
  updateSelection(item: BasketProduct, type: string, selectedId: any) {
    if (!item.selections) {
      item.selections = {
        frontGlass: "",
        frontSides: "",
        backSides: "",
        rearGlass: ""
      };
    }
  
    item.selections[type] = selectedId;
    this.product = item

  }

  CheckOut(){

    // Example to navigate
    
            let validSelections=false
            
              validSelections =(this.product.selections['frontGlass'] == '' ||this.product.selections['frontSides'] == '' ||
                this.product.selections['backSides'] == '' || this.product.selections['rearGlass'] == ''
               )||
               (this.product.selections['frontGlass'] == null ||this.product.selections['frontSides'] == null ||
                this.product.selections['backSides'] == null || this.product.selections['rearGlass'] == null
               )
    
        
              
                if (validSelections) {
  this.customErrorMessage = "هناك حقول يجب ادخالها، تأكد من ادخال كل الجوانب لجميع المنتجات المراد شراؤها";
  this.showCustomError = true;
  this.errorShakeClass = 'animate-shake'; // لو عندك animation للرجّة مثلاً
  setTimeout(() => {
    this.showCustomError = false;
  }, 3000);
} else {
  const encryptedText = this.shardservice.encryptData([this.product]);
  this.router.navigate(['Card/CheckOut', encryptedText]);
}

    
    
          
        }
        
showCustomError: boolean = false;
customErrorMessage: string = '';
errorShakeClass: string = '';

}
