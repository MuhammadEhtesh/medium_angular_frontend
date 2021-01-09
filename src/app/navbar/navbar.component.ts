import { DOCUMENT } from '@angular/common';
import { AuthService } from '@auth0/auth0-angular';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  constructor(
    public auth: AuthService,
    @Inject(DOCUMENT) private doc: Document
  ) {}

  ngOnInit(): void {}

  logout() {
    this.auth.logout({ returnTo: this.doc.location.origin });
  }
}
