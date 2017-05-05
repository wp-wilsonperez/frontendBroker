import { Http } from '@angular/http';
import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from './dynamic-tables.service';

@Component({
  selector: 'az-dynamic-tables',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './rols-list.component.html',
  styleUrls: ['./rols-list.component.scss'],
  providers: [ UserService ]
})
export class RolsListComponent {
    public data: any;
    public rolsData:any;
    public searchText:string;
    public toast:boolean;
    public message:string;

    //checkbox user 
    public userCreate:boolean = false;
    public userEdit:boolean = false;
    public userDelete:boolean = false;
    //checkbox rols 
    public rolCreate:boolean = false;
    public rolEdit:boolean = false;
    public rolDelete:boolean = false;
    //checkbox rols 
    public buCreate:boolean = false;
    public buEdit:boolean = false;
    public buDelete:boolean = false;
    //



    constructor(public http:Http){
        this.loadRols();
      
    } 

    borrar(id){

        this.http.delete('http://localhost:3000/role/'+id+'?AUTH=true').toPromise().then(result=>{
                this.loadRols();
                this.toast = true;
                this.message ="Rol borrado";
        })
    }
    loadRols(){

        this.http.get('http://localhost:3000/roles?AUTH=true').toPromise().then(result=>{
            let apiResult = result.json();
            this.rolsData = apiResult.roles;
            console.log(this.rolsData);
            
            
        })

    }
    checkPermission(id){
        this.http.get('http://localhost:3000/role/grant/'+id+'?AUTH=true').toPromise().then(result=>{
            let apiResult = result.json();
            console.log(apiResult);
            
        })
        console.log(id);
        
        
    }
}

