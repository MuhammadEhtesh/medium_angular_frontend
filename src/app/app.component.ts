import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  form!: FormGroup;
  constructor(public http: HttpClient) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl(''),
    });
  }

  Save() {
    var obj = {
      name: this.form.value.name,
      email: this.form.value.email,
    };
    console.log(obj);
    this.http.post('http://localhost:3000/', obj).subscribe((success) => {
      console.log(success);
      this.form.reset();
      this.form.markAsUntouched();
      this.form.markAsPristine();
    });
  }
}
