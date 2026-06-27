export type ReadingType = "Today" | "Love" | "Career" | "Wellbeing"| "Yes/No";

export type TarotCard = {
    name:string;
    name_short:string;
    meaning_up:string;
    meaning_rev:string;
    desc:string;
    suit:string;
    value:string;
}

export type DrawnCard = {
    card: TarotCard;
    position:"Past" | "Present" | "Future" | "Answer";
    reversed:boolean;
}

export type ReadingRecord = {
    id:string;
    type:ReadingType;
    cards:DrawnCard[];
    createdAt:string;
}