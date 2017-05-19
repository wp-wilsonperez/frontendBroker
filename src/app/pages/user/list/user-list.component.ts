import { UserSessionService } from './../../../providers/session.service';
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
  providers: [ UserService,ValidationService,UserSessionService ]
})
export class UserListComponent {
    public data: any;
    public usersData:any;
    public toast:boolean;
    public message:string;
    public userInfo:any;
    public editForm: FormGroup;
    public userId;
    public searchTxt:any;
    public resultData:any;
    public listUserComplete:any;
    public today:any;
    public local:any;

    constructor(private userService:UserService,private formBuilder: FormBuilder,public http:Http,public userSession:UserSessionService){
        this.local = this.userSession.getUser(); 
       this.loadUsers();
       
       this.editForm= this.formBuilder.group({
            'name': ['', Validators.required],
            'lastName': ['', Validators.required],
            'cedula': ['', Validators.compose([Validators.required, Validators.minLength(10), ValidationService.numberValidator ])],
            'phone': ['', Validators.required],
            'dateBirthday': [''],
            'userImg': [''],
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
                    this.listUserComplete = result.users;
                    console.log('Users from Api: ',this.usersData);
                    
                    
        })

    }
    userDetail(user){
            var today:any = new Date();
            var dd:any = today.getDate();
            var mm:any = today.getMonth()+1; //January is 0!
            var yyyy = today.getFullYear();
            if(dd<10){
                    dd='0'+dd
                } 
                if(mm<10){
                    mm='0'+mm
                } 

            today = yyyy+'-'+mm+'-'+dd;
            this.today  = today;
            console.log(today);
            

        this.userId = user._id;
        console.log(this.userId);
        this.editForm.setValue({name: user.name,lastName: user.lastName,cedula:user.cedula ,phone: user.phone,dateBirthday: user.dateBirthday,mail:user.mail,userImg:user.userImg});
        
        
        
    }
    editUser(){
            
            
            this.editForm.value.Enabled = 1;
            console.log(this.editForm.value)
            console.log(this.userId);
            this.http.post('http://localhost:3000/user/edit/'+this.userId+"?access_token="+this.local.token,this.editForm.value).toPromise().then(result=>{
                console.log(result.json());
                this.loadUsers(); 
                let sessionSave ={
                    id: this.userId,
                    name: this.editForm.value.name,
                    lastName: this.editForm.value.lastName,
                    cedula:this.editForm.value.cedula,
                    userImg: this.editForm.value.userImg,

                }
                this.userSession.setUser(sessionSave)
                 
            })
            
    }
    getItems(event:any){
            let search = this.searchTxt;
            let compleList = this.listUserComplete;
            console.log(search);
            
            let q = search.toLowerCase();
            this.resultData = compleList.filter(result=>{
                if(result.name.toLowerCase().indexOf(q) > -1){
                        return true
                  }
            })

            this.usersData = this.resultData;

            this.searchTxt == ''?this.usersData = this.listUserComplete:null;

            
    }
}

