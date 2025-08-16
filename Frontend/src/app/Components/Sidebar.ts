import {Component} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  template: `
    <div class="sidebar" [ngStyle]="{ 'background-color': '#6f7173' }">
    </div>
  `,
  styles: [`
    .sidebar {
      position: absolute;
      top: 60px;
      left: 0;
      height: calc(90% + 2px);
      width: 225px;
      border: 4px solid #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
    }
  `],
  imports: [
    NgStyle
  ]
})

export class SidebarComponent {
}
