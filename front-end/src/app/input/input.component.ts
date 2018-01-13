import { Component, OnInit } from '@angular/core';
import { Http,Headers, RequestOptions } from "@angular/http";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  file: File;
  imagePath: string;
  employeeList: any[];


  constructor(private http : Http, private route :Router) { }

  name : string;
  address : string;
  phoneNumber : string;
  salary : string;

  ngOnInit() {
    
    // const token = localStorage.removeItem("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhNTViZmZkZWZkZmY0MzAzY2E0ZWM0ZSIsIm5hbWUiOiJoZWxsb3N1bnNoaW5lIiwiaWF0IjoxNTE1NzM5Mjc0LCJleHAiOjE1MTU3NDAyNzR9.8FOUYT1cVdYHDaATD0t2rqjpkGndMLU_ZwwIQm4iClE")
    const token =sessionStorage.getItem("token");
    if(!token){
      this.route.navigate(['/'])
    }else{
      let header = new Headers({"Authorization": "Bearer " + token});
      let options = new RequestOptions({ headers : header});
      this.http.post("http://localhost:3000/api/validatetoken", {}, options)
      .subscribe(
        result =>{

        },
        error =>{
          sessionStorage.removeItem("token")
          this.route.navigate(['/']);

        }
      )
    
    }

    this.loadEmployeeList()

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
    
    let token = sessionStorage.getItem("token");
    let header = new Headers({"Authorization":"Bearer "+token});
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

    let token = sessionStorage.getItem("token")
    let header = new Headers({ "Authorization":"Bearer "+token});
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
    let token = sessionStorage.getItem("token")
    let header = new Headers({ "Authorization":"Bearer "+token});
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
