import { SeguridadService } from './../../../services/seguridad.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Bitacora } from 'src/app/models/Bitacora';

@Component({
  selector: 'app-seguridad-bitacora',
  templateUrl: './seguridad-bitacora.component.html',
  styleUrls: ['./seguridad-bitacora.component.css']
})
export class BitacoraComponent implements OnInit {

  public url;
  public identity;

  public success_message;
  public error_message;
  public bitacora;
  public bitacoras;

  success_alert(){
    this.success_message = ''; 
  }
 
  error_alert(){
    this.error_message = ''; 
  }


  constructor(
    private _userService : UserService,
    private _seguridadService : SeguridadService,
    private _router : Router,
  ) {
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
  }

  ngOnInit() {

    this.identity = this._userService.getIdentity();
    console.log("rol: ", this.identity.role);
    
    if(this.identity.role === 'ADMIN'){

      this._seguridadService.get_bitacoras().subscribe(
        response =>{
          console.log("response123: " + response);
            this.bitacoras = response.bitacoras;
            console.log("bitacoras: " + this.bitacoras);
        },
        error=>{

        }
      );
    }else{
      this._router.navigate(['dashboard']);
    }
  }

  public registrar(accionObj){

    this.identity = this._userService.getIdentity();

    this._seguridadService.registrar({
      _id: this.identity._id,
      nombre: this.identity.nombres,
      rol: this.identity.role,
      accion: accionObj
    }).subscribe(
      response =>{
        this.bitacora = new Bitacora('','','','');
        this.success_message = 'Se registro el log en la bitacora correctamente';

        console.log("res: " + response);
      },
      error=>{
        this.error_message = 'Error en registrar el log en la bitacora';
        
      }
    );
  }
}
