import type { IExpense } from "@/types/expense";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ExpenseChart = ({ expenses }: { expenses: IExpense[] }) => {
  // Group expenses by category
  const expensesByCategory: Record<string, number> = {};
  expenses.forEach((expense) => {
    const category = expense.category || "Other";
    expensesByCategory[category] =
      (expensesByCategory[category] || 0) + (expense.amount || 0);
  });

  const data = Object.entries(expensesByCategory).map(([category, amount]) => ({
    category,
    amount,
  }));

  return (
    <div className="w-full bg-white rounded-lg border border-gray-200 p-4 md:p-6">
      {expenses.length > 0 ? (
        <>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Spending Breakdown
          </h2>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="category"
                tick={{ fontSize: 12, fill: "#6b7280" }}
              />
              <YAxis
                tick={{ fontSize: 12, fill: "#6b7280" }}
                label={{ value: "Amount (KSh)", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                formatter={(value: number) => `KSh ${value.toLocaleString()}`}
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar
                dataKey="amount"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
                label={{
                  position: "top",
                  formatter: (label: number | string) =>
                    `KSh ${Number(label).toLocaleString()}`,
                  fontSize: 11,
                  fill: "#1f2937",
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </>
      ) : (
        <div className="flex items-center justify-center h-96 text-gray-500">
          <p>No expenses to display</p>
        </div>
      )}
    </div>
  );
};

export default ExpenseChart;