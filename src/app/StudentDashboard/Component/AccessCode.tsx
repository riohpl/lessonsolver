import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import React from "react";

type Props = {
  email: string;
  verificationCode: string;
  setVerificationCode: (code: string) => void;
  setStep: (step: string) => void;
};

const AccessCode = (props: Props) => {
  const { email, verificationCode, setVerificationCode, setStep } = props;
  return (
    <div className="space-y-4">
      <Alert>
        <Mail className="w-4 h-4" />
        <AlertDescription>
          We've sent a verification code to {email}
        </AlertDescription>
      </Alert>
      <div>
        <label className="block text-sm font-medium mb-1">
          Enter Verification Code
        </label>
        <div className="flex space-x-2">
          <Input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="123456"
            className="w-32"
          />
          <Button
            onClick={() => setStep("students")}
            className="bg-blue-500 text-white"
          >
            Verify
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccessCode;
