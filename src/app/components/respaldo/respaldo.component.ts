import { GLOBAL } from './../../services/GLOBAL';
import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RespaldoService } from 'src/app/services/respaldo.service';

@Component({
  selector: 'app-respaldo',
  templateUrl: './respaldo.component.html',
  styleUrls: ['./respaldo.component.css']
})
export class RespaldoComponent implements OnInit {

  public url;
  public files;
  public identity;

  constructor(
    private _respaldoService: RespaldoService,
    private _userService : UserService,
    private _router : Router,
  ) {
    this.url = GLOBAL.url;
    this.identity = _userService.getIdentity();
   }

  ngOnInit() {
    
    if(this.identity.role === 'ADMIN'){
      this.listar();
    }else{
      this._router.navigate(['dashboard']);
    }
  }

  listar(){
    this._respaldoService.listar().subscribe(
      response =>{
        this.files = response.files;
        this._router.navigate(['respaldo']);
      },
      error=>{
        console.log(error);
      }
    );
  }

  respaldar(){
    this._respaldoService.respaldar().subscribe(
      response =>{
        this._router.navigate(['respaldo']);
      },
      error=>{
        console.log(error);
      }
    );
    this.listar();
  }

  restaurar(backup){
    this._respaldoService.restaurar(backup).subscribe(
      response =>{
        this._router.navigate(['respaldo']);
      },
      error=>{
        console.log(error);
      }
    );
  }

  eliminar(backup){
    this._respaldoService.eliminar(backup).subscribe(
      response =>{
        this._router.navigate(['respaldo']);
      },
      error=>{
        console.log(error);
      }
    );
    this.listar();
  }

  
}
