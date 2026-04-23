type ICategory = 
    | "Food"
    | "Transportation"
    | "Utilities"
    | "Entertainment"
    | "Healthcare"
    | "Education"
    | "Personal Care"
    | "Other";

type IExpense = {
    title: string;
    category: ICategory |null;
    amount: number | null;
    date: Date | null;
    Id?: string;
};

export { IExpense, ICategory };