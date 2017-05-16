import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UserSessionService { 

    info:any;
    constructor(public http:Http){

    }

    getUser(){
            if (this.info == undefined){
                   let returnValue = {
                                name: localStorage.getItem('name'),
                                lastName: localStorage.getItem('lastName'),
                                id: localStorage.getItem('id'),
                                cedula: localStorage.getItem('cedula'),
                                userImg: localStorage.getItem('userImg'),
                   }
                   return returnValue;
            } else{
                    
                    return this.info;
            }
    }

    setUser(user){
            this.info = user;
            console.log(this.info);
            
            
            localStorage.setItem('name',user.name);
            localStorage.setItem('id',user._id);
            localStorage.setItem('lastName',user.lastName);
            localStorage.setItem('cedula',user.cedula);
            localStorage.setItem('userImg',user.userImg);
    }
    checkUser(){
            if (localStorage.getItem('id') == undefined)
            {
                return false
            }else{
                return true;
            } 
    }






}