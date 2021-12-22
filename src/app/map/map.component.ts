
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { GetDataService } from '../get-data.service';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title = 'My first AGM project';
  
  zoom: number = 14;
  locationData:any[] = [];
  lat: any;
  lng: any;
  constructor(private _NgxSpinnerService: NgxSpinnerService, private _GetDataService: GetDataService) { 

  }

  ngOnInit(): void {
    this._NgxSpinnerService.show();
    setTimeout(() => {
      this._NgxSpinnerService.hide();
    }, 2000);
    this._GetDataService.getAnimalsLocation().subscribe(response => {
      response.data.map((el:any) => {
        this.locationData.push({lat: Number(el.lat), lng: Number(el.long)})
      });
      this.lat= this.locationData[0].lat;
      this.lng= this.locationData[0].lng;
    })
  }


 
  }
  

