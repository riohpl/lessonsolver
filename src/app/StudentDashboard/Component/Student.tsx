import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users, X } from "lucide-react";
import React from "react";

type Props = {
  students: { name: string; level: string }[];
  setStudents: (students: { name: string; level: string }[]) => void;
  wantConsecutive: boolean;
  setWantConsecutive: (wantConsecutive: boolean) => void;
  setStep: (step: string) => void;
};

const Student = (props: Props) => {
  const {
    students,
    setStudents,
    wantConsecutive,
    setWantConsecutive,
    setStep,
  } = props;
  return (
    <div className="space-y-4">
      {students.map((student, index) => (
        <div key={index} className="p-4 border rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Student {index + 1}</h3>
            {index > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setStudents(students.filter((_, i) => i !== index));
                }}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
          <Input
            placeholder="Student's name"
            value={student.name}
            onChange={(e) => {
              const newStudents = [...students];
              newStudents[index].name = e.target.value;
              setStudents(newStudents);
            }}
          />
          <select
            value={student.level}
            onChange={(e) => {
              const newStudents = [...students];
              newStudents[index].level = e.target.value;
              setStudents(newStudents);
            }}
            className="w-full border rounded p-2"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      ))}

      {students.length < 3 && (
        <Button
          onClick={() =>
            setStudents([...students, { name: "", level: "beginner" }])
          }
          variant="outline"
          className="w-full"
        >
          <Users className="w-4 h-4 mr-2" />
          Add Another Student
        </Button>
      )}

      {students.length > 1 && (
        <div className="mt-4">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={wantConsecutive}
              onChange={(e) => setWantConsecutive(e.target.checked)}
              className="rounded"
            />
            <span>Schedule lessons back-to-back</span>
          </label>
        </div>
      )}

      <Button
        onClick={() => setStep("availability")}
        className="w-full bg-blue-500 text-white mt-4"
      >
        Next: Set Availability
      </Button>
    </div>
  );
};

export default Student;
