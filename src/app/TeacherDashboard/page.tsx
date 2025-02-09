"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Clock, Trash2 } from "lucide-react";
import { set } from "date-fns";

type TeachingDays = {
  [key: string]: {
    enabled: boolean;
    slots: { start: string; end: string; type: string; note: string }[];
  };
};

type SlotType = {
  start: string;
  end: string;
  type: string;
  note: string;
};

const TeacherAvailability = () => {
  const [teachingDays, setTeachingDays] = useState<TeachingDays>({
    monday: {
      enabled: true,
      slots: [
        {
          start: "14:00",
          end: "19:00",
          type: "open",
          note: "",
        },
      ],
    },
    tuesday: {
      enabled: true,
      slots: [{ start: "14:00", end: "19:00", type: "open", note: "" }],
    },
    wednesday: {
      enabled: true,
      slots: [{ start: "14:00", end: "19:00", type: "open", note: "" }],
    },
    thursday: {
      enabled: true,
      slots: [{ start: "14:00", end: "19:00", type: "open", note: "" }],
    },
    friday: {
      enabled: true,
      slots: [{ start: "14:00", end: "19:00", type: "open", note: "" }],
    },
    saturday: {
      enabled: false,
      slots: [{ start: "09:00", end: "14:00", type: "open", note: "" }],
    },
    sunday: {
      enabled: false,
      slots: [{ start: "09:00", end: "14:00", type: "open", note: "" }],
    },
  });

  const [errors, setErrors] = useState<string[]>([]);

  const [settings, setSettings] = useState({
    defaultLessonDuration: 30,
    breakBetweenLessons: 0,
    maxStudentsPerDay: 8,
    location: "home",
  });

  const addTimeSlot = (day: string) => {
    console.log(day, "DAY");
    setTeachingDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [
          ...prev[day].slots,
          {
            start: "14:00",
            end: "19:00",
            type: "open",
            note: "",
          },
        ],
      },
    }));
  };

  const toggleDay = (day: string) => {
    setTeachingDays((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
      },
    }));
  };

  const updateSlotType = (day: string, index: number, type: string) => {
    setTeachingDays((prev) => {
      const newSlots = [...prev[day].slots];
      newSlots[index] = {
        ...newSlots[index],
        type: type,
      };
      return {
        ...prev,
        [day]: { ...prev[day], slots: newSlots },
      };
    });
  };

  const updateSlotNote = (day: string, index: number, note: string) => {
    setTeachingDays((prev) => {
      const newSlots = [...prev[day].slots];
      newSlots[index] = {
        ...newSlots[index],
        note: note,
      };
      return {
        ...prev,
        [day]: { ...prev[day], slots: newSlots },
      };
    });
  };

  // Convert time string to minutes for easier comparison
  const timeToMinutes = (timeStr: string) => {
    const [hours, minutes] = timeStr.split(":").map(Number);
    return hours * 60 + minutes;
  };

  // Check if two time slots overlap
  const doSlotsOverlap = (slot1: SlotType, slot2: SlotType) => {
    const start1 = timeToMinutes(slot1.start);
    const end1 = timeToMinutes(slot1.end);
    const start2 = timeToMinutes(slot2.start);
    const end2 = timeToMinutes(slot2.end);

    return start1 < end2 && end1 > start2;
  };

  // Validate all time slots
  const validateSchedule = () => {
    // let errors = [];
    setErrors([]);

    Object.entries(teachingDays).forEach(([day, { enabled, slots }]) => {
      if (!enabled) return;
      // Check each slot
      slots.forEach((slot, index) => {
        // Format time for display (24h to 12h conversion)
        const formatTime = (time) => {
          const [hours, minutes] = time.split(":");
          const hour = parseInt(hours);
          const ampm = hour >= 12 ? "PM" : "AM";
          const hour12 = hour % 12 || 12;
          return `${hour12}:${minutes} ${ampm}`;
        };

        // Format slot description
        const getSlotDesc = (s: SlotType) => {
          console.log(s, "SLOTSLOTSLOT");
          let desc = `"${
            s.type === "open" ? "Open for Students" : "Blocked"
          }" slot`;
          if (s.type === "blocked" && s.note) {
            desc += ` (${formatTime(s.start)} - ${formatTime(s.end)}, ${
              s.note
            })`;
          } else {
            desc += ` (${formatTime(s.start)} - ${formatTime(s.end)})`;
          }
          console.log(desc, "DESCDESC");
          return desc;
        };

        if (timeToMinutes(slot.end) <= timeToMinutes(slot.start)) {
          console.log(slot, "SLOTTESTEST1");
          setErrors((prev) => [
            ...prev,
            `${day}: ${getSlotDesc(slot)} ends before or at its start time`,
          ]);
        }
        console.log(slots, "SLOTCOUNT");
        if (index < slots.length - 1) {
          const nextSlot = slots[index + 1];
          if (doSlotsOverlap(slot, nextSlot)) {
            setErrors((prev) => [
              ...prev,
              `${day}: ${getSlotDesc(slot)} overlaps with ${getSlotDesc(
                nextSlot
              )}`,
            ]);
          }
        }
      });
    });
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Teaching Availability</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* General Settings */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Default Lesson Duration (minutes)
                </label>
                <Input
                  type="number"
                  value={settings.defaultLessonDuration}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      defaultLessonDuration: parseInt(e.target.value),
                    }))
                  }
                  min="15"
                  step="5"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Break Between Lessons (minutes)
                </label>
                <Input
                  type="number"
                  value={settings.breakBetweenLessons}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      breakBetweenLessons: parseInt(e.target.value),
                    }))
                  }
                  min="0"
                  step="5"
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Weekly Schedule</h3>
              {Object.entries(teachingDays).map(([day, { enabled, slots }]) => (
                <div key={day} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={enabled}
                        onChange={() => toggleDay(day)}
                        className="w-4 h-4"
                      />
                      <span className="capitalize font-medium">{day}</span>
                    </div>
                    {enabled && (
                      <Button
                        onClick={() => addTimeSlot(day)}
                        variant="outline"
                        size="sm"
                      >
                        Add Time Slot
                      </Button>
                    )}
                  </div>

                  {enabled &&
                    slots.map((slot, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-2 mt-2 p-2 bg-gray-50 rounded"
                      >
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newSlots = slots.filter(
                              (_, i) => i !== index
                            );
                            setTeachingDays((prev) => ({
                              ...prev,
                              [day]: { ...prev[day], slots: newSlots },
                            }));
                          }}
                          className="text-gray-400 hover:text-gray-600 p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                        <Clock className="w-4 h-4 text-gray-500" />
                        <Input
                          type="time"
                          value={slot.start}
                          onChange={(e) => {
                            const newSlots = [...slots];
                            newSlots[index].start = e.target.value;
                            setTeachingDays((prev) => ({
                              ...prev,
                              [day]: { ...prev[day], slots: newSlots },
                            }));
                          }}
                          className="w-32"
                        />
                        <span>to</span>
                        <Input
                          type="time"
                          value={slot.end}
                          onChange={(e) => {
                            const newSlots = [...slots];
                            newSlots[index].end = e.target.value;
                            setTeachingDays((prev) => ({
                              ...prev,
                              [day]: { ...prev[day], slots: newSlots },
                            }));
                          }}
                          className="w-32"
                        />

                        <select
                          value={slot.type}
                          onChange={(e) =>
                            updateSlotType(day, index, e.target.value)
                          }
                          className="border rounded p-1"
                        >
                          <option value="open">Open for Students</option>
                          <option value="blocked">Blocked</option>
                        </select>

                        {slot.type === "blocked" && (
                          <Input
                            type="text"
                            value={slot.note}
                            onChange={(e) =>
                              updateSlotNote(day, index, e.target.value)
                            }
                            placeholder="Reason (e.g., Dinner break)"
                            className="w-48"
                          />
                        )}
                      </div>
                    ))}
                </div>
              ))}
            </div>
            {errors.length > 0 ? (
              <div id="validation-errors" className="mb-4">
                <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                  <p className="font-bold">
                    Please fix the following conflicts:
                  </p>
                  <ul className="list-disc ml-5 mt-2">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : null}

            <Button
              className="w-full bg-blue-500 text-white"
              onClick={() => {
                validateSchedule();
                // const errorDiv = document.getElementById("validation-errors");
                // console.log(errors, "ERRORSSSSS");

                // if (errors.length > 0 && errorDiv) {
                //   errorDiv.innerHTML = `
                //     <div class="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">

                //       <p class="font-bold">Please fix the following conflicts:</p>
                //       <ul class="list-disc ml-5 mt-2">
                //         ${errors.map((error) => `<li>${error}</li>`).join("")}
                //       </ul>
                //     </div>
                //   `;
                // } else {
                //   errorDiv.innerHTML = "";

                //   console.log("Schedule is valid, saving...");
                // }
              }}
            >
              Save Availability
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TeacherAvailability;
