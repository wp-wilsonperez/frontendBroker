import { Observable } from 'rxjs/Observable';
import { ImageUploaderComponent } from './../image-uploader/image-uploader.component';
import { Router } from '@angular/router';
import { Http, Response } from '@angular/http';
import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { ValidationService } from './validation.service';

import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'az-wizard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ ValidationService  ] 
})
export class UserComponent {
    public steps:any[];
    public accountForm:FormGroup;
    public personalForm:FormGroup;
    public paymentForm:FormGroup;
    public details:any = {};
    public showConfirm:boolean;
    public imagen:any;
    public imgResult:any;
     @ViewChild(ImageUploaderComponent)
     public  imageComponent: ImageUploaderComponent;

    constructor(private formBuilder: FormBuilder,public http:Http,public router:Router) {   

        this.steps = [
          {name: 'Informacion de Cuenta', icon: 'fa-lock', active: true, valid: false, hasError:false },
          {name: 'Informacion Personal', icon: 'fa-user', active: false, valid: false, hasError:false },

          {name: 'Roles', icon: 'fa fa-tasks', active: false, valid: false, hasError:false },
          {name: 'Confirmar la Creacion', icon: 'fa-check-square-o', active: false, valid: false, hasError:false }
        ]

        this.accountForm = this.formBuilder.group({
            'username': ['', Validators.required],
            'password': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
            'confirmPassword': ['', Validators.required],
            'email': ['', Validators.compose([Validators.required, ValidationService.emailValidator])]            
        }, {validator: ValidationService.matchingPasswords('password', 'confirmPassword')});

        this.personalForm = this.formBuilder.group({
            'name': ['', Validators.required],
            'lastName': ['', Validators.required],
            'cedula': ['', Validators.compose([Validators.required, Validators.minLength(10), ValidationService.numberValidator ])],
            'telefono': ['', Validators.required],
            'birthDate': [''],
            'imagen': [''],
            'direccion' : ['']
        },{validator: ValidationService.validacionCedula('cedula')});

        this.paymentForm = this.formBuilder.group({
         
        });        
    }

    public next(){
        let accountForm = this.accountForm;
        let personalForm = this.personalForm;
        let paymentForm = this.paymentForm;
        
        if(this.steps[this.steps.length-1].active)
            return false;
            
        this.steps.some(function (step, index, steps) {
            if(index < steps.length-1){
                if(step.active){
                    if(step.name=='Informacion de Cuenta'){
                        if (accountForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }
                    if(step.name=='Informacion Personal'){
                        if (personalForm.valid) {
                        
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            return true;
                        }
                        else{
                            
                            step.hasError = true;
                        }                      
                    }
                    if(step.name=='Roles'){
                        if (paymentForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }
                }
            }   
        });

        this.details.username = this.accountForm.value.username;
        this.details.fullname = this.personalForm.value.name + " " + this.personalForm.value.lastName;
        this.details.email = this.accountForm.value.email;
        this.details.telefono = this.personalForm.value.telefono;
        this.details.cedula = this.personalForm.value.cedula;
        this.details.birthDate = this.personalForm.value.birthDate;
        this.details.cedula = this.personalForm.value.cedula;
        this.details.direccion = this.personalForm.value.direccion;
    
    }
    onChange(event) {
            var files = event.srcElement.files;
            console.log(files[0]);
            this.imagen = files[0];
            
  }

    saveUser(){
        
        let request = {
            name : this.personalForm.value.name,
            lastName : this.personalForm.value.lastName,
            cedula : this.details.cedula ,
            password: this.accountForm.value.password,
            mail: this.details.email,
            phone :   this.details.telefono ,
            dateBirthday : this.details.birthDate,
            userImg:''

        }
        if(this.imageComponent.file != undefined){

                    console.log(this.imageComponent.file);

                  
                  this.makeFileRequest('http://localhost:3000/userImg?AUTH=true',this.imageComponent.file).map(res => {
                      return (res);
                  }).subscribe(result=>{
                      this.imgResult = result;
                      console.log(this.imgResult.userImg);
                      request.userImg = this.imgResult.userImg;
                      console.log(request);
                      this.http.post('http://localhost:3000/user?AUTH=true',request).toPromise().then(result=>{
                             let apiResult = result.json();
                             apiResult.msg == "OK"? this.router.navigate(['pages/usuarios/listado']):null;

                      })
                      
                      
                  })
                    

        }else{

             console.log(request);
                      this.http.post('http://localhost:3000/user?AUTH=true',request).toPromise().then(result=>{
                             let apiResult = result.json();
                             apiResult.msg == "OK"? this.router.navigate(['pages/usuarios/listado']):null;

                      })




        }
      

  
        
    }
    makeFileRequest(url: string, file: any) {
    return Observable.fromPromise(new Promise((resolve, reject) => {
        let formData: any = new FormData()
        let xhr = new XMLHttpRequest()
   
            formData.append("userImg", file, file.name)
        
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response))
                } else {
                    reject(xhr.response)
                }
            }
        }
        xhr.open("POST", url, true)
        xhr.send(formData)
    }));
}

    public prev(){
        if(this.steps[0].active)
            return false;
        this.steps.some(function (step, index, steps) {
            if(index != 0){
                if(step.active){
                    step.active = false;
                    steps[index-1].active=true;
                    return true;
                }
            }             
        });
    }
    

    public confirm(){
        this.steps.forEach(step => step.valid = true);
    }

   
}

