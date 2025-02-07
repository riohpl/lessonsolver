interface TimeSlot {
  start: string;
  end: string;
  type: "open" | "blocked";
  note: string;
}

interface DaySchedule {
  enabled: boolean;
  slots: TimeSlot[];
}

interface TeacherSchedule {
  teacherSchedule: {
    [key: string]: DaySchedule;
  };
  settings: {
    defaultLessonDuration: number;
    breakBetweenLessons: number;
    maxStudentsPerDay: number;
    location: string;
  };
  validationErrors: string[];
  status: "error" | "success";
  timestamp: string;
}

export const TeacherSchedule: TeacherSchedule = {
  teacherSchedule: {
    monday: {
      enabled: true,
      slots: [
        {
          start: "14:00",
          end: "15:00",
          type: "open",
          note: "",
        },
        {
          start: "15:00",
          end: "16:00",
          type: "blocked",
          note: "Break",
        },
      ],
    },
    tuesday: {
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
  },
  settings: {
    defaultLessonDuration: 30,
    breakBetweenLessons: 5,
    maxStudentsPerDay: 8,
    location: "home",
  },
  validationErrors: [
    "monday: Open slot (2:00 PM - 3:00 PM) overlaps with Blocked slot (2:30 PM - 3:30 PM)",
    "wednesday: No available slots defined",
  ],
  status: "error",
  timestamp: "2024-03-14T12:00:00Z",
};
// If there are validation errors, they would appear in the UI like this:
// ┌─────────────────────────────────────┐
// │ ⚠️ Please fix the following issues: │
// ├─────────────────────────────────────┤
// │ • Overlapping slots on Monday       │
// │   2:00 PM - 3:00 PM                │
// │   conflicts with                    │
// │   2:30 PM - 3:30 PM                │
// │                                     │
// │ • Wednesday has no available slots  │
// └─────────────────────────────────────┘
// If successful:
// ┌─────────────────────────────────────┐
// │ ✅ Schedule saved successfully!     │
// │                                     │
// │ Your teaching schedule has been     │
// │ updated and is ready for students   │
// │ to book lessons.                    │
// └─────────────────────────────────────
