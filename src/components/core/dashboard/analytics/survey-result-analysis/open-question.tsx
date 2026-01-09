import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

const OpenQuestion = () => {
  return (
    <Card className="flex flex-col shadow-none rounded-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Open Question Response Distribution</CardTitle>
        <CardDescription>Response analysis for each Question</CardDescription>
      </CardHeader>
    </Card>
  );
};

export default OpenQuestion;
