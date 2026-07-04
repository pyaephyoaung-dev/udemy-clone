import useCart from "../useCart.tsx";
import {Link} from "react-router-dom";
import type {EnrolledDto} from "../dto/EnrolledDto.ts";
import {enrollCourseRequest} from "../../course/service/CourseService.ts";


export default function CartViewComponent() {
    const { items, removeItem, clearCart, totalCost } = useCart();

    const checkoutHandler = async () =>{
        const ids = items.map(item => item.coureId);
        const enrolledDto: EnrolledDto = {
           courseIds:ids
        };
        console.log(enrolledDto);
        try{
            const successString=await enrollCourseRequest(enrolledDto);
            console.log(successString);
            clearCart();
            console.log("Success Enrolled");
        }catch (e){
            console.log('Api  Error',e);
        }

    }

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold text-slate-900 mb-8 tracking-tight">
                    Shopping Cart
                </h1>

                {!items || items.length === 0 ? (
                    <Link to="/" className="text-center py-16 bg-white rounded-2xl shadow-sm border border-slate-100">
                        <svg className="w-16 h-16 text-slate-300 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                        </svg>
                        <p className="text-lg font-medium text-slate-600">Your cart is feeling a bit light!</p>
                        <p className="text-sm text-slate-400 mt-1">Explore our courses to get started.</p>
                    </Link>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">

                        {/* Left Column: Cart Items List */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="overflow-hidden bg-white rounded-2xl shadow-sm border border-slate-100 hidden md:block">
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                    <tr className="border-b border-slate-100 bg-slate-50/70 text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        <th className="py-4 px-6">Course Details</th>
                                        <th className="py-4 px-6">Category</th>
                                        <th className="py-4 px-6 text-right">Fees</th>
                                        <th className="py-4 px-6 text-center">Action</th>
                                    </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
                                    {items.map((item) => (
                                        <tr key={item.coureId} className="hover:bg-slate-50/50 transition-colors duration-150">
                                            <td className="py-5 px-6 flex items-center gap-4">
                                                <div className="h-16 w-24 rounded-lg overflow-hidden bg-indigo-50 border border-slate-100 flex-shrink-0">
                                                    {item.imageBase64 ? (
                                                        <img
                                                            src={`data:image/jpeg;base64,${item.imageBase64}`}
                                                            alt={item.title}
                                                            className="h-full w-full object-cover transition-transform duration-200 hover:scale-105"
                                                        />
                                                    ) : (
                                                        <div className="h-full w-full flex items-center justify-center text-indigo-400">
                                                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-semibold text-slate-800 line-clamp-1">{item.title}</h3>
                                                    <p className="text-xs text-slate-400 mt-0.5">By {item.teacherName}</p>
                                                </div>
                                            </td>
                                            <td className="py-5 px-6">
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700">
                                                        {item.category}
                                                    </span>
                                            </td>
                                            <td className="py-5 px-6 text-right font-semibold text-slate-800">
                                                ${item.fees.toLocaleString()}
                                            </td>
                                            <td className="py-5 px-6 text-center">
                                                <button
                                                    onClick={() => removeItem(item.coureId)}
                                                    className="p-2 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50 transition-colors duration-200"
                                                    title="Remove item"
                                                >
                                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                    </svg>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile View: Cards instead of Table */}
                            <div className="md:hidden space-y-4">
                                {items.map((item) => (
                                    <div key={item.coureId} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex gap-4 relative">
                                        <div className="h-20 w-28 rounded-lg overflow-hidden bg-indigo-50 border border-slate-100 flex-shrink-0">
                                            {item.imageBase64 ? (
                                                <img src={`data:image/jpeg;base64,${item.imageBase64}`} alt={item.title} className="h-full w-full object-cover" />
                                            ) : (
                                                <div className="h-full w-full flex items-center justify-center text-indigo-400">
                                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0 pr-8">
                                            <span className="inline-flex items-center px-2 py-0.2 rounded-full text-[10px] font-medium bg-indigo-50 text-indigo-700 mb-1">
                                                {item.category}
                                            </span>
                                            <h3 className="font-semibold text-slate-800 text-sm truncate">{item.title}</h3>
                                            <p className="text-xs text-slate-400">By {item.teacherName}</p>
                                            <p className="text-sm font-bold text-slate-800 mt-2">${item.fees.toLocaleString()}</p>
                                        </div>
                                        <button
                                            onClick={() => removeItem(item.coureId)}
                                            className="absolute top-3 right-3 p-1.5 text-slate-400 hover:text-rose-600 rounded-full hover:bg-rose-50"
                                        >
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Column: Order Summary (Total Cost, Checkout, Clear Cart) */}
                        <div className="lg:sticky lg:top-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                            <h2 className="text-lg font-bold text-slate-900 mb-4">Order Summary</h2>

                            <div className="space-y-3 pb-4 border-b border-slate-100 text-sm text-slate-500">
                                <div className="flex justify-between">
                                    <span>Courses Selected</span>
                                    <span className="font-medium text-slate-800">{items.length}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax & Fees</span>
                                    <span className="font-medium text-slate-800">$0.00</span>
                                </div>
                            </div>

                            <div className="flex justify-between items-baseline py-4 mb-4">
                                <span className="text-base font-semibold text-slate-900">Total Cost</span>
                                <span className="text-2xl font-black text-indigo-600">${totalCost.toLocaleString()}</span>
                            </div>

                            <div className="space-y-3">
                                <button
                                    onClick={checkoutHandler}
                                    className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white font-semibold rounded-xl shadow-sm hover:shadow transition-all duration-150 flex items-center justify-center gap-2"
                                >
                                    <span>Proceed to Checkout</span>
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </button>

                                <button
                                    onClick={clearCart}
                                    className="w-full py-2.5 px-4 bg-transparent text-slate-400 hover:text-rose-600 hover:bg-rose-50/50 font-medium rounded-xl transition-colors duration-150 text-sm"
                                >
                                    Clear Cart
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
}