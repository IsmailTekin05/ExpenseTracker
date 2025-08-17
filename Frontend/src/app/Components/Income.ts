import {Component, Input, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import {TopBarComponent} from './topBar';

interface Income { id?: number; name: string; amount: number; date?: string; }

@Component({
  selector: 'app-income',
  standalone: true,
  template: `
    <div class="income-container">

      <div class="income-form">
        <h3>Add Income</h3>
        <form (ngSubmit)="addIncome()" #incomeForm="ngForm">
          <input type="text" [(ngModel)]="newIncome.name" name="name" placeholder="Name" required />
          <input type="number" [(ngModel)]="newIncome.amount" name="amount" placeholder="Amount" required />
          <button type="submit" [disabled]="!incomeForm.valid">Add</button>
        </form>
      </div>

      <div class="income-list">
        <h3>Incomes</h3>
        <div *ngIf="incomes.length === 0" class="empty-msg">
          <p>No income has been entered yet.</p>
        </div>
        <div class="scrollable-list" *ngIf="incomes.length > 0">
          <ul>
            <li *ngFor="let inc of incomes">
              <span>{{ inc?.name }} - {{ '$' + (inc?.amount ?? 0) }}</span>
              <button *ngIf="inc.id" (click)="deleteIncome(inc.id)">Delete</button>
            </li>
          </ul>
        </div>
      </div>

    </div>
  `,
  styles: [`
    .income-container {
      position: fixed;
      top: 60px;
      left: 0;
      width: 50%;
      height: calc(100vh - 60px);
      border: 2px solid #000;
      border-radius: 12px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      background: linear-gradient(135deg, #28a745, #218838);
      color: #fff;
      font-family: 'Montserrat', sans-serif;
      overflow: hidden;
      box-sizing: border-box;
    }

    .income-form {
      margin-bottom: 20px;
      flex-shrink: 0;
    }

    .income-list {
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }

    .income-list h3 {
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

    .income-list ul {
      list-style: none;
      padding: 0;
      margin: 0;
    }

    .income-list li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 8px;
      padding: 6px 12px;
      border-radius: 6px;
      background: rgba(255,255,255,0.2);
    }

    .income-list button {
      background: red;
      border: none;
      padding: 4px 8px;
      color: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .income-form form {
      display: flex;
      gap: 10px;
      align-items: center;
      flex-wrap: wrap;
    }

    .income-form input {
      padding: 6px;
      border-radius: 4px;
      border: none;
      flex: 1;
      min-width: 120px;
    }

    .income-form input[type=number] {
      width: 100px;
      flex: none;
    }

    .income-form button {
      background: #fff;
      color: green;
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
export class IncomeComponent implements OnInit {
  incomes: Income[] = [];
  newIncome: Income = { name: '', amount: 0 };
  private apiUrl = 'http://localhost:8000/api/incomes/';
  @Input() topBar!: TopBarComponent;

  constructor(private http: HttpClient) {}
  ngOnInit() { this.loadIncomes(); }

  loadIncomes() {
    this.http.get<Income[]>(this.apiUrl).subscribe({
    next: data => this.incomes = data.map(i => ({ ...i, amount: Number(i.amount) })),
    error: err => console.error(err) }
    );
  }

  addIncome() {
    if (!this.newIncome.name || !this.newIncome.amount) return;
    this.http.post<Income>(this.apiUrl, this.newIncome).subscribe(
      { next: saved => {
        this.incomes.push({ ...saved, amount: Number(saved.amount) });
        this.newIncome = { name: '', amount: 0 };
        if (this.topBar) this.topBar.refreshBalance();
        },
        error: err => console.error(err) }
    );
  }

  deleteIncome(id: number) {
    this.http.delete(`${this.apiUrl}${id}/`).subscribe({
      next: () => {
        this.incomes = this.incomes.filter(i => i.id !== id);
        if (this.topBar) this.topBar.refreshBalance();
      },
      error: err => console.error(err)
    });
  }
}
