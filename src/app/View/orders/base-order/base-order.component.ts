import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-base-order',
  templateUrl: './base-order.component.html',
  styleUrls: ['./base-order.component.scss']
})
export class BaseOrderComponent implements OnInit {
  ngOnInit(): void {
  }


  
  Logout(){
    localStorage.removeItem("token")
    localStorage.removeItem("UserInfo")
    location.reload()
  
  }
}
