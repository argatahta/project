import { Component, OnInit } from '@angular/core';
import { Http,Headers, RequestOptions } from "@angular/http";
import { NgForm } from "@angular/forms";



@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  file: File;
  imagePath: string;
  employeeList: any[];


  constructor(private http : Http) { }

  name : string;
  address : string;
  phoneNumber : string;
  salary : string;

  ngOnInit() {
  }

  fileChange($event){
    this.file = $event.target.files[0];
    console.log(this.file)
  }


  submit(){

    let formData = new FormData();
    //append("Key", "Value")
    formData.append("name", this.name);
    formData.append("address", this.address);
    formData.append("phoneNumber",this.phoneNumber);
    formData.append("salary",this.salary)
    formData.append("profilePict", this.file);
    
    let header = new Headers();
    let options = new RequestOptions({ headers : header});

    this.http.post("http://localhost:3000/api/employee", formData, options)
    .subscribe(
      result =>{
        console.log(result.json());
        this.loadEmployeeList();          
      },
      error =>{
        console.log(error);
      }
    );
  }

  loadEmployeeList(){
    this.http.get("http://localhost:3000/api/employee")
    .subscribe(
      result =>{
        this.employeeList = result.json()
        console.log(this.employeeList)
      },
      error =>{

      }
    );
  }
}
