import { GLOBAL } from 'src/app/services/GLOBAL';
import { UserService } from 'src/app/services/user.service';

import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad-index.component.html',
  styleUrls: ['./seguridad-index.component.css']
})
export class SeguridadComponent implements OnInit {

  public url;
  public identity;

  constructor(
    private _userService : UserService,
    private _router : Router,
  ) {
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
  }

  ngOnInit() {
    console.log(this.identity);
    if(this.identity.role != 'ADMIN'){
      this._router.navigate(['dashboard']);
    }
  }
  
}
