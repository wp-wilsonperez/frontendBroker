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


  constructor(public formBuilder:FormBuilder,public http:Http,public router:Router){

        this.bussinessForm= this.formBuilder.group({
            'ruc':['',Validators.compose([Validators.required])],
            'name':['',Validators.compose([Validators.required])],
            'userMaster':['',Validators.compose([Validators.required])],
            'password':['',Validators.compose([Validators.required])],
            'phone':['',Validators.compose([Validators.required])],
            'movil':['',Validators.compose([Validators.required])],
            'address':['',Validators.compose([Validators.required])],
            'urlImg':[''],
            'description':['',Validators.compose([Validators.required])],
            'constitutionDate':['',Validators.compose([Validators.required])],
            'parking':[''],
            'numberEmp':['',Validators.compose([Validators.required])],
            'schedule':[''],
            'mail':['',Validators.compose([Validators.required])],
            'web':[''],

        })
  }
  saveBussiness(){
      
        this.http.post('http://localhost:3000/business?AUTH=true',this.bussinessForm.value).toPromise().then(result=>{
                let apiResult = result.json();
                console.log(apiResult);
                apiResult.msg == "OK"? this.router.navigate(['pages/bussiness/listado']):null
                
                //
                
        })
        
        
  }


}
