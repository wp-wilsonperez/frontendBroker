import { ValidationService } from './validation.service';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { FormBuilder, Validators,FormControl,FormGroup,AbstractControl } from '@angular/forms';
import { Component, ViewEncapsulation } from '@angular/core';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'az-inputs',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './bussiness.component.html'
})
export class BussinessComponent { 
  public bussinessForm:FormGroup;
  attempt = {
    valid: null
  }


  constructor(public formBuilder:FormBuilder,public http:Http,public router:Router){

        this.bussinessForm= this.formBuilder.group({
            'ruc':['',Validators.compose([Validators.required])],
            'name':['',Validators.compose([Validators.required])],
            'userMaster': ['', Validators.compose([Validators.required, Validators.minLength(10), ValidationService.numberValidator ])],
               'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'phone':['',Validators.compose([Validators.required ])],
            'movil':['',Validators.compose([Validators.required])],
            'address':[''],
            'constitutionDate':['',Validators.compose([Validators.required])],
            'parking':[''],
            'numberEmp':['',Validators.compose([Validators.required])],
            'mail':['',Validators.compose([Validators.required , ValidationService.emailValidator])],
            'web':[''],
            'description':['']

        },{validator: ValidationService.validacionCedula('userMaster')})
  }
  saveBussiness(){

        if(this.bussinessForm.valid){

                this.http.post('http://localhost:3000/business?AUTH=true',this.bussinessForm.value).toPromise().then(result=>{
                let apiResult = result.json();
                console.log(apiResult);
                apiResult.msg == "OK"? this.router.navigate(['pages/bussiness/listado']):null
                
                //
                
        })

        }else{

              this.attempt.valid = false;
        }
      
       
        
        
  }


}
