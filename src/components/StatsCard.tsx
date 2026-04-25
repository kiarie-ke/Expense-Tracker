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

  const cards = [
    {
      label: "Total Spent",
      value: totalSpent.toLocaleString(),
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
      borderColor: "border-blue-200",
    },
    {
      label: "This Month",
      value: thisMonthTotal.toLocaleString(),
      bgColor: "bg-green-50",
      textColor: "text-green-600",
      borderColor: "border-green-200",
    },
    {
      label: "Transactions",
      value: transactionCount.toString(),
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
      borderColor: "border-purple-200",
      noPrefix: true,
    },
    {
      label: "Avg / Transaction",
      value: averagePerTransaction.toLocaleString(undefined, {
        maximumFractionDigits: 0,
      }),
      bgColor: "bg-orange-50",
      textColor: "text-orange-600",
      borderColor: "border-orange-200",
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`${card.bgColor} border ${card.borderColor} p-3 sm:p-4 md:p-6 rounded-lg transition-all hover:shadow-md`}
        >
          <p className="text-xs sm:text-sm md:text-sm text-gray-600 mb-1 sm:mb-2 font-medium">
            {card.label}
          </p>
          <p
            className={`${card.textColor} font-bold text-lg sm:text-xl md:text-2xl break-words`}
          >
            {!card.noPrefix && "KSh "}{card.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default StatsCard;