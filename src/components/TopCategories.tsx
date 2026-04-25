import type { IExpense } from "@/types/expense";
import { EXPENSE_CATEGORIES } from "@/constants";

const TopCategories = ({ expenses }: { expenses: IExpense[] }) => {
  // Group expenses by category and calculate totals
  const categoryTotals: Record<string, number> = {};
  
  expenses.forEach((expense) => {
    const category = expense.category || "Other";
    categoryTotals[category] =
      (categoryTotals[category] || 0) + (expense.amount || 0);
  });

  // Calculate total spending
  const totalSpending = Object.values(categoryTotals).reduce(
    (sum, amount) => sum + amount,
    0
  );

  // Convert to array and sort by amount (highest first)
  const topCategories = Object.entries(categoryTotals)
    .map(([category, amount]) => ({
      category,
      amount,
      percentage: totalSpending > 0 ? (amount / totalSpending) * 100 : 0,
    }))
    .sort((a, b) => b.amount - a.amount)
    .slice(0, 5); // Top 5 categories

  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-red-500",
  ];

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6">
        Top Categories
      </h2>

      {topCategories.length > 0 ? (
        <div className="space-y-5">
          {topCategories.map((item, idx) => (
            <div key={item.category}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${colors[idx]}`}></div>
                  <span className="text-sm font-medium text-gray-900">
                    {EXPENSE_CATEGORIES[item.category as keyof typeof EXPENSE_CATEGORIES] || item.category}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-gray-900">
                    KSh {item.amount.toLocaleString(undefined, {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="text-xs text-gray-500">
                    {item.percentage.toFixed(1)}%
                  </p>
                </div>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${colors[idx]} rounded-full transition-all`}
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 py-8">
          <p className="text-sm">No expenses yet</p>
        </div>
      )}
    </div>
  );
};

export default TopCategories;