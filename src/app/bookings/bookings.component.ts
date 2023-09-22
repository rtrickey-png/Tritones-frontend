import { Component, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service'; // Import the service
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})

export class BookingsComponent {

  formData = {
    name: '',
    subject: '',
    email: '',
    message: ''
  };

  showFormFlag = false;
  showScrollButton = false
  showBookNow = true;

  constructor(private http: HttpClient) {}

  onSubmit() {
    console.log('onSubmit function called');
    console.log(this.formData)
    this.http.post('http://127.0.0.1:8000/contactData/', this.formData).subscribe(
      (response) => {
        console.log('Form submitted successfully', response);
        // Handle success (e.g., show a success message)
      },
      (error) => {
        console.error('Form submission error', error);
        // Handle error (e.g., display an error message)
      }
    );
  }

  toggleForm() {
    this.showFormFlag = !this.showFormFlag;
    this.showBookNow = !this.showBookNow;
  }

  @HostListener('window:scroll', [])
  checkScroll() {
    const scrollPosition = window.scrollY;
    const scrollTopThreshold = 2000;           // adjust this to the starting point at which you want to see the button
    const scrollBottomThreshold = 4000;        // bottom cutoff
    this.showScrollButton = scrollPosition >= scrollTopThreshold && scrollPosition <= scrollBottomThreshold;
  }
}
