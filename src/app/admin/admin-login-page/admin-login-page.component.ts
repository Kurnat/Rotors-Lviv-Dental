import { AuthLoginService } from './../../shared/services/admin-login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login-page',
  templateUrl: './admin-login-page.component.html',
  styleUrls: ['./admin-login-page.component.scss']
})
export class AdminLoginPageComponent implements OnInit {


  constructor(
      public fb: FormBuilder,
      private authLoginService: AuthLoginService,
      private router: Router) { }

  adminForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.authLoginService.login();
    this.router.navigate(['/admin']);
  }

}
