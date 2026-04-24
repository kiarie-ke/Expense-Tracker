// Expense Categories
export const EXPENSE_CATEGORIES = {
  food: "Food & Dining",
  transportation: "Transportation",
  utilities: "Utilities",
  entertainment: "Entertainment",
  shopping: "Shopping",
  healthcare: "Healthcare",
  education: "Education",
  travel: "Travel",
  bills: "Bills & Payments",
  other: "Other",
} as const;

// Currency Settings
export const CURRENCY = {
  symbol: "$",
  code: "USD",
  decimalPlaces: 2,
} as const;

// Date Formats
export const DATE_FORMATS = {
  display: "MMM dd, yyyy",
  api: "yyyy-MM-dd",
  input: "yyyy-MM-dd",
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  expense: {
    title: {
      minLength: 3,
      maxLength: 100,
    },
    amount: {
      min: 0.01,
      max: 999999.99,
    },
    description: {
      maxLength: 500,
    },
  },
} as const;

// Status Types
export const EXPENSE_STATUS = {
  PENDING: "pending",
  COMPLETED: "completed",
  ARCHIVED: "archived",
} as const;

// Sorting Options
export const SORT_OPTIONS = [
  { value: "date-desc", label: "Newest First" },
  { value: "date-asc", label: "Oldest First" },
  { value: "amount-desc", label: "Highest Amount" },
  { value: "amount-asc", label: "Lowest Amount" },
  { value: "title-asc", label: "Title (A-Z)" },
] as const;

// Filter Options
export const FILTER_PERIODS = [
  { value: "all", label: "All Time" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
] as const;

// Messages
export const MESSAGES = {
  success: {
    expenseAdded: "Expense added successfully",
    expenseUpdated: "Expense updated successfully",
    expenseDeleted: "Expense deleted successfully",
  },
  error: {
    expenseNotFound: "Expense not found",
    invalidAmount: "Please enter a valid amount",
    fillRequired: "Please fill in all required fields",
  },
} as const;

// Limits
export const LIMITS = {
  maxExpensesPerMonth: 500,
  maxTitleLength: 100,
  maxDescriptionLength: 500,
} as const;
