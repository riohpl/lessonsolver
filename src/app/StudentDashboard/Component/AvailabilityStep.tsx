import { AlertDescription } from "@/components/ui/alert";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import React from "react";

type Props = {
  teacherSchedule: any;
  unavailableTimes: any;
  setUnavailableTimes: (unavailableTimes: any) => void;
  email: string;
  students: any;
  wantConsecutive: boolean;
};


const AvailabilityStep = (props: Props) => {
  const { teacherSchedule, unavailableTimes, setUnavailableTimes, email, students, wantConsecutive } = props;
  return (
    <div className="space-y-4">
      <Alert>
        <AlertDescription>
          Please mark any times when you CANNOT attend lessons. Leave times
          unmarked if you're available.
        </AlertDescription>
      </Alert>

      {Object.entries(teacherSchedule).map(([day, { slots }]) => {
        console.log(slots, "SLOTES");
        return (
          <div key={day} className="border rounded-lg p-4">
            <h3 className="font-medium capitalize mb-2">{day}</h3>
            {slots.map((slot, index) => {
              if (slot.type !== "open") return null;
              const isUnavailable = unavailableTimes[day].includes(index);

              return (
                <div key={index} className="flex items-center space-x-2 mt-2">
                  <Button
                    variant={isUnavailable ? "destructive" : "outline"}
                    size="sm"
                    onClick={() => {
                      setUnavailableTimes((prev) => {
                        const newTimes = { ...prev };
                        if (isUnavailable) {
                          newTimes[day] = prev[day].filter((i) => i !== index);
                        } else {
                          newTimes[day] = [...prev[day], index];
                        }
                        return newTimes;
                      });
                    }}
                  >
                    {isUnavailable ? "Cannot Attend" : "Available"}
                  </Button>
                  <span>
                    {slot.start} - {slot.end}
                  </span>
                </div>
              );
            })}
          </div>
        );
      })}

      <Button
        onClick={() => {

          console.log({
            email,
            students,
            wantConsecutive,
            unavailableTimes,
          });
        }}
        className="w-full bg-green-500 text-white mt-4"
      >
        Submit Availability
      </Button>
    </div>
  );
};

export default AvailabilityStep;
