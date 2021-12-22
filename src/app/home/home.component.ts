import { Component, OnInit } from '@angular/core';
import { GetDataService } from '../get-data.service';
import { NgxSpinnerService } from "ngx-spinner";


// import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  single: any[] = [];
  multi: any[] = [];

  view: [number, number] = [1000, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Semester';
  showYAxisLabel = true;
  yAxisLabel = 'Number of new outbreaks';
  showDataLabel = true;

  // Options2
  timeline: boolean = true;
  legend: boolean = true;
  showLabels: boolean = true;
  animations: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  XLabel: string = 'Year';
  YLabel: string = 'Population';


  constructor(private _GetDataService: GetDataService, private _NgxSpinnerService: NgxSpinnerService) {}

  semesterOutbreaks = [];

  ngOnInit(): void {

    this._NgxSpinnerService.show()
    setTimeout(() => {
      this._NgxSpinnerService.hide()
    }, 2000);
    this._GetDataService.getAnimalsOutbreaks().subscribe(response => {
      this.semesterOutbreaks = response.data.map((el:any) => ({name: el.semster, value: el.numberOfOutbreaks}))
    })

    this._GetDataService.getAnimalsDeath().subscribe(response => {
      // this.semesterDeath = response.data.map((el:any) => ({name: el.semster, value: el.killedAndDisposedOf}))
      console.log(response.data)
    })
  }
}
