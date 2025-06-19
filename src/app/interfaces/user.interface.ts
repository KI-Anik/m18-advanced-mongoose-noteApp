export interface Iuser {
    firstName : string,
    lastName : string,
    age : number,
    email : string,
    password : string,
    role : 'ADMIN' | 'USER'
}