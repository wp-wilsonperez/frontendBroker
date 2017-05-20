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

    borrar(id){

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

                this.grant.user.list == true ? this.userList = true: null;
                this.grant.user.add  == true? this.userCreate = true: null; 
                this.grant.user.edit == true? this.userEdit = true: null;
                this.grant.user.delete  == true? this.userDelete = true: null; 


            }
            

            //roles
            if(this.grant.role != undefined){
                     this.grant.role.list == true ? this.rolList = true: null;
                    this.grant.role.add   == true ? this.rolCreate = true: null; 
                    this.grant.role.edit  == true ? this.rolEdit = true: null;
                    this.grant.role.delete  == true ? this.rolDelete = true: null; 
                    this.grant.role.grantview  == true ? this.rolGrantView = true: null; 
                    this.grant.role.grantadd  == true ? this.rolGrantAdd = true: null; 

             }
            

            //empresas
             if(this.grant.business != undefined){
                 this.grant.business.list == true ? this.buList = true: null;
                this.grant.business.add   == true ? this.buCreate = true: null; 
                this.grant.business.edit  == true ? this.buEdit = true: null;
                this.grant.business.delete  == true ? this.buDelete = true: null; 


             }

            

               //licences
            if(this.grant.licence != undefined){
                this.grant.licence.list == true ? this.liList = true: null;
                this.grant.licence.add   == true ? this.liCreate = true: null; 
                this.grant.licence.edit  == true ? this.liEdit = true: null;
                this.grant.licence.delete  == true ? this.liDelete = true: null; 



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
                    grantview : this.rolGrantView,
                    grantadd : this.rolGrantAdd,
                    
                },
                 licence:{
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

