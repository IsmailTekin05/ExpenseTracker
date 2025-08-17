import { Component } from '@angular/core';
import * as Components from './Components';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <top-bar #topBar></top-bar>

    <div class="dashboard">
      <div class="column left-column">
        <app-income [topBar]="topBar"></app-income>
      </div>
      <div class="column right-column">
        <app-expense [topBar]="topBar"></app-expense>
        <expenseTracker></expenseTracker>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      display: flex;
      width: 100%;
      margin-top: 60px; /* height of TopBar */
      gap: 20px;
      padding: 20px;
      box-sizing: border-box;
      background-color: black; /* Set background color to black */
      color: white; /* Optional: Set text color to white for better visibility */
    }

    .column {
      display: flex;
      flex-direction: column;
      gap: 20px;
      flex: 1;
    }

    .left-column { max-width: 50%; }
    .right-column { max-width: 50%; }
  `],
  imports: [
    Components.TopBarComponent,
    Components.ExpenseTrackerComponent,
    Components.IncomeComponent,
    Components.ExpenseComponent
  ]
})
export class AppComponent {}
