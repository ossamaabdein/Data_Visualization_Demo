import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GetDataService } from '../get-data.service';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent implements OnInit {

  semsters:any = [];
  killedAndDisposedOf:any = [];
  death:any = [];
  cases:any = [];

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective)
  public chart!: BaseChartDirective;

  constructor(private _GetDataService: GetDataService, private _NgxSpinnerService: NgxSpinnerService) { }

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    setTimeout(() => {
      this._NgxSpinnerService.hide();
    }, 3000);
    this._GetDataService.getAnimalsDeath().subscribe(response => {
      console.log(response.data)
      response.data.map((el:any) => {
        this.semsters.push(el.semster);
        this.killedAndDisposedOf.push(el.killedAndDisposedOf);
        this.death.push(el.death);
        this.cases.push(el.cases);
      })
      console.log(this.killedAndDisposedOf)
    })

    setTimeout(() => {
      this.chart.chart?.update();
    }, 3000);
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: this.cases,
        label: 'Cases',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: '#536DB8',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      },
      {
        data: this.killedAndDisposedOf,
        label: 'killedAndDisposedOf',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
      {
        data: this.death,
        label: 'Death',
        
        yAxisID: 'y-axis-1',
        backgroundColor: 'rgba(255,0,0,0.3)',
        borderColor: 'red',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)',
        fill: 'origin',
      }
    ],
    // labels: [ 'January', 'February', 'March', 'April', 'May', 'June', 'July' ]
    labels: this.semsters
  };



  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.5
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      x: {},
      'y-axis-0':
        {
          position: 'left',
        },
      'y-axis-1': {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red'
        }
      }
    },

    plugins: {
      legend: { display: true },
      }
  };


}
