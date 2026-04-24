import { useState } from "react";
import Header from "./components/Header";
import AddExpenseModal from "./components/AddExpenseModal";
import type { IExpense } from "./types/expense";
import { nanoid } from "nanoid";
import ExpenseList from "./components/ExpenseList";

function App() {
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<IExpense | null>(null);
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

  return (
    <div className="min-h-screen">
      <Header setShowAddExpenseModal={setShowAddExpenseModal} />
      <main className="max-w-7xl m-auto px-6 py-8">
        {/* StatsCard */}
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
                {/* Categoryfilter */}
                <ExpenseList
                  expenses={expenses}
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
