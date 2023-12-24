import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent implements OnInit {
  newPassword: any;
  confirmNewPassword: any;
    email: any;
  password: any;

  constructor() { }

  ngOnInit(): void {
  }

    onSubmit() {

    }
}
