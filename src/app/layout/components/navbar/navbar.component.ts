import {
  Component,
  computed,
  effect,
  HostListener,
  inject,
  OnInit,
  Renderer2,
  signal,
} from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { IAllCategoriesResponse, ICategory } from '../../../core/models/all-categories.interface';
import { IUser } from '../../../core/models/user-res.interface';
import { AuthService } from '../../../core/services/auth/auth.service';
import { CartService } from '../../../core/services/cart/cart.service';
import { WishlistService } from '../../../core/services/wishList/wishlist.service';
import { CategoriesApiService } from '../../../core/services/categories/categories-api.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  private readonly routes = inject(Router);
  private readonly renderer = inject(Renderer2);
  private readonly authService = inject(AuthService);
  private readonly cartService = inject(CartService);
  private readonly wishlistService = inject(WishlistService);
  private readonly categoriesApiService = inject(CategoriesApiService);

  categories = signal<ICategory[] | null>(null);
  isDrawerOpen = signal(false);
  user = signal<IUser | null>(null);

  wishlistCount = computed(() => this.wishlistService.wishlistCount());
  cartCount = computed(() => this.cartService.cartCount());
  isLogged = computed(() => this.authService.isLogged());
  isUserDropdown = signal(false);

  constructor() {
    effect(() => {
      let user = this.authService.user();
      if (this.isLogged()) {
        this.user.set(user);
      }
    });
  }
  ngOnInit() {
    this.getCategories();
  }

  // api data
  getCategories(): void {
    this.categoriesApiService.getAllCategories().subscribe({
      next: (res: IAllCategoriesResponse) => {
        const allowedSlugs = [
          'electronics',
          "women's-fashion",
          "men's-fashion",
          'beauty-and-health',
        ];
        this.categories.set(res.data.filter((category) => allowedSlugs.includes(category.slug)));
      },
    });
  }

  // Search
  onSearch(searchValue: string) {
    if (!searchValue) return;
    this.routes.navigate(['/search'], {
      queryParams: { q: searchValue.trim() },
    });
    this.renderer.selectRootElement('#searchInput').value = '';
    if (this.isDrawerOpen()) {
      this.renderer.selectRootElement('#asideSearchInput').value = '';
    }
    this.closeSidebar();
  }

  // Sidebar
  openSidebar() {
    this.isDrawerOpen.set(true);
  }
  @HostListener('window:scroll')
  closeSidebar() {
    this.isDrawerOpen.set(false);
  }
  logout() {
    this.authService.logOut();
  }

  // UserDropdown
  toggleUserDropdown() {
    this.isUserDropdown.set(!this.isUserDropdown());
  }
  @HostListener('window:scroll')
  closeUserDropdown() {
    this.isUserDropdown.set(false);
  }
}
