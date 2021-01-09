import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;

  customers!: any[];
  constructor(public http: HttpClient, public auth: AuthService) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(''),
      name: new FormControl('', Validators.required),
      email: new FormControl(''),
    });

    this.http.get('http://localhost:3000/').subscribe((customersResponse) => {
      this.customers = customersResponse as any;
    });
  }

  Save() {
    var obj = {
      id: this.form.value.id,
      name: this.form.value.name,
      email: this.form.value.email,
    };
    console.log(this.form.value);
    if (obj.id == '' || obj.id == null) {
      this.http.post('http://localhost:3000/', obj).subscribe((success) => {
        this.form.reset();
        this.form.markAsUntouched();
        this.form.markAsPristine();
        this.customers.push(success);
      });
    } else {
      this.http
        .put('http://localhost:3000/' + obj.id, obj)
        .subscribe((success) => {
          this.form.reset();
          this.form.markAsUntouched();
          this.form.markAsPristine();

          const currentObjectIndex = this.customers.findIndex((customer) => {
            return customer.id === obj.id;
          });
          this.customers.splice(currentObjectIndex, 1, obj);
        });
    }
  }

  EditCustomer(id: any) {
    const customer = this.customers.find((customer) => {
      return customer.id === id;
    });

    this.form.patchValue({
      id: customer.id,
      name: customer.name,
      email: customer.email,
    });
  }

  DeleteCustomer(id: any) {
    this.http.delete('http://localhost:3000/' + id).subscribe((success) => {
      var newCustomers = this.customers.filter((customer) => {
        return customer.id !== id;
      });
      this.customers = newCustomers;
    });
  }
}
