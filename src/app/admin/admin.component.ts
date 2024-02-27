import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  @Input() admins: any[] = [];

constructor(private http : HttpClient) { }
  ngOnInit(): void {
    this.getAdmins();
  }

  printData(){
    console.log(this.admins);
    
  }

  // getAdmins() {
  //   // Read operation
  //   this.http.get<any[]>('http://127.0.0.1:8000/api/admin') // Explicitly define the type as any[]
  //     .subscribe((response: any[]) => {
  //       console.log('Admin retrieved successfully', response);
  //       this.admins = response;
  //     });
  // }
  getAdmins() {
    // Read operation
    this.http.get<any>('http://127.0.0.1:8000/api/admin') // No need to explicitly define the type as any[]
      .subscribe(response => {
        console.log('Admin retrieved successfully', response);
        this.admins = response.data; // Assign the 'data' property to 'admins'
      });
  }
  
}
