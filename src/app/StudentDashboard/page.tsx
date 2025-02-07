"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, Users, X } from "lucide-react";
import EmailStep from "./Component/Email";
import AccessCode from "./Component/AccessCode";
import Student from "./Component/Student";
import { TeacherSchedule } from "./sample";
import AvailabilityStep from "./Component/AvailabilityStep";

const StudentAvailabilityForm = ({
  teacherSchedule = TeacherSchedule.teacherSchedule,
}: {
  teacherSchedule: any;
}) => {
  const [step, setStep] = useState("email");
  const [email, setEmail] = useState<string>("");
  const [verificationCode, setVerificationCode] = useState("");
  const [students, setStudents] = useState([{ name: "", level: "beginner" }]);
  const [wantConsecutive, setWantConsecutive] = useState(false);
  const [unavailableTimes, setUnavailableTimes] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: [],
  });

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Student Availability</CardTitle>
      </CardHeader>
      <CardContent>
        {step === "email" && (
          <EmailStep
            email={email}
            handleEmailChange={(e) => setEmail(e.target.value)}
            setStep={setStep}
          />
        )}
        {step === "verify" && (
          <AccessCode
            email={email}
            verificationCode={verificationCode}
            setVerificationCode={setVerificationCode}
            setStep={setStep}
          />
        )}
        {step === "students" && (
          <Student
            students={students}
            setStudents={setStudents}
            wantConsecutive={wantConsecutive}
            setWantConsecutive={setWantConsecutive}
            setStep={setStep}
          />
        )}
        {step === "availability" && (
          <AvailabilityStep
            teacherSchedule={teacherSchedule}
            unavailableTimes={unavailableTimes}
            setUnavailableTimes={setUnavailableTimes}
            email={email}
            students={students}
            wantConsecutive={wantConsecutive}
          />
        )}
      </CardContent>
    </Card>
  );
};

export default StudentAvailabilityForm;
