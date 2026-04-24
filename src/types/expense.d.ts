type ICategory = 
    | "food"
    | "transportation"
    | "utilities"
    | "entertainment"
    | "shopping"
    | "healthcare"
    | "education"
    | "travel"
    | "bills"
    | "other";

type IExpense = {
    title: string;
    category: ICategory | null;
    amount: number | null;
    date: Date | null;
    id?: string;
};

export { IExpense, ICategory };