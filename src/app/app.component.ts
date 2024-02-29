// import { Component } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-root',
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'MyFirstWebApiFront';
//   form: FormGroup;
//   http: any;

//   constructor(private fb: FormBuilder) {
//     this.form = this.fb.group({
//       name: ['', [Validators.required, Validators.maxLength(191)]],
//       course: ['', [Validators.required, Validators.maxLength(191)]],
//       email: ['', [Validators.required, Validators.email, Validators.maxLength(191)]],
//       phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
//     });
//   }

//   onSubmit() {
//     if (this.form.valid) {
//       const formData = this.form.value;

//       // Assuming your Laravel API endpoint is http://your-api.com/api/saveFormData
      
//       this.http.post('http://127.0.0.1:8000/api/students', formData)
//         .subscribe(response => {
//           console.log('Form submitted successfully', response);
          
//           this.form.reset();
//         });
//     }

//   }

// }


import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http'; // Import HttpClient
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
onUpdate() {
throw new Error('Method not implemented.');
}
  title = 'MyFirstWebApiFront';
  form: FormGroup;
  formAdmin : FormGroup;
  students: any[] = [];
  admins: any[] = [];
  showAdminContent: boolean = false;
  showStudentContent: boolean = false;
  showUserContent: boolean = false;
  showLoginContent:boolean = false;
  userLoggedIn: boolean = false;
  constructor(private fb: FormBuilder, private http: HttpClient) { // Inject HttpClient
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(191)]],
      course: ['', [Validators.required, Validators.maxLength(191)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(191)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
    this.formAdmin = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(191)]],
      course: ['', [Validators.required, Validators.maxLength(191)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(191)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    });
  }

  onSubmit() {
    debugger;
    if (this.form.valid) {
      const formData = this.form.value;

      // Assuming your Laravel API endpoint is http://your-api.com/api/saveFormData
      this.http.post('http://127.0.0.1:8000/api/students', formData)
        .subscribe(response => {
          this.showSuccessAlert('Form submitted successfully');
          console.log('Form submitted successfully', response);
          this.form.reset();
        });
    }
  }
  onSubmitAdmin() {
    if (this.formAdmin.valid) {
      const formData = this.formAdmin.value;

      // Assuming your Laravel API endpoint is http://your-api.com/api/saveFormData
      this.http.post('http://127.0.0.1:8000/api/admin', formData)
        .subscribe(response => {
          this.showSuccessAlert('Form submitted successfully');
          console.log('Form submitted successfully', response);
          this.form.reset();
        });
    }
  }

  getStudents() {
    // Read operation
    this.http.get<any[]>('http://127.0.0.1:8000/api/students') // Explicitly define the type as any[]
      .subscribe((response: any[]) => {
        console.log('Students retrieved successfully', response);
        this.students = response;
      });
  }
  getAdmins() {
    // Read operation
    this.http.get<any[]>('http://127.0.0.1:8000/api/admin') // Explicitly define the type as any[]
      .subscribe((response: any[]) => {
        console.log('Admin retrieved successfully', response);
        this.admins = response;
      });
  }



  updateStudent(id: number) {
    // Assume you have a method to get the updated data (e.g., from a form)
    const updatedData = this.form.value;

    // Update operation
    this.http.put(`http://127.0.0.1:8000/api/students/${id}`, updatedData)
      .subscribe(response => {
        console.log('Student updated successfully', response);
        
        this.formAdmin.reset();
        this.getStudents(); // Refresh the list after updating
      });
  }

  deleteStudent(id: number) {
    // Delete operation
    this.http.delete(`http://127.0.0.1:8000/api/students/${id}`)
      .subscribe(response => {
        console.log('Student deleted successfully', response);
        this.getStudents(); // Refresh the list after deleting
      });
  }
  onResetForm() {
    // Implement your logic to reset the form
    this.form.reset();
    console.log('Form reset');
  }
  onResetFormAdmin() {
    // Implement your logic to reset the form
    this.formAdmin.reset();
    console.log('Form reset');
  }
  private showSuccessAlert(message: string) {
    Swal.fire({
      icon: 'success',
      title: 'Success!',
      text: message,
      timer: 2000, // Adjust the timer as needed
      showConfirmButton: false
    });
  }

  handleLoginSuccess(message: string) {
    console.log(message);
    this.userLoggedIn = true;
  }
}
