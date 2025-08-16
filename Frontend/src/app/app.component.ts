import { Component } from '@angular/core';
import * as Components from './Components';

@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <app-sidebar></app-sidebar>
    <income></income>
    <expense></expense>
    <top-bar></top-bar>
    <expenseTracker></expenseTracker>
  `,
  imports: [Components.TopBarComponent, Components.ExpenseTrackerComponent,
    Components.SidebarComponent,Components.IncomeComponent
  , Components.ExpenseComponent],
})
export class AppComponent {
  title = 'FrontEnd';
}
