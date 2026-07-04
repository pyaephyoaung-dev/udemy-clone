import type {Course} from "../course/data/Course.ts";
import {createContext} from "react";


interface CartContextType {
    items: Course[];
    addItem: (item: Course) => void;
    removeItem: (id: number) => void;
    clearCart: () => void;
    totalCost: number;
}

export const CartContext =
    createContext<CartContextType | undefined>(undefined)