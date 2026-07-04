import { useGetCourses } from "../query/CourseHookQuery.tsx";
import type { Course } from "../data/Course.ts";
import {Link} from "react-router-dom";

export default function CourseTableComponent() {
    const { data: courses, isError, isLoading } = useGetCourses();

    // 1. Loading State (With Spinner)
    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] space-y-4">
                <div className="relative w-12 h-12">
                    <div className="w-12 h-12 rounded-full border-4 border-indigo-100 absolute inset-0"></div>
                    <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin absolute inset-0"></div>
                </div>
                <p className="text-sm font-medium text-slate-500 animate-pulse">Loading available courses...</p>
            </div>
        );
    }

    // 2. Error State
    if (isError) {
        return (
            <div className="p-4 mx-auto max-w-2xl mt-8 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700">
                <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-sm font-medium">Failed to load courses. Please check your connection or login status.</span>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Header Section */}
            <div className="sm:flex sm:items-center sm:justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Management Dashboard</h1>
                    <p className="mt-1 text-sm text-slate-500">A comprehensive list of all active courses, categories, prices, and teachers.</p>
                </div>
            </div>

            {/* Table Card Wrapper */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-slate-50/70 border-b border-slate-200">
                            <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Course info</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Category</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Instructor</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider">Fees</th>
                            <th className="px-6 py-4 text-xs font-semibold text-slate-600 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                        {courses && courses.length > 0 ? (
                            courses.map((course: Course) => (
                                <tr key={course.coureId} className="hover:bg-slate-50/50 transition-colors group">
                                    {/* Image & Title */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-16 rounded-lg bg-slate-100 overflow-hidden border border-slate-200 flex-shrink-0">
                                                {course.imageBase64 ? (
                                                    <img
                                                        src={`data:image/jpeg;base64,${course.imageBase64}`}
                                                        alt={course.title}
                                                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-200"
                                                    />
                                                ) : (
                                                    <div className="h-full w-full flex items-center justify-center bg-indigo-50 text-indigo-400">
                                                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                        </svg>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="max-w-[240px]">
                                                <div className="font-semibold text-slate-900 truncate">{course.title}</div>
                                                <div className="text-xs text-slate-500 line-clamp-1 mt-0.5">{course.description}</div>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Category Badge */}
                                    <td className="px-6 py-4 whitespace-nowrap">
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                {course.category}
                                            </span>
                                    </td>

                                    {/* Instructor Name */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600 font-medium">
                                        {course.teacherName}
                                    </td>

                                    {/* Fees */}
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-slate-900">
                                        ${course.fees.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>

                                    {/* View/Edit Action */}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        <Link to={`/teacher/create-lesson/${course.coureId}`} className="text-indigo-600 hover:text-indigo-900 font-semibold px-3 py-1.5 rounded-md hover:bg-indigo-50 transition-colors">
                                            Add Lessons
                                        </Link>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            /* Empty State */
                            <tr>
                                <td colSpan={5} className="text-center py-12 text-slate-400 text-sm">
                                    No courses available at this time.
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}