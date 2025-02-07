"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, AlertTriangle, Check, RefreshCcw } from "lucide-react";

const ScheduleAnalyzer = ({ teacherSchedule = {}, studentResponses = [] }) => {
  const [analysis, setAnalysis] = useState(null);
  const [proposedSchedule, setProposedSchedule] = useState(null);

  // Analyze student availability and constraints
  const analyzeAvailability = () => {
    const problematics = [];
    const warnings = [];

    // Count available slots per student
    studentResponses.forEach((student) => {
      let availableSlots = 0;

      Object.entries(teacherSchedule).forEach(([day, { slots }]) => {
        if (!slots) return;
        slots.forEach((slot, index) => {
          if (
            slot.type === "open" &&
            (!student.unavailableTimes ||
              !student.unavailableTimes[day] ||
              !student.unavailableTimes[day].includes(index))
          ) {
            availableSlots++;
          }
        });
      });

      // Flag students with limited availability
      if (availableSlots < 3) {
        problematics.push({
          student: student.students[0]?.name || "Unknown",
          email: student.email,
          availableSlots,
          reason: "Very limited availability",
        });
      } else if (availableSlots < 5) {
        warnings.push({
          student: student.students[0]?.name || "Unknown",
          email: student.email,
          availableSlots,
          reason: "Limited availability",
        });
      }
    });

    // Check sibling constraints
    studentResponses.forEach((response) => {
      if (response.students.length > 1 && response.wantConsecutive) {
        const consecutiveSlotPairs = countConsecutiveSlotPairs(
          response,
          teacherSchedule
        );
        if (consecutiveSlotPairs === 0) {
          problematics.push({
            student: response.students.map((s) => s.name).join(" & "),
            email: response.email,
            reason: "No consecutive slots available for siblings",
          });
        } else if (consecutiveSlotPairs < 3) {
          warnings.push({
            student: response.students.map((s) => s.name).join(" & "),
            email: response.email,
            reason: "Limited consecutive slots for siblings",
          });
        }
      }
    });

    return { problematics, warnings };
  };

  // Count possible consecutive slot pairs for siblings
  const countConsecutiveSlotPairs = (response, schedule) => {
    let count = 0;
    Object.entries(schedule).forEach(([day, { slots }]) => {
      if (!slots) return;
      for (let i = 0; i < slots.length - 1; i++) {
        if (
          slots[i].type === "open" &&
          slots[i + 1].type === "open" &&
          (!response.unavailableTimes ||
            !response.unavailableTimes[day] ||
            (!response.unavailableTimes[day].includes(i) &&
              !response.unavailableTimes[day].includes(i + 1)))
        ) {
          count++;
        }
      }
    });
    return count;
  };

  // Generate proposed schedule
  const generateSchedule = () => {
    // Placeholder for the actual scheduling algorithm
    return {
      monday: [
        { time: "14:00-14:30", student: "Alice" },
        { time: "14:30-15:00", student: "Bob" },
      ],
    };
  };

  return (
    <div className="space-y-6">
      {/* Analysis Section */}
      <Card>
        <CardHeader>
          <CardTitle>Schedule Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setAnalysis(analyzeAvailability())}
            className="mb-4"
          >
            <RefreshCcw className="w-4 h-4 mr-2" />
            Analyze Availability
          </Button>

          {analysis && (
            <div className="space-y-4">
              {/* Critical Problems */}
              {analysis.problematics.length > 0 && (
                <Alert variant="destructive">
                  <AlertCircle className="w-4 h-4" />
                  <AlertTitle>
                    Students Requiring Immediate Attention
                  </AlertTitle>
                  <AlertDescription>
                    <ul className="mt-2 space-y-2">
                      {analysis.problematics.map((item, index) => (
                        <li
                          key={index}
                          className="flex justify-between items-center"
                        >
                          <span>
                            <strong>{item.student}</strong>: {item.reason}
                          </span>
                          <Button size="sm" variant="outline">
                            Contact Parent
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Warnings */}
              {analysis.warnings.length > 0 && (
                <Alert>
                  <AlertTriangle className="w-4 h-4" />
                  <AlertTitle>Potential Scheduling Challenges</AlertTitle>
                  <AlertDescription>
                    <ul className="mt-2 space-y-2">
                      {analysis.warnings.map((item, index) => (
                        <li key={index}>
                          <strong>{item.student}</strong>: {item.reason}
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* All Clear */}
              {analysis.problematics.length === 0 &&
                analysis.warnings.length === 0 && (
                  <Alert>
                    <Check className="w-4 h-4 text-green-500" />
                    <AlertTitle>All Students Have Good Availability</AlertTitle>
                    <AlertDescription>
                      You can proceed with generating the schedule.
                    </AlertDescription>
                  </Alert>
                )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Schedule Generation */}
      <Card>
        <CardHeader>
          <CardTitle>Generated Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => setProposedSchedule(generateSchedule())}
            className="mb-4"
            disabled={analysis?.problematics.length > 0}
          >
            Generate Schedule
          </Button>

          {proposedSchedule && (
            <div className="space-y-4">
              {Object.entries(proposedSchedule).map(([day, slots]) => (
                <div key={day} className="border rounded-lg p-4">
                  <h3 className="font-medium capitalize mb-2">{day}</h3>
                  <div className="space-y-2">
                    {slots.map((slot, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span>{slot.time}</span>
                        <span className="font-medium">{slot.student}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ScheduleAnalyzer;
