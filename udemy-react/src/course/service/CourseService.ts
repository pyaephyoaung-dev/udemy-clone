import axios from "axios";
import {getToken} from "../../auth/service/AuthService.ts";
import type {Course} from "../data/Course.ts";
import type {EnrolledDto} from "../../cart/dto/EnrolledDto.ts";
import type {Lesson} from "../data/Lesson.ts";


axios.interceptors.request.use(
    function (config) {
        const token = getToken();
        if (token) {
            config.headers["Authorization"] = token;
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);
const COURSE_URL = 'http://localhost:8080/api/courses';

export const enrollCourseRequest =
    async (courseIds: EnrolledDto): Promise<string> => {
    const response =
        await axios.post(`${COURSE_URL}/enroll`,courseIds);
    return response.data;
};

export const getLessonsRequest =
    async (id:number):Promise<Lesson[]> =>{
    const response =
        await axios.get(`${COURSE_URL}/${id}/course-lessons`);
    return response.data;
}

export const addLessonsRequest =
    async (id:number,lesson:Lesson)=>{
    const response =
        await axios.post(`${COURSE_URL}/${id}/lessons`,lesson);
    return response.data;
}

export const getEnrolledCoursesRequest =
    async ():Promise<Course[]> =>{
    const response =
        await axios.get(`${COURSE_URL}/enrolled-courses`);
    return response.data;
}

export const getCoursesRequest = async ():Promise<Course[]> =>{
    const response = await axios.get(`${COURSE_URL}/teacher`);
    return response.data;
}

export const getAllCoursesRequest = async ():Promise<Course[]> =>{
    const response = await axios.get(`${COURSE_URL}`);
    return response.data;
}
export const createCourseRequest =
    async (formData:FormData):Promise<string> =>{
    const response = await axios.post(COURSE_URL,formData,{
        headers:{
            "Content-Type": "multipart/form-data"
        }
    });
    return response.data;
}






