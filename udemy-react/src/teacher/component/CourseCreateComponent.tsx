import { useCreateCourse } from "../../course/query/CourseHookQuery.tsx";
import { type SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface CourseFormInputs {
    title: string;
    description: string;
    fees: number;
    categoryName: string;
    image: FileList;
}

export default function CourseCreateComponent() {
    const courseMutation = useCreateCourse();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<CourseFormInputs>();
    const navigator = useNavigate();

    const onSubmit: SubmitHandler<CourseFormInputs> = (data) => {
        const formData = new FormData();
        formData.append("title", data.title);
        formData.append("description", data.description);
        formData.append("fees", data.fees.toString());
        formData.append("category_name", data.categoryName);
        if (data.image && data.image[0]) {
            formData.append("image", data.image[0]);
        }

        console.log(Array.from(formData.entries()));


        courseMutation.mutate(formData, {
            onSuccess: () => {
                reset();
                navigator("/teacher");
            }
        });
    };

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            {/* Switched from max-w-2xl to max-w-4xl for a wider canvas */}
            <div className="max-w-4xl w-full space-y-8 bg-white p-8 md:p-10 rounded-2xl shadow-sm border border-slate-100">

                {/* Header - Aligned left for large form patterns */}
                <div className="border-b border-slate-100 pb-5">
                    <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                        Create New Course
                    </h2>
                    <p className="mt-2 text-sm text-slate-600">
                        Fill in the details below to launch your new learning program.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    {/* Balanced grid system spanning 6 responsive columns */}
                    <div className="grid grid-cols-1 gap-y-6 gap-x-6 sm:grid-cols-6">

                        {/* Title - Occupies full width */}
                        <div className="sm:col-span-6">
                            <label htmlFor="title" className="block text-sm font-medium text-slate-700">
                                Course Title
                            </label>
                            <div className="mt-1">
                                <input
                                    type="text"
                                    id="title"
                                    {...register("title", { required: "Title is required" })}
                                    className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                                    placeholder="e.g., Advanced React Patterns"
                                />
                                {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>}
                            </div>
                        </div>

                        {/* Category - Spans half-width on desktop (3/6 columns) */}
                        <div className="sm:col-span-3">
                            <label htmlFor="categoryName" className="block text-sm font-medium text-slate-700">
                                Category
                            </label>
                            <div className="mt-1">
                                <select
                                    id="categoryName"
                                    {...register("categoryName", { required: "Please select a category" })}
                                    className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border bg-white"
                                >
                                    <option value="">Select a category</option>
                                    <option value="Programming">Programming</option>
                                    <option value="Economics">Economics</option>
                                    <option value="Maths">Maths</option>
                                </select>
                                {errors.categoryName && <p className="mt-1 text-sm text-red-600">{errors.categoryName.message}</p>}
                            </div>
                        </div>

                        {/* Fees - Spans half-width on desktop (3/6 columns) */}
                        <div className="sm:col-span-3">
                            <label htmlFor="fees" className="block text-sm font-medium text-slate-700">
                                Fees (USD)
                            </label>
                            <div className="mt-1">
                                <input
                                    type="number"
                                    id="fees"
                                    {...register("fees", { required: "Fees are required", min: 0 })}
                                    className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                                    placeholder="0.00"
                                />
                                {errors.fees && <p className="mt-1 text-sm text-red-600">{errors.fees.message}</p>}
                            </div>
                        </div>

                        {/* Description - Occupies full width */}
                        <div className="sm:col-span-6">
                            <label htmlFor="description" className="block text-sm font-medium text-slate-700">
                                Description
                            </label>
                            <div className="mt-1">
                                <textarea
                                    id="description"
                                    rows={5}
                                    {...register("description", { required: "Description is required" })}
                                    className="block w-full rounded-lg border-slate-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2.5 border"
                                    placeholder="Provide a detailed summary of what students will learn..."
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                            </div>
                        </div>

                        {/* Cover Image Upload - Optimized spacing for wide cards */}
                        <div className="sm:col-span-6">
                            <label className="block text-sm font-medium text-slate-700">Course Cover Image</label>
                            <div className="mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-slate-300 border-dashed rounded-lg hover:border-indigo-400 transition-colors bg-slate-50/50">
                                <div className="space-y-2 text-center">
                                    <svg
                                        className="mx-auto h-12 w-12 text-slate-400"
                                        stroke="currentColor"
                                        fill="none"
                                        viewBox="0 0 48 48"
                                        aria-hidden="true"
                                    >
                                        <path
                                            d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h16a4 4 0 004-4V12a4 4 0 00-4-4z"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M14 26l7.7-7.7a2 2 0 012.83 0L32 26M21 16a2 2 0 11-4 0 2 2 0 014 0z"
                                            strokeWidth={2}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <div className="flex text-sm text-slate-600 justify-center">
                                        <label
                                            htmlFor="image"
                                            className="relative cursor-pointer rounded-md bg-transparent font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none"
                                        >
                                            <span>Upload a file</span>
                                            <input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                {...register("image")}
                                                className="sr-only"
                                            />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Error Message from Mutation */}
                    {courseMutation.isError && (
                        <div className="p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                            Something went wrong while creating the course. Please try again.
                        </div>
                    )}

                    {/* Form Action Buttons */}
                    <div className="flex justify-end gap-3 pt-6 border-t border-slate-100">
                        <button
                            type="button"
                            onClick={() => navigator("/teacher")}
                            className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={courseMutation.isPending}
                            className="inline-flex justify-center rounded-lg border border-transparent bg-indigo-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            {courseMutation.isPending ? "Creating..." : "Create Course"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}