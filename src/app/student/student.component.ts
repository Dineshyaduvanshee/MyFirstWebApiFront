import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {

  @Input() students: any[] = [];

  constructor(private http : HttpClient) { }
  
  ngOnInit() {
    
    this.getStudents();
  }
    printData(){
      console.log(this.students);
      
    }
  
    getStudents() {
     
      this.http.get<any>('http://127.0.0.1:8000/api/students') // No need to explicitly define the type as any[]
        .subscribe(response => {
          console.log('Admin retrieved successfully', response);
          this.students = response.data; // Assign the 'data' property to 'admins'
        });
    }
}
