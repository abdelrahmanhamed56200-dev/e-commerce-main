import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { STORED_KEYS } from '../../../core/constants/stored-keys';

@Component({
  selector: 'app-theme',
  imports: [],
  templateUrl: './theme.component.html',
  styleUrl: './theme.component.css',
})
export class ThemeComponent implements OnInit {
  private readonly renderer = inject(Renderer2);
  private readonly pLATFORM_ID = inject(PLATFORM_ID);

  @ViewChild('themeDrawer') themeDrawer!: ElementRef<HTMLDivElement>;
  @ViewChild('overlay') overlay!: ElementRef<HTMLDivElement>;
  @ViewChild('floatingBtn') floatingBtn!: ElementRef<HTMLButtonElement>;

  isOpen = false;
  selectedName = signal<string>('');
  isSelected = signal<string>('green');

  themesNames: string[] = ['green', 'indigo', 'purple', 'orange', 'teal', 'rose', 'amber'];
  themeHex: {
    [key: string]: string;
  } = {
    green: '#16a34a',
    indigo: '#6366f1',
    purple: '#8b5cf6',
    orange: '#f97316',
    teal: '#22d3ee',
    rose: '#f43f5e',
    amber: '#ea580c',
  };

  ngOnInit(): void {
    if (isPlatformBrowser(this.pLATFORM_ID)) {
      const savedColor = localStorage.getItem(STORED_KEYS.themeColor);
      if (savedColor) {
        this.setTheme(savedColor);
      } else {
        this.setTheme(this.selectedName());
      }
    }
  }

  setTheme(name: string): void {
    this.renderer.setAttribute(document.documentElement, 'data-theme', name);
    localStorage.setItem(STORED_KEYS.themeColor, name);
    this.setSelectedTheme(name);
    if (this.isOpen) this.closeDrawer();
  }

  setSelectedTheme(name: string): void {
    this.isSelected.set(name);
  }

  toggleDrawer(): void {
    this.isOpen = !this.isOpen;
    if (this.isOpen) {
      this.openDrawer();
    } else {
      this.closeDrawer();
    }
  }
  openDrawer(): void {
    const drawer = this.themeDrawer.nativeElement;
    const overlay = this.overlay.nativeElement;
    this.isOpen = true;

    this.renderer.addClass(drawer, 'right-0');
    this.renderer.removeClass(drawer, 'right-[-320px]');

    this.renderer.removeClass(overlay, 'hidden');

    setTimeout(() => {
      this.renderer.addClass(overlay, 'opacity-100');
      this.renderer.removeClass(overlay, 'opacity-0');
    }, 10);
  }
  @HostListener('window:keydown.escape')
  @HostListener('window:scroll')
  closeDrawer(): void {
    const drawer = this.themeDrawer.nativeElement;
    const overlay = this.overlay.nativeElement;
    this.isOpen = false;

    this.renderer.addClass(overlay, 'opacity-100');
    this.renderer.removeClass(overlay, 'opacity-0');

    setTimeout(() => this.renderer.addClass(overlay, 'hidden'), 300);
    this.renderer.removeClass(drawer, 'right-0');
    this.renderer.addClass(drawer, 'right-[-320px]');
  }
}
