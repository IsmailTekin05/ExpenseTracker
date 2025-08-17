import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {TopBarComponent} from './topBar';

interface Expense { id?: number; name: string; amount: number; date?: string; }

@Component({
  selector: 'app-expense',
  standalone: true,
  template: `
    <div class="expense-container">

      <div class="expense-form">
        <h3>Add Expense</h3>
        <form (ngSubmit)="addExpense()" #expenseForm="ngForm">
          <input type="text" [(ngModel)]="newExpense.name" name="name" placeholder="Name" required />
          <input type="number" [(ngModel)]="newExpense.amount" name="amount" placeholder="Amount" required />
          <button type="submit" [disabled]="!expenseForm.valid">Add</button>
        </form>
      </div>

      <div class="expense-list">
        <h3>Expenses</h3>
        <div *ngIf="expenses.length === 0" class="empty-msg">
          <p>No expense has been entered yet.</p>
        </div>
        <div class="scrollable-list" *ngIf="expenses.length > 0">
          <ul>
            <li *ngFor="let exp of expenses">
              <span>{{ exp?.name }} - {{ '$' + (exp?.amount ?? 0) }}</span>
              <button *ngIf="exp.id" (click)="deleteExpense(exp.id)">Delete</button>
            </li>
          </ul>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .expense-container {
      position: fixed;
      top: 60px;
      right: 0;
      width: 50%;
      height: calc(100vh - 60px);
      border: 2px solid #000;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #dc3545, #c82333);
      color: #fff;
      font-family: 'Montserrat', sans-serif;
      overflow: hidden;
      box-sizing: border-box;
    }

    .expense-form {
      margin-bottom: 20px;
      flex-shrink: 0;
    }

    .expense-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .expense-list h3 {
      margin-bottom: 15px;
      flex-shrink: 0;
    }

    .scrollable-list {
      flex: 1;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .scrollable-list::-webkit-scrollbar {
      width: 8px;
    }

    .scrollable-list::-webkit-scrollbar-track {
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
    }

    .scrollable-list::-webkit-scrollbar-thumb {
      background: rgba(255,255,255,0.3);
      border-radius: 4px;
    }

    .scrollable-list::-webkit-scrollbar-thumb:hover {
      background: rgba(255,255,255,0.5);
    }

    .expense-list ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .expense-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      padding: 6px 12px;
      border-radius: 6px;
      background: rgba(255,255,255,0.2);
    }

    .expense-list button {
      background: red;
      border: none;
      padding: 4px 8px;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .expense-form form {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }

    .expense-form input {
      padding: 6px;
      border-radius: 4px;
      border: none;
      flex: 1;
      min-width: 120px;
    }

    .expense-form input[type=number] {
      width: 100px;
      flex: none;
    }

    .expense-form button {
      background: #fff;
      color: red;
      border: none;
      padding: 6px 12px;
      border-radius: 4px;
      cursor: pointer;
    }

    .empty-msg {
      text-align: center;
      padding: 20px;
      background: rgba(255,255,255,0.1);
      border-radius: 6px;
    }
  `],
  imports: [CommonModule, FormsModule]
})
export class ExpenseComponent implements OnInit {
  expenses: Expense[] = [];
  newExpense: Expense = { name: '', amount: 0 };
  private apiUrl = 'http://localhost:8000/api/expenses/';
  @Input() topBar!: TopBarComponent;

  constructor(private http: HttpClient) {}
  ngOnInit() { this.loadExpenses(); }

  loadExpenses() {
    this.http.get<Expense[]>(this.apiUrl).subscribe({
      next: data => this.expenses = data.map(i => ({ ...i, amount: Number(i.amount) })),
      error: err => console.error(err)
    });
  }

  addExpense() {
    if (!this.newExpense.name || !this.newExpense.amount)
      return;
    this.http.post<Expense>(this.apiUrl, this.newExpense).subscribe({
      next: saved => {
        this.expenses.push({ ...saved, amount: Number(saved.amount) });
        this.newExpense = { name: '', amount: 0 };
        if (this.topBar) this.topBar.refreshBalance();
      },
      error: err => console.error(err)
    });
  }

  deleteExpense(id: number) {
    this.http.delete(`${this.apiUrl}${id}/`).subscribe({
      next: () => {
        this.expenses = this.expenses.filter(i => i.id !== id);
        if (this.topBar) this.topBar.refreshBalance();
      },
      error: err => console.error(err)
    });
  }
}
