import { Component, Input, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductDto } from 'src/app/Core/Models/product';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.scss']
})
export class OrderItemComponent {

  @Input() ListProduct:any[]=[]
  @Input() openModalTrigger=false

    @ViewChild('basicModal') basicModal: any;
  
     constructor(private modalService:NgbModal){}


     ngOnInit(): void {

     }
     ngOnChanges() {
       debugger
       if (this.openModalTrigger && this.ListProduct.length > 0) {
        //this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        console.log(this.ListProduct)
        this.Show()
          
       }
     }
   
  
    
    Show(){
  
      this.modalService.open(this.basicModal, {size: 'lg'  , backdrop: 'static', // prevents closing on click outside
        keyboard: false }).result.then((result) => {
       debugger
        console.log("Modal closed" + result);
        this.openModalTrigger=false
  
      }).catch((res) => {});
  
   }
  
   Close(){
    this.ListProduct=[]
    this.openModalTrigger=false
    this.modalService.dismissAll()
   }
}
