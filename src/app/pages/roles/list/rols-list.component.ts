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
    public userList:boolean = false; 
    public userCreate:boolean = false;
    public userEdit:boolean = false;
    public userDelete:boolean = false;
    //checkbox rols
     public rolList:boolean = false; 
    public rolCreate:boolean = false;
    public rolEdit:boolean = false;
    public rolDelete:boolean = false;
    //checkbox Bussiness
     public buList:boolean = false;
    public buCreate:boolean = false;
    public buEdit:boolean = false;
    public buDelete:boolean = false;
    //

    //modules

    controllers:any;
    grant:any;



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
            this.grant = apiResult.grant; 
            console.log(this.grant);

            this.grant.user.list == true ? this.userList = true: null;
            this.grant.user.add  == true? this.userCreate = true: null; 
            this.grant.user.edit == true? this.userEdit = true: null;
            this.grant.user.delete  == true? this.userDelete = true: null; 

            //roles

            this.grant.rol.list == true ? this.rolList = true: null;
            this.grant.rol.add   == true ? this.rolCreate = true: null; 
            this.grant.rol.edit  == true ? this.rolEdit = true: null;
            this.grant.rol.delete  == true ? this.rolDelete = true: null; 

            //empresas

            this.grant.bussiness.list == true ? this.buList = true: null;
            this.grant.bussiness.add   == true ? this.buCreate = true: null; 
            this.grant.bussiness.edit  == true ? this.buEdit = true: null;
            this.grant.bussiness.delete  == true ? this.buDelete = true: null; 

         


              
           

            
        })
        console.log(id);

    
        
    }

    show(module){
            return module.show;
            
    }
    sendPermission(id){
         let request ={
             grant:{
                user:{
                    list: this.userList,
                    create: this.userCreate,
                    delete: this.userDelete,
                    edit:this.userEdit
                    
                },
                bussiness:{
                    list: this.buList,
                    create: this.buCreate,
                    delete: this.buDelete,
                    edit: this.buEdit
                    
                },
                rol:{
                    list: this.rolList,
                    create: this.rolCreate,
                    delete: this.rolDelete,
                    edit: this.rolEdit
                    
                }



            }
         }
        this.http.post('http://localhost:3000/role/addgrant/'+id+'?AUTH=true',request).toPromise().then(result=>{
                //first controller
                console.log(result.json());

            
        })
        
        
    }
}

