import type { IExpense } from "@/types/expense";

const StatsCard = ({ expenses }: { expenses: IExpense[] }) => {
  const totalSpent = expenses.reduce(
    (acc, curr) => acc + (curr.amount || 0),
    0,
  );

  const getThisMonthTotal = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return (
          expenseDate.getMonth() === currentMonth &&
          expenseDate.getFullYear() === currentYear
        );
      })
      .reduce((acc, curr) => acc + (curr.amount || 0), 0);
  };

  const thisMonthTotal = getThisMonthTotal();
  const transactionCount = expenses.length;
  const averagePerTransaction =
    transactionCount > 0 ? totalSpent / transactionCount : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-blue-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Total Spent</p>
        <p className="text-2xl font-bold text-blue-600">
          KSh {totalSpent.toLocaleString()}
        </p>
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">This Month</p>
        <p className="text-2xl font-bold text-green-600">
          KSh {thisMonthTotal.toLocaleString()}
        </p>
      </div>
      <div className="bg-purple-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Transactions</p>
        <p className="text-2xl font-bold text-purple-600">
          {transactionCount}
        </p>
      </div>
      <div className="bg-orange-50 p-4 rounded-lg">
        <p className="text-sm text-gray-600">Avg / Transaction</p>
        <p className="text-2xl font-bold text-orange-600">
          KSh {averagePerTransaction.toLocaleString(undefined, { maximumFractionDigits: 0 })}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;