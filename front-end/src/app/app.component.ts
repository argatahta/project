import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http : Http){}

  ngOnInit(){
  }

 
}

