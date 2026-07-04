import { useParams } from "react-router-dom";
import { useCreateLesson, useGetCourseLesson } from "../../course/query/CourseHookQuery.tsx";
import { type SubmitHandler, useForm } from "react-hook-form";
import type { Lesson } from "../../course/data/Lesson.ts";

export default function LessonCreateComponent() {
    const { id } = useParams<{ id: string }>();
    const courseId = parseInt(id || "0", 10);

    // Queries & Mutations
    const { data: courseLessons, isLoading } = useGetCourseLesson(courseId);
    const lessonMutation = useCreateLesson(courseId);

    // React Hook Form
    const { register, handleSubmit, reset } = useForm<Lesson>();

    const onSubmit: SubmitHandler<Lesson> = (data) => {
        lessonMutation.mutate(data, {
            onSuccess: () => {
                reset(); // Clear form fields after successful creation
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6 sm:p-10 text-slate-800">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-8">
                <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
                    Course Management
                </h1>
                <p className="text-sm text-slate-500 mt-1">
                    Managing lessons for Course ID: <span className="font-semibold text-indigo-600">#{id}</span>
                </p>
            </div>

            {/* Layout Grid */}
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* 1. Create Lesson Form Container */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 h-fit">
                    <h2 className="text-xl font-semibold text-slate-900 mb-5">
                        Create New Lesson
                    </h2>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Lesson Name Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Lesson Name
                            </label>
                            <input
                                type="text"

                                {...register("lessonName", { required: true })}
                                placeholder="e.g., Introduction to React Hooks"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                            />
                        </div>

                        {/* Lesson Linked/URL Field */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1.5">
                                Lesson Link / URL
                            </label>
                            <input
                                type="text"

                                {...register("lessonLinked", { required: true })}
                                placeholder="e.g., https://video-resource-url.com"
                                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={lessonMutation.isPending}
                            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-4 rounded-xl transition duration-150 shadow-sm shadow-indigo-200 focus:outline-none focus:ring-4 focus:ring-indigo-100 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {lessonMutation.isPending ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                    Creating...
                                </>
                            ) : (
                                "Add Lesson"
                            )}
                        </button>
                    </form>
                </div>

                {/* 2. Lessons Table Container */}
                <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden flex flex-col">
                    <div className="p-6 border-b border-slate-100">
                        <h2 className="text-xl font-semibold text-slate-900">
                            Current Lessons
                        </h2>
                    </div>

                    {isLoading ? (
                        /* Skeleton Loading State */
                        <div className="p-8 space-y-4 animate-pulse">
                            <div className="h-10 bg-slate-100 rounded-lg w-full"></div>
                            <div className="h-16 bg-slate-50 rounded-lg w-full"></div>
                            <div className="h-16 bg-slate-50 rounded-lg w-full"></div>
                        </div>
                    ) : !courseLessons || courseLessons.length === 0 ? (
                        /* Empty State */
                        <div className="p-12 text-center">
                            <div className="inline-flex p-4 rounded-full bg-indigo-50 text-indigo-600 mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-slate-900 mb-1">No lessons yet</h3>
                            <p className="text-slate-500 text-sm max-w-sm mx-auto">Use the form on the left to add the first lesson to this course module.</p>
                        </div>
                    ) : (
                        /* Actual Data Table */
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-slate-50 border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                    <th className="px-6 py-4">Item No.</th>
                                    <th className="px-6 py-4">Lesson Name</th>
                                    <th className="px-6 py-4">Resource Link</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 text-sm">
                                {courseLessons.map((lesson, index) => (
                                    <tr key={index} className="hover:bg-indigo-50/30 transition-colors">
                                        <td className="px-6 py-4 font-mono text-xs text-slate-400">
                                            #{(index + 1)}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {lesson.lessonName}
                                        </td>
                                        <td className="px-6 py-4 text-indigo-600 max-w-xs truncate">
                                            {lesson.lessonLinked ? (
                                                <a href={lesson.lessonLinked} target="_blank" rel="noreferrer" className="hover:underline">
                                                    {lesson.lessonLinked}
                                                </a>
                                            ) : (
                                                <span className="italic text-slate-300">No link provided</span>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}

