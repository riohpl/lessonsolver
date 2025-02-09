"use client";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import CardContainer from "./CardContainer";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Mail, RefreshCw, Send } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Input } from "@/components/ui/input";

interface Student {
  id: number;
  parentName: string;
  studentNames: string[];
  email: string;
  status: string;
  submittedAt?: string;
  reminded: boolean;
  lastReminder?: string;
}
export default function Page() {
  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      parentName: "Sarah Johnson",
      studentNames: ["Emily Johnson"],
      email: "sarah@email.com",
      status: "submitted",
      submittedAt: "2024-12-27T15:30:00",
      reminded: false,
    },
    {
      id: 2,
      parentName: "Michael Chen",
      studentNames: ["Kevin Chen", "Lisa Chen"],
      email: "mchen@email.com",
      status: "pending",
      reminded: true,
      lastReminder: "2024-12-26T10:00:00",
    },
    {
      id: 3,
      parentName: "Jessica Brown",
      studentNames: ["Tommy Brown"],
      email: "jbrown@email.com",
      status: "not_sent",
      reminded: false,
    },
  ]);
  const [email, setEmail] = useState<string>("");
  const stats = {
    total: students.length,
    submitted: students.filter((s) => s.status === "submitted").length,
    pending: students.filter((s) => s.status === "pending").length,
    notSent: students.filter((s) => s.status === "not_sent").length,
  };

  const sendReminder = (studentId: number) => {
    setStudents(
      students.map((student) =>
        student.id === studentId
          ? {
              ...student,
              reminded: true,
              lastReminder: new Date().toISOString(),
            }
          : student
      )
    );
  };

  const sendAllReminders = () => {
    setStudents(
      students.map((student) =>
        student.status === "pending"
          ? {
              ...student,
              reminded: true,
              lastReminder: new Date().toISOString(),
            }
          : student
      )
    );
  };
  return (
    <>
      <CardContainer />
      <div className="flex gap-4">
        <Button variant={"outline"} onClick={sendAllReminders}>
          <Mail />
          Send Reminders
        </Button>
        <Button variant={"default"}>
          <RefreshCw />
          Generate Schedule
        </Button>
      </div>
      <Separator />
      <Card className="flex flex-col gap-4 p-6">
        <CardHeader>
          <CardTitle>Student Submission Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50"
              >
                <div className="space-y-1">
                  <div className="font-medium">{student.parentName}</div>
                  <div className="text-sm text-gray-600">
                    Students: {student.studentNames.join(", ")}
                  </div>
                  <div className="text-sm text-gray-500">{student.email}</div>
                </div>

                <div className="flex items-center space-x-4">
                  {student.status === "submitted" && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        Submitted{" "}
                        {new Date(
                          student.submittedAt || ""
                        ).toLocaleDateString()}
                      </span>
                    </div>
                  )}
                  {student.status === "pending" && (
                    <div className="flex items-center text-yellow-600">
                      <Clock className="w-4 h-4 mr-1" />
                      <span className="text-sm">Pending Response</span>
                    </div>
                  )}
                  {student.status === "not_sent" && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="w-4 h-4 mr-1" />
                      <span className="text-sm">Not Sent</span>
                    </div>
                  )}
                  {student.status === "pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendReminder(student.id)}
                      disabled={
                        student.reminded &&
                        new Date(student.lastReminder || "").getTime() >
                          Date.now() - 24 * 60 * 60 * 1000
                      }
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Send Reminder
                    </Button>
                  )}
                  {student.status === "not_sent" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setStudents(
                          students.map((s) =>
                            s.id === student.id
                              ? { ...s, status: "pending" }
                              : s
                          )
                        );
                      }}
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Send Link
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  );
}
