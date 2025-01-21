import { useState } from "react";
import { CustomDatePicker } from "@/components/CustomDatePicker";
import { toast } from "sonner";

const Index = () => {
  const [date, setDate] = useState<Date>();

  const handleDateChange = (newDate?: Date) => {
    setDate(newDate);
    if (newDate) {
      toast.success("Date selected!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-white">
      <div className="text-center space-y-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Custom Date Picker
        </h1>
        <CustomDatePicker date={date} onDateChange={handleDateChange} />
      </div>
    </div>
  );
};

export default Index;