import type {Metadata } from "next";
import TarotApp from "@/components/TarotApp";

export const metadata: Metadata = {
    title:"Reading",
    description:"Draw your tarot cards and discover your reading",
}

export default function Home(){
    return <TarotApp />
}