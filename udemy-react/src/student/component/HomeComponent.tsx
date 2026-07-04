import { useGetAllCourses } from "../../course/query/CourseHookQuery.tsx";
import type { Course } from "../../course/data/Course.ts";
import useCart from "../../cart/useCart.tsx";

interface CourseCartType {
    course: Course;
    addItem: (course: Course) => void;
}

export default function HomeComponent() {

    const { data: courses, isPending, error } = useGetAllCourses();
    const { addItem } = useCart();


    if (isPending && !courses) {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500 border-t-transparent"></div>
                <p className="text-sm font-medium text-gray-500 animate-pulse">Loading amazing courses...</p>
            </div>
        );
    }


    if (error) {
        return (
            <div className="mx-auto max-w-md p-6 my-8 text-center bg-red-50 rounded-xl border border-red-200">
                <p className="text-red-600 font-semibold">Failed to load courses</p>
                <p className="text-sm text-red-500 mt-1">Please try refreshing the page.</p>
            </div>
        );
    }

    // 3. Main Render Grid
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-8">Explore Courses</h1>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {courses?.map((course: Course, index: number) => (

                    <CourseCard
                        key={`${course.coureId}-${index}`}
                        course={course}
                        addItem={addItem}
                    />
                ))}
            </div>
        </div>
    );
}


function CourseCard({ course, addItem }: CourseCartType) {


    const imageSrc = course.imageBase64?.startsWith('data:')
        ? course.imageBase64
        : `data:image/jpeg;base64,${course.imageBase64}`;

    return (
        <div className="flex flex-col overflow-hidden rounded-2xl bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100">


            <div className="p-4 bg-gray-50">
                <div className="aspect-video w-full overflow-hidden rounded-xl bg-gray-200">
                    <img
                        src={imageSrc}
                        alt={course.title}
                        className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
                        onError={(e) => {

                            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600";
                        }}
                    />
                </div>
            </div>


            <div className="flex flex-1 flex-col p-5">

                <span className="self-start rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-600 uppercase tracking-wider">
                    {course.category}
                </span>


                <h3 className="mt-3 text-lg font-bold text-gray-900 line-clamp-1">
                    {course.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500 line-clamp-2 flex-1">
                    {course.description}
                </p>


                <hr className="my-4 border-gray-100" />


                <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-xs text-gray-400">Instructor</span>
                        <span className="text-sm font-medium text-gray-700">{course.teacherName}</span>
                    </div>
                    <div>

                        <button
                            onClick={() => {
                                addItem(course);
                            }}
                            className="btn btn-primary"
                        >
                            Enroll
                        </button>
                    </div>
                    <div className="text-right">
                        <span className="text-xl font-black text-gray-900">${course.fees}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}