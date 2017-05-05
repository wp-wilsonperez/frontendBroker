export class SessionService{

        getUser(){
            
            return localStorage.getItem('user');
        }

        setUser(user){

                localStorage.setItem('user',user);
        }
}