import { EXPENSE_CATEGORIES } from "@/constants";
import type { IExpense } from "@/types/expense";

interface ExpenseListProps {
  expenses: IExpense[];
  onDelete: (id: string) => void;
  onEdit: (expense: IExpense) => void;
}

const ExpenseList = ({
  expenses,
  onDelete,
  onEdit,
}: ExpenseListProps) => {
  return (
    <div className="flex flex-col gap-3">
      {expenses.map((expense) => (
        <div
          key={expense.id}
          className="flex w-full justify-between items-center rounded-xl border hover:shadow-md p-4 group"
        >
          <div className="flex gap-2 items-center">
            <p className="h-10 w-10 rounded-xl bg-athens-gray text-lg flex justify-center items-center">
              {expense.category ? EXPENSE_CATEGORIES[expense.category]?.[0] : null}
            </p>
            <div>
              <h3 className="font-medium truncate">{expense.title}</h3>
              <p className="text-sm text-storm-gray">
                {expense.category ? EXPENSE_CATEGORIES[expense.category] : null} {expense.date?.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="font-semibold text-eastern-blue">
              Ksh {expense.amount?.toFixed(2) ?? "0.00"}
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => onEdit(expense)}
                className="text-sm text-eastern-blue hover:underline"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => onDelete(expense.id!)}
                className="text-sm text-rose-500 hover:underline"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
