
export interface RegisterDto{
    userType:string;
    username:string;
    password:string;
    email:string;
    address?:string;
    studentEducation?:string;
    skills?:string[];
    education?:string;

}