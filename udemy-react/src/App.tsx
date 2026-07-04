import {BrowserRouter, Route, Routes} from "react-router-dom";
import HeaderComponent from "./component/HeaderComponent";
import HomeComponent from "./student/component/HomeComponent";
import {isLoggedIn} from "./auth/service/AuthService";
import type {ReactNode} from "react";
import Login from "./auth/component/Login";
import TeacherDashboard from "./teacher/TeacherDashboard.tsx";
import CourseCreateComponent from "./teacher/component/CourseCreateComponent.tsx";
import TeacherDashboardHome from "./teacher/component/TeacherDashboardHome.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import RegisterComponent from "./auth/component/RegisterComponent.tsx";
import CartContextProvider from "./cart/CartContextProvider.tsx";
import CartViewComponent from "./cart/component/CartViewComponent.tsx";
import EnrolledCourseComponent from "./student/component/EnrolledCourseComponent.tsx";
import LessonCreateComponent from "./teacher/component/LessonCreateComponent.tsx";
import CourseLessonsComponent from "./student/component/CourseLessonsComponent.tsx";

function AuthGuard({children}: { children: ReactNode }) {
    const beLogin = isLoggedIn();
    console.log("beLogin", beLogin);
    if (beLogin)
        return children;
    return <Login/>
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false
        }
    }
});

export default function App() {

    // const beTeacher = getRoleName() === 'ROLE_TEACHER';
    return (
        <>
            <BrowserRouter>
                <QueryClientProvider client={queryClient}>
                    <CartContextProvider>
                    <HeaderComponent/>
                    <Routes>
                        <Route path="/" element={
                            <AuthGuard>
                                <HomeComponent/>
                            </AuthGuard>
                        }/>
                        <Route path="/cart" element={
                            <AuthGuard>
                                <CartViewComponent />
                            </AuthGuard>
                        }/>
                        <Route path="/enrolled-courses" element={
                            <AuthGuard>
                                <EnrolledCourseComponent />
                            </AuthGuard>
                        }/>
                        <Route path="/enrolled-courses/:id/lessons"
                               element={
                            <AuthGuard>
                                <CourseLessonsComponent />
                            </AuthGuard>
                        } />
                        <Route path="/register" element={<RegisterComponent />}/>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="/teacher" element={
                            <AuthGuard>
                                <TeacherDashboard/>
                            </AuthGuard>
                        }>
                            <Route path="" element={<TeacherDashboardHome/>}/>
                            <Route path="create-course" element={<CourseCreateComponent/>}/>
                            <Route path="create-lesson/:id" element={<LessonCreateComponent />}/>
                        </Route>
                    </Routes>
                    </CartContextProvider>
                </QueryClientProvider>
            </BrowserRouter>
        </>
    );
}
