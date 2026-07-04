import { useGetAllEnrolledCourses } from "../../course/query/CourseHookQuery.tsx";
import type {Course} from "../../course/data/Course.ts";
import {getLoggedInUsername} from "../../auth/service/AuthService.ts";
import {Link} from "react-router-dom";



export default function EnrolledCourseComponent() {
    const { data: enrolledCourses, isLoading } = useGetAllEnrolledCourses();
    const username = getLoggedInUsername()!;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6"><span className="capitalize">{username}</span>'s Enrolled Courses </h2>

            {/* Responsive Grid Layout */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {enrolledCourses?.map((course: Course) => (
                    <div
                        key={course.coureId}
                        className="flex flex-col bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                    >
                        {/* Image Container with Padding */}
                        <div className="p-4 bg-gray-50/50">
                            <div className="w-full h-48 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                                {course.imageBase64 ? (
                                    <img
                                        src={`data:image/jpeg;base64,${course.imageBase64}`}
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                ) : (
                                    <span className="text-gray-400 text-sm">No Preview Available</span>
                                )}
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="flex-1 p-5 flex flex-col justify-between">
                            <div>
                                {/* Category Badge */}
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 mb-3">
                                    {course.category}
                                </span>

                                <h3 className="text-lg font-bold text-gray-900 tracking-tight line-clamp-1 mb-1">
                                    {course.title}
                                </h3>

                                <p className="text-sm text-gray-500 mb-2 font-medium">
                                    Instructor: {course.teacherName}
                                </p>

                                <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                                    {course.description}
                                </p>
                            </div>

                            <div>
                                <div className="text-lg font-extrabold text-gray-900 mb-4">
                                    {course.fees === 0 ? "Free" : `$${course.fees.toLocaleString()}`}
                                </div>
                            </div>
                        </div>

                        {/* Card Footer with Beautiful Indigo Theme */}
                        <div className="px-5 pb-5 pt-0 bg-white">
                            <Link to={`/enrolled-courses/${course.coureId}/lessons`} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg shadow-sm shadow-indigo-100 transition-colors duration-200 flex items-center justify-center gap-2 group">
                                <span>Learn</span>
                                <svg
                                    className="w-4 h-4 transform transition-transform duration-200 group-hover:translate-x-1"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}