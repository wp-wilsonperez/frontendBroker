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
        this.http.post('http://localhost:3000/role?AUTH=true',request).toPromise().then(result=>{
                let apiResult = result.json();
                console.log(apiResult);
                apiResult.msg == "OK"? this.router.navigate(['pages/usuarios/roles']):null
                
                //
                
        })
        
        
  }


}
