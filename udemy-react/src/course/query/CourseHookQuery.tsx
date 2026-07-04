import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import type {Course} from "../data/Course.ts";
import {
    addLessonsRequest,
    createCourseRequest,
    getAllCoursesRequest,
    getCoursesRequest,
    getEnrolledCoursesRequest, getLessonsRequest
} from "../service/CourseService.ts";
import type {Lesson} from "../data/Lesson.ts";

export function useGetAllCourses(){
    return useQuery<Course[]>({
        queryKey: ["courses"],
        queryFn:  getAllCoursesRequest,
        staleTime: 1000 * 5
    })

}
export function useGetAllEnrolledCourses(){
    return useQuery<Course[]>({
        queryKey: ["enrolled-courses"],
        queryFn:  getEnrolledCoursesRequest,
        staleTime: 1000 * 5
    })
}


export function useGetCourses(){
    return useQuery<Course[]>({
        queryKey: ["courses"],
        queryFn:  getCoursesRequest,
        staleTime: 1000 * 5
    })

}
export function useCreateCourse(){
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createCourseRequest,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["courses"]
            })
        }
    })
}
export function useGetCourseLesson(id: number) {
    return useQuery<Lesson[]>({
        queryKey: ["course-lessons", id],
        queryFn: () => getLessonsRequest(id),
        staleTime: 1000 * 5
    });
}

export function useCreateLesson(courseId: number) {
    const queryClient = useQueryClient();

    return useMutation({
        // 1. Pass the lesson payload here so it can be provided dynamically during .mutate()
        mutationFn: (newLesson: Lesson) => addLessonsRequest(courseId, newLesson),
        onSuccess: () => {
            // 2. Fix the cache key to match the query we want to refresh
            queryClient.invalidateQueries({
                queryKey: ["course-lessons", courseId]
            });
        }
    });
}

















