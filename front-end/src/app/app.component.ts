import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  employeeList 

  constructor(private http : Http){}

  ngOnInit(){

    this.loadEmployeeList()
  }

  loadEmployeeList(){

    let header = new Headers({ "Authorization":"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNTViZmZkZWZkZmY0MzAzY2E0ZWM0ZSIsIm5hbWUiOiJoZWxsb3N1bnNoaW5lIiwiaWF0IjoxNTE1NjUzNzk2LCJleHAiOjE1MTU2NTQ3OTZ9.LoGItiSF6TAV7G8sDymlvCc6PZq3K0Gq47YB86lOGIQ"});
    let options = new RequestOptions({ headers : header});

    this.http.get("http://localhost:3000/api/employee", options)
    .subscribe(
      result =>{
        this.employeeList = result.json()
        console.log(this.employeeList)
      },
      error =>{

      }
    );
  }

  deleteList(id){
    let header = new Headers();
    let options = new RequestOptions({ headers : header});

    this.http.delete("http://localhost:3000/api/employee/"+id, options)
    .subscribe(
      result=>{
        console.log("Data has been deleted")
        this.loadEmployeeList()
      },
      error =>{
        console.log(error)
      }
    )

  }
}

