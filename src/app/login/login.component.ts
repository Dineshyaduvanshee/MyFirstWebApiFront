import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // user = { username: '', password: '' };
  @Input() users: any[] = [];
  // formLogin : FormGroup;
  @Output() loginSuccess = new EventEmitter<string>();
  constructor(private fb: FormBuilder, private http : HttpClient) {
    // this.formLogin = this.fb.group({
    //   username: ['', [Validators.required, Validators.maxLength(191)]],
    //   password: ['', [Validators.required, Validators.maxLength(191)]],
    // });
    
  }
  ngOnInit(): void {
    this.getLogins();
  }
 
  // onSubmit() {
  //   // Handle login logic here
  //   console.log('Login clicked:', this.formLogin);
    
  //   const formData = this.formLogin.value;

  //   // Assuming your Laravel API endpoint is http://your-api.com/api/saveFormData
  //   this.http.post('http://127.0.0.1:8000/api/login', formData)
  //     .subscribe(response => {
  //       this.showSuccessAlert('Form submitted successfully');
  //       console.log('Form submitted successfully', response);
  //       this.formLogin.reset();
  //     });
  // }

  // onSubmit() {
  //   console.log('Login clicked:', this.formLogin.value);

  //   const formData = this.formLogin.value;

  //   this.http.post('http://127.0.0.1:8000/api/login', formData)
  //     .subscribe(
  //       (response) => {
  //         this.showSuccessAlert('Form submitted successfully');
  //         console.log('Form submitted successfully', response);
  //         this.formLogin.reset();
  //       },
  //       (error) => {
  //         if (error instanceof HttpErrorResponse) {
  //           console.error('Error submitting form:', error.status, error.statusText, error.error);

  //           if (error.status === 422) {
  //             // Handle validation errors
  //             const validationErrors = error.error.errors;
  //             console.log('Validation errors:', validationErrors);
  //           } else {
  //             // Handle other errors
  //             console.error('Unexpected error:', error);
  //           }
  //         } else {
  //           console.error('Unexpected error:', error);
  //         }
  //       }
  //     );
  // }

  getLogins() {
     
    this.http.get<any>('http://127.0.0.1:8000/api/login') // No need to explicitly define the type as any[]
      .subscribe(response => {
        console.log('Login retrieved successfully', response);
        this.users = response.data; // Assign the 'data' property to 'admins'
      });
  }

  // onSubmitLogin() {
  //   //debugger;
  //   if (this.formLogin.valid) {
      
  //     const formData = this.formLogin.value;
  //     this.http.post('http://127.0.0.1:8000/api/login',formData)
  //       .subscribe(response => {
  //         console.log('Login successfully', response);
  //         this.showSuccessAlert('User successfully logged in');
  //         this.loginSuccess.emit('Loged in  successfully ');
  //         this.formLogin.reset();
  //       });
  //   }
  //   this.loginSuccess.emit('User successfully logged in');
  // }

  // private showSuccessAlert(message: string) {
  //   Swal.fire({
  //     icon: 'success',
  //     title: 'Success!',
  //     text: message,
  //     timer: 2000, // Adjust the timer as needed
  //     showConfirmButton: false
  //   });
  // }
 
}
