import { Component, OnInit } from '@angular/core';
import { SecurityService } from 'src/app/services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  form: any = {
    email: null,
    password: null
  };
  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  role: string ;

  constructor(private securityservice : SecurityService) { }

  ngOnInit(): void {
    if (this.securityservice.getToken()) {
      this.isLoggedIn = true;
      this.role = this.securityservice.getAccount().role;
    }
  }
  
  onSubmit(): void {
    const { email, password } = this.form;
    this.securityservice.login(email, password).subscribe(
      data => {
        this.securityservice.saveToken(data.accessToken);
        this.securityservice.saveAccount(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.role = this.securityservice.getAccount().role;
        this.reloadPage();
      },
      err => {
        this.errorMessage = " incorrect credentials";
        this.isLoginFailed = true;
      }
    );
  }
  reloadPage(): void {
    window.location.reload();
  }
}


