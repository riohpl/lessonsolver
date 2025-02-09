import { Plus, Users } from "lucide-react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

type Props = {
  title: string;
  icon: React.ReactNode;
  value: string;
  description: string;
};

const CustomCard = (props: Props) => {
  const { title, icon, value, description } = props;
  return (
    <Card className="w-full md:w-1/4 ">
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <CardTitle>{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent className="">
        <div className="flex flex-row items-center">
          <h1 className="text-3xl font-bold ">{value}</h1>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
