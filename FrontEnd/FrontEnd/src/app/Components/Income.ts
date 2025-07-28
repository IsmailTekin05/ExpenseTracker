import {Component} from '@angular/core';
import {NgStyle} from '@angular/common';

@Component({
  selector: 'income',
  standalone: true,
  template: `
    <div class="income" [ngStyle]="{ 'background-color': 'white' }">
    </div>
  `,
  styles: [`
    .income {
      position: absolute;
      top: 60px;
      left: 227px;
      height: calc(90% + 7px);
      width: calc(50% - 126px);
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

export class IncomeComponent {
}
