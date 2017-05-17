import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormBuilder, Validators,FormControl,FormGroup,AbstractControl } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'az-inputs',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './roles.component.html'
})
export class RolesComponent { 
  public rolesForm:FormGroup;


  constructor(public formBuilder:FormBuilder,public http:Http,public router:Router){

        this.rolesForm= this.formBuilder.group({
            'name':['',Validators.compose([Validators.required])],
            'description':['',Validators.compose([Validators.required])]

        })
  }
  saveRol(){
        let request = {
          name: this.rolesForm.value.name,
          description: this.rolesForm.value.description
        }    
        console.log(request);
        this.http.post('http://localhost:3000/role/add?AUTH=true',request).toPromise().then(result=>{
                let apiResult = result.json();
                console.log(apiResult.update[apiResult.update.length -1]);
                var idRol = apiResult.update[apiResult.update.length -1];
                        if(apiResult.msg == "OK"){
                          let req = {
                              grant:{
                                    user:{
                                        list: false,
                                        create: false,
                                        delete: false,
                                        edit:false
                                      
                                    },
                                    bussiness:{
                                        list:false,
                                        create:false,
                                        delete: false,
                                        edit:false
                                      
                                    },
                                    rol:{
                                        list: false,
                                        create: false,
                                        delete: false,
                                        edit: false
                                      
                                    }


                  
                              }
                          };
                         this.http.post('http://localhost:3000/role/addgrant/'+idRol._id+'?AUTH=true',req).toPromise().then(result=>{
                        //first controller
                        console.log(result.json());

            
        })

          

                          
                          
                        }               
                //
                
        })
        
        
  }


}
