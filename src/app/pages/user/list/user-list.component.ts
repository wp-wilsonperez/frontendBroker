import { Http } from '@angular/http';
import { ValidationService } from './../new/validation.service';
import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from './dynamic-tables.service';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'az-dynamic-tables',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ UserService,ValidationService ]
})
export class UserListComponent {
    public data: any;
    public usersData:any;
    public searchText:string;
    public toast:boolean;
    public message:string;
    public userInfo:any;
    public editForm: FormGroup;
    public userId;

    constructor(private userService:UserService,private formBuilder: FormBuilder,public http:Http){
       this.loadUsers();
       this.editForm= this.formBuilder.group({
            'name': ['', Validators.required],
            'lastName': ['', Validators.required],
            'cedula': ['', Validators.compose([Validators.required, Validators.minLength(10), ValidationService.numberValidator ])],
            'phone': ['', Validators.required],
            'birthDate': [''],
            'mail':['',Validators.compose([Validators.required])]
        },{validator: ValidationService.validacionCedula('cedula')});
    }
    borrar(id){
       this.userService.delete(id).then(result=>{

            this.loadUsers();
            this.toast = true;
            this.message ="Usuario borrado";

           
       });
       
    } 
    loadUsers(){
        this.userService.userList().then(result=>{
                    this.usersData = result.users;
                    console.log('Users from Api: ',this.usersData);
                    
                    
        })

    }
    userDetail(user){

        this.userId = user._id;
        console.log(this.userId);
        this.editForm.setValue({name: user.name,lastName: user.lastName,cedula:user.cedula ,phone: user.phone,birthDate: user.dateBirthday,mail:user.mail});
    
        
        
    }
    editUser(){
            
            
            this.editForm.value.Enabled = 1;
            console.log(this.editForm.value)
            console.log(this.userId);
            this.http.post('http://localhost:3000/user/edit/'+this.userId+"?AUTH=true",this.editForm.value).toPromise().then(result=>{
                console.log(result.json());
                this.loadUsers();  
            })
            
    }
}

