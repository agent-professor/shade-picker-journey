import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface DatePickerProps {
  date?: Date;
  onDateChange?: (date?: Date) => void;
}

export function CustomDatePicker({ date, onDateChange }: DatePickerProps) {
  const [inputValue, setInputValue] = React.useState("");

  // Generate 100 years (50 before and 50 after current year)
  const years = Array.from({ length: 100 }, (_, i) => 
    new Date().getFullYear() - 50 + i
  );

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const handleYearSelect = (year: string) => {
    if (date) {
      const newDate = new Date(date.setFullYear(parseInt(year)));
      onDateChange?.(newDate);
    } else {
      const newDate = new Date();
      newDate.setFullYear(parseInt(year));
      onDateChange?.(newDate);
    }
  };

  const handleMonthSelect = (monthName: string) => {
    if (date) {
      const monthIndex = months.indexOf(monthName);
      const newDate = new Date(date.setMonth(monthIndex));
      onDateChange?.(newDate);
    } else {
      const monthIndex = months.indexOf(monthName);
      const newDate = new Date();
      newDate.setMonth(monthIndex);
      onDateChange?.(newDate);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);

    // Try to parse the date
    const parsedDate = new Date(value);
    if (parsedDate instanceof Date && !isNaN(parsedDate.getTime())) {
      onDateChange?.(parsedDate);
    }
  };

  React.useEffect(() => {
    if (date) {
      setInputValue(format(date, "PPP"));
    }
  }, [date]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-between text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter date..."
            className="border-0 p-0 focus-visible:ring-0"
          />
          <CalendarIcon className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 animate-calendar-in" align="start">
        <div className="p-3 border-b flex gap-2">
          <Select
            value={date ? months[date.getMonth()] : months[new Date().getMonth()]}
            onValueChange={handleMonthSelect}
          >
            <SelectTrigger className="w-[130px]">
              <SelectValue placeholder="Select month" />
            </SelectTrigger>
            <SelectContent>
              {months.map((month) => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select
            value={date ? date.getFullYear().toString() : new Date().getFullYear().toString()}
            onValueChange={handleYearSelect}
          >
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Select year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={onDateChange}
          initialFocus
          className="rounded-md border-none shadow-lg"
          classNames={{
            months: "space-y-4",
            month: "space-y-4",
            caption: "flex justify-center pt-1 relative items-center",
            caption_label: "text-sm font-medium",
            nav: "space-x-1 flex items-center",
            nav_button: cn(
              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
            ),
            nav_button_previous: "absolute left-1",
            nav_button_next: "absolute right-1",
            table: "w-full border-collapse space-y-1",
            head_row: "flex",
            head_cell:
              "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
            row: "flex w-full mt-2",
            cell: cn(
              "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-calendar-selected",
              "[&:has([aria-selected])]:text-white [&:has([aria-selected])]:rounded-md"
            ),
            day: cn(
              "h-9 w-9 p-0 font-normal aria-selected:opacity-100 hover:bg-calendar-hover hover:rounded-md transition-colors",
              "focus:bg-calendar-hover focus:rounded-md"
            ),
            day_selected:
              "bg-calendar-selected text-white hover:bg-calendar-selected hover:text-white focus:bg-calendar-selected focus:text-white",
            day_today: "bg-accent text-accent-foreground",
            day_outside: "text-muted-foreground opacity-50",
            day_disabled: "text-muted-foreground opacity-50",
            day_range_middle:
              "aria-selected:bg-accent aria-selected:text-accent-foreground",
            day_hidden: "invisible",
          }}
        />
      </PopoverContent>
    </Popover>
  );
}