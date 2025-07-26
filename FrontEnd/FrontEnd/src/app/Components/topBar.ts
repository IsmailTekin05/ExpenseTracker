// top-bar.component.ts
import { Component, OnInit } from '@angular/core';
import { NgStyle } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'top-bar',
  standalone: true,
  imports: [NgStyle, HttpClientModule],
  template: `
    <div class="top-bar" [ngStyle]="{ 'background-color': backgroundColor }">
      <span>{{ number }}</span>
    </div>
  `,
  styles: [`
    .top-bar {
      position: absolute;
      top: 0;
      left: 220px;
      height: 60px;
      width: calc(100% - 200px);
      border: 2px solid #4b0082;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Montserrat', sans-serif;
      font-size: 16px;
      font-weight: bold;
      color: #ffffff;
    }
  `]
})
export class TopBarComponent implements OnInit {
  number: number = 0;
  backgroundColor: string = 'yellow';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchNumber();
  }

  fetchNumber(): void {
    // Replace this with a real API if needed
    setTimeout(() => {
      this.number = 55; // mock value
      this.updateBackgroundColor();
    }, 1000);

    // If you want real HTTP call later:
    /*
    this.http.get<number>('https://your-api.com/number')
      .subscribe({
        next: (value) => {
          this.number = value;
          this.updateBackgroundColor();
        },
        error: (err) => console.error('Error fetching number:', err)
      });
    */
  }

  updateBackgroundColor(): void {
    if (this.number === 0) {
      this.backgroundColor = 'rgb(128, 111, 0)';
    } else if (this.number > 0) {
      const greenIntensity = Math.max(0, 255 - (this.number / 1000000) * (255 - 50));
      this.backgroundColor = `rgb(0, ${greenIntensity}, 0)`;
    } else {
      const redIntensity = Math.max(0, 255 - (Math.abs(this.number) / 1000000) * (255 - 50));
      this.backgroundColor = `rgb(${redIntensity}, 0, 0)`;
    }
  }
}
