import { type SubmitHandler, useForm } from "react-hook-form";
import type { RegisterDto } from "../dto/RegisterDto.ts";
import { useState } from "react";
import {registerApiCall} from "../service/AuthService.ts";
import {useNavigate} from "react-router-dom";

export default function RegisterComponent() {
    const { register, handleSubmit } = useForm<RegisterDto>();
    const [isTeacher, setIsTeacher] = useState<boolean>(false);
    const [skill, setSkill] = useState<string>('');
    const navigator = useNavigate();

    const onSubmit: SubmitHandler<RegisterDto> = (data) => {
        data.skills = skill !== "" ? skill.split(',').map(s => s.trim()) : [];
        data.userType = isTeacher ? "teacher" : "student";
        registerApiCall(data)
            .then(res =>{
               console.log(res.data);
               navigator("/login");
            })
            .catch(err => console.log(err));
    };

    // Shared classes to keep the code DRY and clean
    const labelClasses = "block text-sm font-medium text-slate-700 mb-1";
    const inputClasses = "w-full px-4 py-2 bg-white border border-slate-300 rounded-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200";

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
                <h2 className="text-center text-3xl font-extrabold text-slate-900 tracking-tight">
                    Create Your Account
                </h2>
                <p className="mt-2 text-center text-sm text-slate-600">
                    Join our community today
                </p>
            </div>

            {/* Expanded container width to max-w-4xl */}
            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-4xl">
                <div className="bg-white py-8 px-6 shadow-xl shadow-slate-200/50 rounded-2xl sm:px-12 border border-slate-100">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

                        {/* Core Fields Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Username */}
                            <div>
                                <label className={labelClasses}>Username</label>
                                <input
                                    type="text"
                                    placeholder="johndoe"
                                    {...register("username")}
                                    className={inputClasses}
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className={labelClasses}>Email Address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    {...register("email")}
                                    className={inputClasses}
                                />
                            </div>

                            {/* Password */}
                            <div className="md:col-span-2">
                                <label className={labelClasses}>Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    {...register("password")}
                                    className={inputClasses}
                                />
                            </div>
                        </div>

                        {/* Role Toggle Button (Spans full width) */}
                        <div className="pt-2">
                            <label className="relative flex items-center cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={isTeacher}
                                    onChange={() => setIsTeacher(!isTeacher)}
                                    className="sr-only peer"
                                    name="userType"
                                />
                                <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                                <span className="ml-3 text-sm font-medium text-slate-700">
                                    I am registering as a <span className="font-semibold text-indigo-600">{isTeacher ? "Teacher" : "Student"}</span>
                                </span>
                            </label>
                        </div>

                        <hr className="border-slate-100 my-4" />

                        {/* Dynamic Teacher Fields Grid */}
                        {isTeacher && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                                <div>
                                    <label className={labelClasses}>Skills <span className="text-xs text-slate-400 font-normal">(Comma separated)</span></label>
                                    <input
                                        type="text"
                                        placeholder="React, TypeScript, Node.js"
                                        value={skill}
                                        onChange={(e) => setSkill(e.target.value)}
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Education / Degree</label>
                                    <input
                                        type="text"
                                        placeholder="B.Sc. in Computer Science"
                                        {...register("education")}
                                        className={inputClasses}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Dynamic Student Fields Grid */}
                        {!isTeacher && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fadeIn">
                                <div>
                                    <label className={labelClasses}>Address</label>
                                    <input
                                        type="text"
                                        placeholder="123 Main St, City"
                                        {...register("address")}
                                        className={inputClasses}
                                    />
                                </div>
                                <div>
                                    <label className={labelClasses}>Student Education</label>
                                    <div className="relative">
                                        <select
                                            {...register("studentEducation")}
                                            className={`${inputClasses} appearance-none cursor-pointer`}
                                        >
                                            <option value="UNDER_GRADUATE">Undergraduate</option>
                                            <option value="POST_GRADUATE">Postgraduate</option>
                                        </select>
                                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-500">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4 max-w-xs mx-auto">
                            <button
                                type="submit"
                                className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                            >
                                Register Account
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}