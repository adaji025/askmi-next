"use client";

import { TrendingUp } from "lucide-react";
import { Pie, PieChart, Cell } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

export const description = "A pie chart showing Yes/No response distribution";

// Sample data for Yes/No responses
const chartData = [
  { answer: "Yes", count: 245, fill: "#10B981" }, // Green for Yes
  { answer: "No", count: 155, fill: "#EF4444" }, // Red for No
];

const chartConfig = {
  count: {
    label: "Responses",
  },
  yes: {
    label: "Yes",
    color: "#10B981",
  },
  no: {
    label: "No",
    color: "#EF4444",
  },
} satisfies ChartConfig;

export function YesNoChart() {
  const totalResponses = chartData.reduce((sum, item) => sum + item.count, 0);
  const yesPercentage = ((chartData[0].count / totalResponses) * 100).toFixed(1);
  const noPercentage = ((chartData[1].count / totalResponses) * 100).toFixed(1);

  return (
    <Card className="flex flex-col shadow-none rounded-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Yes/No Response Distribution</CardTitle>
        <CardDescription>Response count for Yes and No answers</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-80"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="count"
              nameKey="answer"
              innerRadius={60}
              outerRadius={100}
              strokeWidth={5}
              stroke="#fff"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Yes: {yesPercentage}% | No: {noPercentage}% <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total responses: {totalResponses}
        </div>
      </CardFooter>
    </Card>
  );
}
