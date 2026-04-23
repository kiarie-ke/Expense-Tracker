import { useForm, Controller } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./shared/ui/Dialog";
import { Input } from "./shared/ui/Input";
import type { IExpense } from "@/types/expense";
import { EXPENSE_CATEGORIES } from "@/constants";
import { Popover, PopoverContent, PopoverTrigger } from "./shared/ui/Popover";
import { Button } from "./shared/ui/Button";
import { Calendar1Icon } from "lucide-react";
import { Calendar } from "./shared/ui/Calendar";
import { format } from "date-fns";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./shared/ui/Select";

interface AddExpenseModalProps {
  showAddExpenseModal: boolean;
  setShowAddExpenseModal: (open: boolean) => void;
}
const AddExpenseModal = ({
  showAddExpenseModal,
  setShowAddExpenseModal,
}: AddExpenseModalProps) => {
  const {
    register,
    control,
    watch,
    formState: { errors },
  } = useForm<IExpense>();

  const watchedDate = watch("date");
  return (
    <Dialog open={showAddExpenseModal} onOpenChange={setShowAddExpenseModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>New Expense</DialogTitle>
        </DialogHeader>
        <form>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium leading-none">Title</label>
              <Input
                placeholder="Coffee, groceries,etc."
                {...register("title", { required: "Title is required" })}
              />
              <div className="text-red-600 text-sm font-medium">
                {errors.title?.message}
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium leading-none">
                  Amount ($)
                </label>
                <Input
                  placeholder="0.00"
                  {...register("amount", {
                    required: "Amount is required",
                    valueAsNumber: true,
                  })}
                />
                <div className="text-red-600 text-sm font-medium">
                  {errors.amount?.message}
                </div>
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label className="text-sm font-medium loading-none">Date</label>
                <Controller
                  control={control}
                  name="date"
                  rules={{ required: "Date is required" }}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild className="cursor-pointer">
                        <Button
                        data-empty={!watchedDate}
                          variant="outline"
                          className="data-[empty=true]:text-muted-foreground justify-start text-left font-normal"
                        >
                          <Calendar1Icon />
                          {watchedDate ? (
                            format(watchedDate, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={(date) => field.onChange(date)}
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                <div className="text-red-600 text-sm font-medium">
                  {errors.date?.message}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2 w-full">
              <label className="text-sm font-medium leading-none">
                Category
              </label>
              <Controller
                control={control}
                name="category"
                rules={{ required: "Category is required" }}
                render={({ field }) => (
                  <Select
                    value={field.value ?? undefined}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="cursor-pointer w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectGroup>
                        {EXPENSE_CATEGORIES.map((category) => (
                          <SelectItem
                            key={category.value}
                            value={category.value}
                            className="cursor-pointer"
                          >
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
              <div className="text-red-600 text-sm font-medium">
                {errors.category?.message}
              </div>
            </div>
          </div>
          <DialogFooter>
            <button
              type="submit"
              className="bg-eastern-blue text-white shadow-lg font-medium text-sm px-8 rounded-md gap-2 py-3 cursor-pointer w-full mt-6"
            >
              Add Expense
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
