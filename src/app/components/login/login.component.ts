import { SeguridadComponent } from './../seguridad/seguridad-index/seguridad-index.component';
import { Component, OnInit } from '@angular/core';
import { User } from "../../models/User";
import { UserService } from 'src/app/services/user.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { BitacoraComponent } from '../seguridad/seguridad-bitacora/seguridad-bitacora.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [BitacoraComponent]
})
export class LoginComponent implements OnInit {

  public user;
  public token;
  public identity;
  public data_error;

  constructor( 
    private bitacora: BitacoraComponent,
    private _userService : UserService,
    private _router : Router,
  ) { 
    this.user = new User('','','','','');
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    if(this.identity){
      this._router.navigate(['ventas']);
    }
  }

  close_alert(){
    this.data_error = ''; 
  }

  login(loginForm){

    var accion = "login";

    if(loginForm.valid){
      
      this._userService.login(this.user).subscribe(
        response =>{
          
          this.token = response.jwt;
          localStorage.setItem('token',this.token);

          this._userService.login(this.user,true).subscribe(
            response=>{
              localStorage.setItem('identity',JSON.stringify(response.user));
              this._router.navigate(['ventas']);
              this.bitacora.registrar(accion);
            },
            error=>{

            }
          )
        },
        error=>{

          this.data_error = error.error.message;
        }
      );
      
    }else{

    }
  }

}
