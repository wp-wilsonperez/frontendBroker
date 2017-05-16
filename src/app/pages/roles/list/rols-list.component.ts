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

    //modules

    controllers:any;



    constructor(public http:Http){
        this.loadRols();
      
    } 

    borrar(id){

        this.http.delete('http://localhost:3000/role/delete/'+id+'?AUTH=true').toPromise().then(result=>{
                this.loadRols();
                this.toast = true;
                this.message ="Rol borrado";
        })
    }
    loadRols(){

        this.http.get('http://localhost:3000/role/list?AUTH=true').toPromise().then(result=>{
            let apiResult = result.json();
            this.rolsData = apiResult.roles;
            console.log(this.rolsData);
            
            
        })

    }
    checkPermission(id){

        
        
        this.http.get('http://localhost:3000/role/viewgrant/'+id+'?AUTH=true').toPromise().then(result=>{
            let apiResult = result.json();
            console.log(apiResult);
            this.controllers = apiResult.module.controllers;        
           

            
        })
        console.log(id);
        this.userCreate = true;
    
        
    }

    show(module){
            return module.show;
            
    }
    sendPermission(id){
                
   

       let request =  {
           grant:{
               user:{
                   list:'list',
                 
               },
               bussiness:{
                   list:'list',
                 
               },
               rol:{
                   list:'list',
                 
               }


          
        }
    }


        this.http.post('http://localhost:3000/role/addgrant/'+id+'?AUTH=true',request).toPromise().then(result=>{
                //first controller
                console.log(result.json());

            
        })
        
        
    }
}

