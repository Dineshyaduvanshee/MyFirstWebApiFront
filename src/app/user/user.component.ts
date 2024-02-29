import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MyserviceService } from '../myservice.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  @Input() products: any[] = [];
  userData: FormGroup; // Object to store form data
  constructor(private http:HttpClient,private fb:FormBuilder,private myService :MyserviceService) {  
    this.userData = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(191)]],
      price: ['', [Validators.required, Validators.maxLength(191)]],
      Availability: ['', [Validators.required, Validators.maxLength(191)]],
      Brand: ['', [Validators.required,Validators.maxLength(6)]],
      Category:['', [Validators.required, Validators.maxLength(191)]],
      Colors:['', [Validators.required, Validators.maxLength(191)]],
      Dimensions:['', [Validators.required, Validators.maxLength(191)]],
      Images:['', [Validators.required, Validators.maxLength(191)]],
      Inventory:['', [Validators.required, Validators.maxLength(191)]],
      Rating:['', [Validators.required, Validators.maxLength(191)]],
      Reviews:['', [Validators.required, Validators.maxLength(191)]],
      Specifications:['', [Validators.required, Validators.maxLength(191)]],
      Stock:['', [Validators.required, Validators.maxLength(191)]],
      serioul_no:['', [Validators.required, Validators.maxLength(191)]],
      weight:['', [Validators.required, Validators.maxLength(191)]],
      description:['', [Validators.required, Validators.maxLength(191)]],
      SKU : ['',[Validators.required, Validators.maxLength(191)]]
    });
  }
  
  ngOnInit(): void {
   this.getProducts();
  }
 

  printData(){
    console.log(this.products);
    
  }
  getProducts() {
    // Read operation
    this.http.get<any>('http://127.0.0.1:8000/api/products') // No need to explicitly define the type as any[]
      .subscribe(response => {
        console.log('Product retrieved successfully', response);
        
        this.products = response.data; // Assign the 'data' property to 'admins'
      });
  }

  

  // submitForm() {
  //   // Send HTTP POST request to Laravel backend
  //   // Use Angular's HttpClient to make the request
  //   // Make sure to import the necessary modules and inject the HttpClient in your constructor
  //   this.http.post('http://127.0.0.1:8000/api/product', this.userData)
  //     .subscribe(response => {
  //       console.log('Product stored successfully:', response);
       
  //     }, error => {
  //       console.error('Error storing product:', error);
  //     });
  // }

  // submitForm() {
  //   if (this.userData.valid) {
  //     this.myService.createProduct(this.userData.value).subscribe(
  //       response => {
  //         console.log('Product stored successfully:', response);
  //         this.userData.reset();
  //       },
  //       error => {
  //         console.error('Error storing product:', error);
  //       }
  //     );
  //   }

  //   this.http.post('http://127.0.0.1:8000/api/product', this.userData)
  //   .subscribe(response => {
  //     console.log('Product stored successfully:', response);
     
  //   }, error => {
  //     console.error('Error storing product:', error);
  //   });
  // }

  // onSubmit(): void {
  //   if (this.userData.valid) {
  //     // Convert the form data to a plain object
  //     const formData = { ...this.userData.value };

  //     // Call the product service to store the product
  //     this.myService.createProduct(formData).subscribe(
  //       (response) => {
  //         console.log('Product stored successfully:', response);
  //       },
  //       (error) => {
  //         console.error('Error storing product:', error);
  //       }
  //     );
  //   }
  // }

  onSubmit(): void {
   // debugger;
    if (this.userData.valid) {
      this.showSuccessAlert('Product submitted successfully');
      // Convert the form data to a plain object
      const formData = { ...this.userData.value };
      
      // Call the product service to store the product
      this.myService.createProduct(formData).subscribe(
        
        (response) => {
          console.log('Product stored successfully:', response);
         
          // Optionally, reset the form after successful submission
          this.userData.reset();
        },
        (error) => {
          console.error('Error storing product:', error);
          if (error instanceof HttpErrorResponse && error.status === 422) {
            // Handle validation errors and display them to the user
            console.log('Validation errors:', error.error.errors);
            // You can update your form controls with the error messages here
          }
        }
      );
    }
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
}
