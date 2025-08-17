import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'top-bar',
  standalone: true,
  imports: [NgStyle, HttpClientModule],
  template: `
    <div class="top-bar" [ngStyle]="{ 'background-color': backgroundColor }">
      <div class="content-wrapper">
        <div class="balance-label">Net Balance</div>
        <div class="balance-amount">{{ formatCurrency(number) }}</div>
        <div class="balance-indicator" [class]="getBalanceIndicatorClass()">
          {{ getBalanceStatus() }}
        </div>
      </div>
    </div>
  `,
  styles: [`
    .top-bar {
      position: fixed;
      top: 0;
      left: 230px; /* adjust as needed */
      width: calc(100% - 230px);
      height: 60px;

      border: 4px solid transparent;
      border-radius: 0;

      display: flex;
      align-items: center;
      justify-content: center;

      font-family: 'Montserrat', sans-serif;
      color: #ffffff;

      z-index: 1000;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      transition: background-color 0.3s ease;
      box-sizing: border-box;

      /* Rich rainbow gradient border */
      border-image: conic-gradient(
        from 0deg,
        red, orange, yellow, lime, green, turquoise,
        cyan, skyblue, blue, indigo, violet, magenta, pink, red
      ) 1;
      border-image-slice: 1;

      /* Animate rotation (clockwise, slow) */
      animation: rainbow-rotate 20s linear infinite;
    }

    @keyframes rainbow-rotate {
      from {
        border-image-source: conic-gradient(
          from 0deg,
          red, orange, yellow, lime, green, turquoise,
          cyan, skyblue, blue, indigo, violet, magenta, pink, red
        );
      }
      to {
        border-image-source: conic-gradient(
          from 360deg,
          red, orange, yellow, lime, green, turquoise,
          cyan, skyblue, blue, indigo, violet, magenta, pink, red
        );
      }
    }

    .content-wrapper {
      display: flex;
      align-items: center;
      gap: 15px;
      text-align: center;
      z-index: 3;
      position: relative;
      max-width: 100%;
      overflow: hidden; /* prevent inner content from overflowing */
    }

    .balance-label {
      font-size: 12px;
      font-weight: 500;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 1px;
      white-space: nowrap; /* Prevent text wrapping */
    }

    .balance-amount {
      font-size: 24px;
      font-weight: bold;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      white-space: nowrap; /* Prevent text wrapping */
    }

    .balance-indicator {
      font-size: 11px;
      font-weight: 600;
      padding: 4px 8px;
      border-radius: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
      white-space: nowrap; /* Prevent text wrapping */
    }

    .balance-indicator.positive { background: rgba(76,175,80,0.8); color:#fff; }
    .balance-indicator.negative { background: rgba(244,67,54,0.8); color:#fff; }
    .balance-indicator.neutral  { background: rgba(255,193,7,0.8); color:#fff; }

    /* Additional mobile responsiveness */
    @media (max-width: 768px) {
      .content-wrapper {
        gap: 10px;
        padding: 0 10px;
      }

      .balance-label { font-size: 10px; }
      .balance-amount { font-size: 20px; }
      .balance-indicator { font-size: 10px; padding: 3px 6px; }
    }
  `]
})
export class TopBarComponent implements OnInit {
  private totalIncome: number = 0;
  private totalExpense: number = 0;

  number: number = 0;
  backgroundColor: string = 'yellow';
  private apiUrl = 'http://localhost:8000/api/';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.refreshBalance();
  }

  fetchTotalIncome(): void {
    this.http.get<any[]>(this.apiUrl + 'incomes/').subscribe({
      next: (data) => {
        this.totalIncome = data.reduce((sum, income) => sum + Number(income.amount), 0);
        this.updateNetBalance();
      },
      error: (err) => console.error('Error fetching incomes:', err)
    });
  }

  fetchTotalExpense(): void {
    this.http.get<any[]>(this.apiUrl + 'expenses/').subscribe({
      next: (data) => {
        this.totalExpense = data.reduce((sum, expense) => sum + Number(expense.amount), 0);
        this.updateNetBalance();
      },
      error: (err) => console.error('Error fetching expenses:', err)
    });
  }

  private updateNetBalance(): void {
    this.number = this.totalIncome - this.totalExpense;
    this.updateBackgroundColor();
  }

  updateBackgroundColor(): void {
    if (this.number > 0) this.backgroundColor = 'green';
    else if (this.number < 0) this.backgroundColor = 'red';
    else this.backgroundColor = 'yellow';
  }

  formatCurrency(amount: number): string {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }

  getBalanceStatus(): string {
    if (this.number > 0) return 'Surplus';
    if (this.number < 0) return 'Deficit';
    return 'Balanced';
  }

  getBalanceIndicatorClass(): string {
    if (this.number > 0) return 'positive';
    if (this.number < 0) return 'negative';
    return 'neutral';
  }

  public refreshBalance(): void {
    this.fetchTotalIncome();
    this.fetchTotalExpense();
  }
}
