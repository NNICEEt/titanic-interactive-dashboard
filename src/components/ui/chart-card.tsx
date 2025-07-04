import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import CommentSection from "@/components/comments/comment-section";

interface ChartCardProps {
  title: string;
  description: string;
  storageKey: string;
  children: React.ReactNode;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, description, storageKey, children }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-[250px] flex flex-col">
        <div className="flex-grow">{children}</div>
        <div className="flex-shrink-0">
          <CommentSection storageKey={storageKey} />
        </div>
      </CardContent>
    </Card>
  );
};

export default ChartCard;
