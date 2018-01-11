import { Component, OnInit } from '@angular/core';
import { Http,Headers, RequestOptions } from "@angular/http";

@Component({
  selector: 'app-uploadfile',
  templateUrl: './uploadfile.component.html',
  styleUrls: ['./uploadfile.component.css']
})
export class UploadfileComponent implements OnInit {

  file : File;
  imagePath : String;

  constructor(private http : Http) {}

  ngOnInit() {
  }

  fileChange($event){
    this.file = $event.target.files[0];
    console.log(this.file)
  }

  upload(){

    let formData = new FormData();
    //append("Key", "Value")
    formData.append("image", this.file);

    let header = new Headers();
    let options = new RequestOptions({ headers : header});

    this.http.post("http://localhost:3000/upload", formData, options)
    .subscribe(
      result =>{
        console.log(result.json());
        this.imagePath = result.json().path;
      },
      error =>{
        console.log(error);
      }
    );
  }
}
