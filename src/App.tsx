import { useState } from "react";
import Header from "./components/Header";
import AddExpenseModal from "./components/AddExpenseModal";
import type { IExpense } from "./types/expense";
import { nanoid } from "nanoid";
import ExpenseList from "./components/ExpenseList";
import { EXPENSE_CATEGORIES } from "./constants";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/shared/ui/Select";
import StatsCard from "./components/StatsCard";

function App() {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [expenses, setExpense] = useState<IExpense[]>([]);

  const handleSaveExpense = (formData: IExpense) => {
    if (formData.id) {
      setExpense((prev) =>
        prev.map((expense) =>
          expense.id === formData.id ? { ...expense, ...formData } : expense
        )
      );
    } else {
      setExpense((prev) => [...prev, { ...formData, id: nanoid() }]);
    }

    setShowAddExpenseModal(false);
    setSelectedExpense(null);
  };

  const handleDeleteExpense = (id: string) => {
    setExpense((prev) => prev.filter((expense) => expense.id !== id));
  };

  const handleEditExpense = (expense: IExpense) => {
    setSelectedExpense(expense);
    setShowAddExpenseModal(true);
  };

  const filteredExpenses = selectedCategory === "all"
    ? expenses
    : expenses.filter((expense) => expense.category === selectedCategory);

  return (
    <div className="min-h-screen">
      <Header setShowAddExpenseModal={setShowAddExpenseModal} />
      <main className="max-w-7xl m-auto px-6 py-8">
        <StatsCard expenses={expenses}/>
        <div className="grid grid-cols-3 mt-8 m-auto gap-8">
          <div className="flex flex-col gap-6">
            <span>ExpenseChart</span>
            <span>TopCategories</span>
          </div>
          <div className="p-6 col-span-2 bg-white rounded-2xl border border-mischka/50">
            {expenses.length ? (
              <>
                <h1 className="text-sm font-semibold uppercase tracking-wider text-storm-gray mb-5">
                  Recent Transaction
                </h1>
                <div className="mb-4">
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filter by category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All Categories</SelectItem>
                        {Object.entries(EXPENSE_CATEGORIES).map(([value, label]) => (
                          <SelectItem key={value} value={value}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                {/* Categoryfilter */}
                <ExpenseList
                  expenses={filteredExpenses}
                  onDelete={handleDeleteExpense}
                  onEdit={handleEditExpense}
                />
              </>
            ) : (
              <div className="text-center text-storm-gray">
                <p className="text-lg">No expenses yet</p>
                <p className="text-sm">Add your first expense to get started</p>
              </div>
            )}
          </div>
        </div>
      </main>
      {showAddExpenseModal ? (
        <AddExpenseModal
          showAddExpenseModal={showAddExpenseModal}
          setShowAddExpenseModal={(open) => {
            setShowAddExpenseModal(open);
            if (!open) setSelectedExpense(null);
          }}
          initialData={selectedExpense ?? undefined}
          onSaveExpense={handleSaveExpense}
        />
      ) : null}
    </div>
  );
}

export default App;
