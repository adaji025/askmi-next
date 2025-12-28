import CreateSurveyHeader from "@/components/core/dashboard/surveys/create-survey-header";
import React from "react";

const CreateSurverLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div>
      <CreateSurveyHeader />
      {children}
    </div>
  );
};

export default CreateSurverLayout;
