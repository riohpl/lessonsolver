import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

type Props = {
  email: string;
  handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setStep: (step: string) => void;
};

const EmailStep = (props: Props) => {
  const { email, handleEmailChange, setStep } = props;
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Parent's Email</label>
        <div className="flex space-x-2">
          <Input
            type="text"
            value={email}
            onChange={handleEmailChange}
            placeholder="your@email.com"
            className="flex-1"
          />
          <Button
            onClick={() => {
              setStep("verify");
            }}
            className="bg-blue-500 text-white"
          >
            Verify Email
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EmailStep;
