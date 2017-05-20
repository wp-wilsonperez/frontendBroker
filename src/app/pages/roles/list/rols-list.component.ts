import { UserSessionService } from './../../../providers/session.service';
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
    public rolGrantAdd:boolean = false;
    public rolGrantView:boolean = false;
    //checkbox Bussiness
     public buList:boolean = false;
    public buCreate:boolean = false;
    public buEdit:boolean = false;
    public buDelete:boolean = false;

     //checkbox Licence
     public liList:boolean = false;
    public liCreate:boolean = false;
    public liEdit:boolean = false;
    public liDelete:boolean = false;
    //

    //modules

    controllers:any;
    grant:any;
    userSession:any;



    constructor(public http:Http,public local:UserSessionService){
        this.userSession = this.local.getUser();
        console.log(this.userSession);
        
        this.loadRols();
      
    } 

   reset(){
        //checkbox user
                this.userList = false; 
                this.userCreate = false;
                this.userEdit = false;
                this.userDelete = false;
                //checkbox rols
                this.rolList = false; 
                this.rolCreate = false;
                this.rolEdit = false;
                this.rolDelete = false;
                this.rolGrantAdd = false;
                this.rolGrantView = false;
                //checkbox Bussiness
                this.buList = false;
                this.buCreate = false;
                this.buEdit= false;
                this.buDelete = false;

                //checkbox Licence
                this.liList = false;
                this.liCreate = false;
                this.liEdit = false;
                this.liDelete = false;
    //

   }

    borrar(id){
  
            console.log(id);
            
        this.http.delete('http://localhost:3000/role/delete/'+id+'?access_token='+this.userSession.token).toPromise().then(result=>{
                this.loadRols();
                this.toast = true;
                this.message ="Rol borrado";
        })
    }
    loadRols(){

        this.http.get('http://localhost:3000/role/list?access_token='+this.userSession.token).toPromise().then(result=>{
            let apiResult = result.json();
            this.rolsData = apiResult.roles;
            console.log(this.rolsData);
            
            
        })

    }
    checkPermission(id){

        
        
        this.http.get('http://localhost:3000/role/viewgrant/'+id+'?access_token='+this.userSession.token).toPromise().then(result=>{
            let apiResult = result.json();
            console.log(apiResult);
            this.controllers = apiResult.module.controllers;     
            this.grant = apiResult.grant; 
            console.log(this.grant);
            if(this.grant.user != undefined){

                this.grant.user.list == true ? this.userList = true: this.userList = false;
                this.grant.user.add  == true? this.userCreate = true:this.userCreate = false; 
                this.grant.user.edit == true? this.userEdit = true:this.userEdit = false;
                this.grant.user.delete  == true? this.userDelete = true:this.userDelete = false; 


            }
            

            //roles
            if(this.grant.role != undefined){
                     this.grant.role.list == true ? this.rolList = true:this.rolList = false;
                    this.grant.role.add   == true ? this.rolCreate = true: this.rolCreate = false; 
                    this.grant.role.edit  == true ? this.rolEdit = true:this.rolEdit = false;
                    this.grant.role.delete  == true ? this.rolDelete = true: this.rolDelete = false; 
                    this.grant.role.viewgrant  == true ? this.rolGrantView = true: this.rolGrantView = false; 
                    this.grant.role.addgrant  == true ? this.rolGrantAdd = true:this.rolGrantAdd = false; 

             }
            

            //empresas
             if(this.grant.business != undefined){
                 this.grant.business.list == true ? this.buList = true:this.buList = false;
                this.grant.business.add   == true ? this.buCreate = true: this.buCreate = false; 
                this.grant.business.edit  == true ? this.buEdit = true:this.buEdit = false;
                this.grant.business.delete  == true ? this.buDelete = true:this.buDelete = false; 


             }

            

               //licences
            if(this.grant.license != undefined){
                this.grant.license.list == true ? this.liList = true:this.liList = false;
                this.grant.license.add   == true ? this.liCreate = true: this.liCreate = false; 
                this.grant.license.edit  == true ? this.liEdit = true:this.liEdit = false;
                this.grant.license.delete  == true ? this.liDelete = true:this.liDelete = false; 



            }

            
         


              
           

            
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
                    add: this.userCreate,
                    delete: this.userDelete,
                    edit:this.userEdit
                    
                },
                business:{
                    list: this.buList,
                   
                    add: this.buCreate,
                    delete: this.buDelete,
                    edit: this.buEdit
                    
                },
                role:{
                    list: this.rolList,
                  
                    add: this.rolCreate,
                    delete: this.rolDelete,
                    edit: this.rolEdit,
                    addgrant : this.rolGrantView,
                    viewgrant : this.rolGrantAdd,
                    
                },
                 license:{
                    list: this.liList,
                  
                    add: this.liCreate,
                    delete: this.liDelete,
                    edit: this.liEdit,
              
                    
                }



            }
         }
        this.http.post('http://localhost:3000/role/addgrant/'+id+'?access_token='+this.userSession.token,request).toPromise().then(result=>{
                //first controller
                console.log(result.json());

            
        })
        
        
    }
}

