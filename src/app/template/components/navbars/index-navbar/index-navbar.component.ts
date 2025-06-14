import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { AuthService } from 'src/app/Core/Services/auth.service';
import { BasketService } from 'src/app/Core/Services/basket.service';

@Component({
  selector: 'app-index-navbar',
  templateUrl: './index-navbar.component.html',
})
export class IndexNavbarComponent implements OnInit {
  isSidebarOpen: boolean = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  isDropdownOpen = false;
  navbarOpen = false;

  numberOfCart = 0;
  openLoginModal = false;
  showMobileMenu = false;
  showMobileSearch = false;
  Islogged = false;
  userInfo: any;
  TotalPriceInSalla = 0;
  @ViewChild('navbarMenu') navbarMenu!: ElementRef;

  constructor(
    private basketService: BasketService,
    private Authservice: AuthService
  ) {}

  ngOnInit(): void {
    this.basketService.cartItems$.subscribe((items) => {
      this.numberOfCart = items.length;
      this.TotalPriceInSalla = this.basketService.getTotalPrice();
    });
    this.Authservice.IsLogged$.subscribe((res) => {
      this.Islogged = res;
    });

    this.Authservice.UserInfo$.subscribe((res) => {
      this.userInfo = res;
    });
  }

  toggleMobileMenu() {
    this.showMobileMenu = !this.showMobileMenu;
    if (this.showMobileMenu) {
      this.showMobileSearch = false;
    }
  }

  toggleSearchBar() {
    this.showMobileSearch = !this.showMobileSearch;
    if (this.showMobileSearch) {
      this.showMobileMenu = false;
    }
  }

  setNavbarOpen() {
    this.navbarOpen = !this.navbarOpen;
  }

  OpenLogin() {
    this.openLoginModal = true;
    setTimeout(() => (this.openLoginModal = false));
  }

  Logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('UserInfo');
    location.reload();
  }

  @HostListener('document:click', ['$event'])
  handleClickOutside(event: MouseEvent) {
    if (
      this.navbarOpen &&
      this.navbarMenu &&
      !this.navbarMenu.nativeElement.contains(event.target)
    ) {
      this.navbarOpen = false;
    }
  }

  @ViewChild('menu', { static: false }) menuRef!: ElementRef;
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.navbarOpen || !this.menuRef) return;

    const rect = this.menuRef.nativeElement.getBoundingClientRect();

    if (rect.bottom >= 0 && rect.top <= window.innerHeight) return;

    this.navbarOpen = false;
  }
}
