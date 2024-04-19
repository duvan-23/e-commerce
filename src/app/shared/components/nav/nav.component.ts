import { Component, signal } from '@angular/core';
import { RouterLinkActive, RouterLinkWithHref } from '@angular/router';
import { SideMenuComponent } from '../side-menu/side-menu.component';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [RouterLinkWithHref, RouterLinkActive, SideMenuComponent ],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent {
  isMenuOpen: boolean = false;
  hideSideMenu = signal(true);

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleSideMenu() {
    this.hideSideMenu.update(prevState => !prevState);
  }
}
