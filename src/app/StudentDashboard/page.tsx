"use client"

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Clock, Mail, Users, X } from 'lucide-react';

const StudentAvailabilityForm = ({ teacherSchedule }) => {
  const [step, setStep] = useState('email'); // email -> verify -> students -> availability
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [students, setStudents] = useState([{ name: '', level: 'beginner' }]);
  const [wantConsecutive, setWantConsecutive] = useState(false);
  const [unavailableTimes, setUnavailableTimes] = useState({
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
    friday: []
  });

  // Email verification step
  const EmailStep = () => (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Parent's Email</label>
        <div className="flex space-x-2">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            className="flex-1"
          />
          <Button 
            onClick={() => {
              // TODO: Send verification code
              setStep('verify');
            }}
            className="bg-blue-500 text-white"
          >
            Verify Email
          </Button>
        </div>
      </div>
    </div>
  );

  // Verification code step
  const VerificationStep = () => (
    <div className="space-y-4">
      <Alert>
        <Mail className="w-4 h-4" />
        <AlertDescription>
          We've sent a verification code to {email}
        </AlertDescription>
      </Alert>
      <div>
        <label className="block text-sm font-medium mb-1">Enter Verification Code</label>
        <div className="flex space-x-2">
          <Input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="123456"
            className="w-32"
          />
          <Button 
            onClick={() => setStep('students')}
            className="bg-blue-500 text-white"
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );

  // Student information step
  const StudentStep = () => (
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
          onClick={() => setStudents([...students, { name: '', level: 'beginner' }])}
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
        onClick={() => setStep('availability')}
        className="w-full bg-blue-500 text-white mt-4"
      >
        Next: Set Availability
      </Button>
    </div>
  );

  // Availability selection step
  const AvailabilityStep = () => (
    <div className="space-y-4">
      <Alert>
        <AlertDescription>
          Please mark any times when you CANNOT attend lessons. Leave times unmarked if you're available.
        </AlertDescription>
      </Alert>
      
      {Object.entries(teacherSchedule).map(([day, { slots }]) => (
        <div key={day} className="border rounded-lg p-4">
          <h3 className="font-medium capitalize mb-2">{day}</h3>
          {slots.map((slot, index) => {
            if (slot.type !== 'open') return null;
            const isUnavailable = unavailableTimes[day].includes(index);
            
            return (
              <div key={index} className="flex items-center space-x-2 mt-2">
                <Button
                  variant={isUnavailable ? "destructive" : "outline"}
                  size="sm"
                  onClick={() => {
                    setUnavailableTimes(prev => {
                      const newTimes = { ...prev };
                      if (isUnavailable) {
                        newTimes[day] = prev[day].filter(i => i !== index);
                      } else {
                        newTimes[day] = [...prev[day], index];
                      }
                      return newTimes;
                    });
                  }}
                >
                  {isUnavailable ? "Cannot Attend" : "Available"}
                </Button>
                <span>{slot.start} - {slot.end}</span>
              </div>
            );
          })}
        </div>
      ))}

      <Button 
        onClick={() => {
          // TODO: Submit availability
          console.log({
            email,
            students,
            wantConsecutive,
            unavailableTimes
          });
        }}
        className="w-full bg-green-500 text-white mt-4"
      >
        Submit Availability
      </Button>
    </div>
  );

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Student Availability</CardTitle>
      </CardHeader>
      <CardContent>
        {step === 'email' && <EmailStep />}
        {step === 'verify' && <VerificationStep />}
        {step === 'students' && <StudentStep />}
        {step === 'availability' && <AvailabilityStep />}
      </CardContent>
    </Card>
  );
};

export default StudentAvailabilityForm;