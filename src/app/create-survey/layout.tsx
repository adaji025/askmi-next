import CreateSurveyHeader from "@/components/core/create-surveys/create-survey-header";
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
