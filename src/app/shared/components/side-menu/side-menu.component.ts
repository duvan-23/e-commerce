import { Component, EventEmitter, Input, Output, signal } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  standalone: true,
  imports: [],
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.css'
})
export class SideMenuComponent {
  @Input({required:true}) sideMenu!:boolean ;
  @Output() toggle = new EventEmitter();

  toggleSideMenu(){
    this.toggle.emit();
  }
}
