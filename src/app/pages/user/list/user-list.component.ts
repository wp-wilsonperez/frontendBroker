import { Component, ViewEncapsulation } from '@angular/core';
import { UserService } from './dynamic-tables.service';

@Component({
  selector: 'az-dynamic-tables',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  providers: [ UserService ]
})
export class UserListComponent {
    public data: any;
    public usersData:any;
    public searchText:string;
    constructor(private userService:UserService){
        this.data = userService.getAll();
        userService.userList().then(result=>{
                    this.usersData = result.users;
                    console.log('Users from Api: ',this.usersData);
                    
                    
        })
    } 
}

