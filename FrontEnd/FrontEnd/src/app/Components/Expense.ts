import {Component} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'expense',
  standalone: true,
  template: `
    <div class="expense" [ngStyle]="{ 'background-color': 'white' }">
    </div>
  `,
  styles: [`
    .expense {
      position: absolute;
      top: 60px;
      left: calc(50% + 103px);
      right:calc(100%);
      height: calc(90% + 7px);
      width: calc(50% - 106px);
      border: 2px solid #000000;
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

export class ExpenseComponent {
}
