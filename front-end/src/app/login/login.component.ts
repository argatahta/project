import { Component, OnInit } from '@angular/core';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username: string;
  password: string;

  constructor(private http: Http, private route: Router) { }

  ngOnInit() {
  }

  login() {

    let obj = {
      username: this.username,
      password: this.password
    }
    let header = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: header });

    this.http.post("http://localhost:3000/api/user/login", obj, options)
      .subscribe(
      result => {
        console.log(result.json());
        sessionStorage.setItem("token", result.json().token);
        this.route.navigate(["/main"]);
      },
      error => {
        console.log("User Not Found!");

      }
      )

  }
}
