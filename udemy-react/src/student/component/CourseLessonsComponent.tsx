import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGetCourseLesson } from "../../course/query/CourseHookQuery.tsx";
import type {Lesson} from "../../course/data/Lesson.ts";



export default function CourseLessonsComponent() {
    const { id } = useParams<{ id: string }>();
    const courseId = parseInt(id || "0", 10);
    const { data: courseLessons, isLoading } = useGetCourseLesson(courseId);

    const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

    // Dynamic Playlist Array Check
    const lessonsList: Lesson[] = Array.isArray(courseLessons)
        ? courseLessons
        : (courseLessons as any)?.data && Array.isArray((courseLessons as any).data)
            ? (courseLessons as any).data
            : [];

    useEffect(() => {
        if (lessonsList.length > 0 && !activeLesson) {
            setActiveLesson(lessonsList[0]);
        }
    }, [lessonsList, activeLesson]);

    if (isLoading) {
        return (
            <div className="flex h-screen w-full items-center justify-center bg-slate-950">
                <div className="flex flex-col items-center space-y-4">
                    <div className="relative h-12 w-12">
                        <div className="absolute h-full w-full rounded-full border-4 border-indigo-500/20"></div>
                        <div className="absolute h-full w-full animate-spin rounded-full border-4 border-indigo-500 border-t-transparent"></div>
                    </div>
                    <p className="text-sm font-medium text-indigo-300 animate-pulse tracking-wide">
                        Loading your classroom...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen w-full bg-slate-900 text-slate-100 overflow-hidden font-sans antialiased">

            {/* LEFT SIDE: Video Player Stage */}
            <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 md:p-8 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
                <div className="max-w-5xl w-full mx-auto space-y-6">

                    {activeLesson ? (
                        <>
                            {/* Premium Video Frame Container */}
                            <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-2xl shadow-indigo-950/20 border border-indigo-500/10">

                                {/* 🔥 ပြင်ဆင်လိုက်သည့်အချက်: &autoplay=1 ကို ဖယ်ရှားပြီး မူရင်းလင့်ခ်ကို တိုက်ရိုက် သုံးထားသည်။
                                    ဒါဆိုရင် 404 Error လုံးဝ မတက်တော့ဘဲ ဤ Window ထဲမှာတင် အလုပ်လုပ်ပါလိမ့်မည်။
                                */}
                                <iframe
                                    key={activeLesson.lessonLinked} // နှိပ်လိုက်လျှင် ဗီဒီယိုအသစ် ပြောင်းလဲရန်
                                    src={activeLesson.lessonLinked.trim()}
                                    className="w-full h-full border-0"
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    title={activeLesson.lessonName}
                                ></iframe>

                            </div>

                            {/* Active Meta Specifications */}
                            <div className="bg-slate-950/40 border border-slate-800/60 p-6 rounded-2xl backdrop-blur-sm">
                                <div className="flex items-center space-x-2 mb-3">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mr-1.5 inline-block"></span>
                                        ONEDRIVE WIRESTREAM ACTIVE
                                    </span>
                                </div>
                                <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white leading-snug">
                                    {activeLesson.lessonName}
                                </h1>
                                <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                                    သင်ခန်းစာကို စတင်ကြည့်ရှုရန် ဗီဒီယိုအလယ်ရှိ <strong>Play ခလုတ်ကို နှိပ်ပေးပါ။</strong> ညာဘက်ရှိ Playlist စာရင်းများမှလည်း စိတ်ကြိုက်ရွေးချယ် ကလစ်နှိပ်နိုင်ပါသည်။
                                </p>
                            </div>
                        </>
                    ) : (
                        <div className="w-full aspect-video flex flex-col items-center justify-center text-slate-400 bg-slate-950/50 rounded-2xl border-2 border-dashed border-slate-800 p-8">
                            <h3 className="text-lg font-semibold text-slate-200">No Lessons Found</h3>
                        </div>
                    )}
                </div>
            </div>

            {/* RIGHT SIDE: Playlist Sidebar */}
            <div className="w-80 md:w-96 border-l border-slate-800/80 bg-slate-950 flex flex-col h-full shadow-2xl z-10">
                <div className="p-5 border-b border-slate-800/80 bg-slate-950/50 backdrop-blur-md">
                    <h2 className="text-base font-bold text-white tracking-wide uppercase">Course Content</h2>
                    <p className="text-xs text-indigo-400 font-medium mt-1">
                        {lessonsList.length} total modules available
                    </p>
                </div>

                <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
                    {lessonsList.map((lesson: Lesson, index: number) => {
                        const isActive = activeLesson?.lessonLinked === lesson.lessonLinked;

                        return (
                            <button
                                key={index}
                                onClick={() => setActiveLesson(lesson)} // နှိပ်လိုက်တာနဲ့ လက်ရှိ window ထဲမှာပဲ Active ပြောင်းမည်
                                className={`w-full text-left p-3.5 rounded-xl transition-all duration-300 flex items-start space-x-3.5 border group relative overflow-hidden ${
                                    isActive
                                        ? "bg-gradient-to-r from-indigo-600 to-indigo-700 border-indigo-500 text-white shadow-lg shadow-indigo-600/20 translate-x-1"
                                        : "bg-slate-900/60 border-slate-800/60 hover:border-slate-700/80 hover:bg-slate-900 text-slate-300 hover:text-white"
                                }`}
                            >
                                {isActive && (
                                    <span className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-md"></span>
                                )}

                                <div className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                                    isActive
                                        ? "bg-white/15 text-white"
                                        : "bg-slate-800 text-slate-400 group-hover:bg-indigo-500/10 group-hover:text-indigo-400"
                                }`}>
                                    {isActive ? (
                                        <svg className="w-3 h-3 fill-current animate-pulse" viewBox="0 0 24 24">
                                            <path d="M8 5v14l11-7z"/>
                                        </svg>
                                    ) : (
                                        String(index + 1).padStart(2, '0')
                                    )}
                                </div>

                                <div className="flex-1 min-w-0">
                                    <p className={`text-sm font-semibold tracking-wide leading-tight ${isActive ? "text-white" : "text-slate-200 group-hover:text-indigo-300"}`}>
                                        {lesson.lessonName}
                                    </p>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

        </div>
    );
}