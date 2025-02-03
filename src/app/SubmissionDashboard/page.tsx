"use client";
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle, Clock, RefreshCcw, Send } from "lucide-react";

const SubmissionDashboard = () => {
  // Sample data - would come from backend
  const [students, setStudents] = useState([
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

  const stats = {
    total: students.length,
    submitted: students.filter((s) => s.status === "submitted").length,
    pending: students.filter((s) => s.status === "pending").length,
    notSent: students.filter((s) => s.status === "not_sent").length,
  };

  const sendReminder = (studentId) => {
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
    <div className="space-y-6">
      {/* Summary Card */}
      <Card>
        <CardHeader>
          <CardTitle>Availability Collection Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Students</div>
            </div>
            <div className="p-4 bg-green-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.submitted}
              </div>
              <div className="text-sm text-gray-600">Submitted</div>
            </div>
            <div className="p-4 bg-yellow-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-yellow-600">
                {stats.pending}
              </div>
              <div className="text-sm text-gray-600">Pending Response</div>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <div className="text-2xl font-bold text-gray-600">
                {stats.notSent}
              </div>
              <div className="text-sm text-gray-600">Not Sent</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-between mt-6">
            <Button
              variant="outline"
              onClick={sendAllReminders}
              disabled={stats.pending === 0}
            >
              <Mail className="w-4 h-4 mr-2" />
              Send All Reminders
            </Button>
            <Button
              className="bg-blue-500 text-white"
              disabled={stats.submitted !== stats.total}
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Generate Schedule
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Status List */}
      <Card>
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
                  {/* Status Indicator */}
                  {student.status === "submitted" && (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      <span className="text-sm">
                        Submitted{" "}
                        {new Date(student.submittedAt).toLocaleDateString()}
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

                  {/* Action Button */}
                  {student.status === "pending" && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => sendReminder(student.id)}
                      disabled={
                        student.reminded &&
                        new Date(student.lastReminder).getTime() >
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
    </div>
  );
};

export default SubmissionDashboard;
