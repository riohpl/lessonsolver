import { MailX } from "lucide-react";
import { MailQuestion } from "lucide-react";
import { Users } from "lucide-react";
import CustomCard from "@/components/CustomCard";
import { MailCheck } from "lucide-react";
import React from "react";

type Props = {};

const CardContainer = (props: Props) => {
  const Cards = [
    {
      title: "Total Students",
      icon: <Users color="gray" style={{ marginTop: 0 }} />,
      value: "100",
      description: "Number of Students in the appointment",
    },
    {
      title: "Submitted",
      icon: <MailCheck color="gray" style={{ marginTop: 0 }} />,
      value: "50",
      description: "Submitted Reminders",
    },
    {
      title: "Pending Responses",
      icon: <MailQuestion color="gray" style={{ marginTop: 0 }} />,
      value: "30",
      description: "Pending Reminders from Students",
    },
    {
      title: "Not Sent",
      icon: <MailX color="gray" style={{ marginTop: 0 }} />,
      value: "1",
      description: "Reminders that are not sent",
    },
    {
      title: "Cancelled",
      icon: <MailX color="gray" style={{ marginTop: 0 }} />,
      value: "1",
      description: "Students who cancelled the appointment",
    },
  ];
  const CardList = Cards.map((card) => {
    return (
      <CustomCard
        title={card.title}
        icon={card.icon}
        value={card.value}
        description={card.description}
      />
    );
  });
  return <div className="flex gap-4 flex-wrap md:flex-nowrap">{CardList}</div>;
};

export default CardContainer;
