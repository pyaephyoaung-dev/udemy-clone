
import type {Course} from "../course/data/Course.ts";
import {type ReactNode, useState} from "react";
import { CartContext } from "./CartContext.ts";

export default function CartContextProvider({children}:{children:ReactNode}) {
    const [items, setItems] = useState<Course[]>([]);

    // 1. Course တူ ရှိ/မရှိ စစ်တဲ့နေရာမှာ .some() ကို သုံးပြီး boolean (true/false) စစ်တာ ပိုစိတ်ချရပါတယ်
    const detectCourseDuplicate = (course: Course) =>
        items.some(item => item.coureId === course.coureId);

    const addItem = (course: Course) => {

        if (detectCourseDuplicate(course)) {
            return;
        }

        console.log('CartContextProvider============',course);
        setItems(prevItems => [...prevItems, course]);
    }

    const removeItem = (id: number) => {
        setItems(items.filter(item => item.coureId !== id));
    }

    const clearCart = () => {
        setItems([]);
    }

    const totalCost = items.reduce((total, course) => total + course.fees, 0);

    const value = {
        items,
        addItem,
        removeItem,
        clearCart,
        totalCost
    }

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
}