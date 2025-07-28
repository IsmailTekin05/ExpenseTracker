import { Component } from '@angular/core';

@Component({
  selector: 'expenseTracker',
  standalone: true,
  template: `
    <div class="tracker-box">
      <h1>{{ title }}</h1>
    </div>
  `,
  styles: [`
    .tracker-box {
      position: absolute;
      top: 0;
      left: 0;
      background: linear-gradient(45deg, #4b0082, #000);
      border: 2px solid #ffffff;
      border-radius: 0 10px 10px 5px;
      padding: 10px;
      text-align: center;
      width: 210px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    }
    h1 {
      font-family: 'Montserrat', sans-serif;
      font-weight: bold;
      color: #ffffff;
      font-size: 16px;
    }
  `]
})
export class ExpenseTrackerComponent {
  title = 'EXPENSE TRACKER';
}
