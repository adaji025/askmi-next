"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

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

export const description = "A bar chart showing multi-choice question response distribution";

// Sample data for 4-option multi-choice question
const chartData = [
  { option: "Option A", count: 125 },
  { option: "Option B", count: 98 },
  { option: "Option C", count: 156 },
  { option: "Option D", count: 87 },
];

const chartConfig = {
  count: {
    label: "Responses",
    color: "#9333EA", // Purple color matching the design system
  },
} satisfies ChartConfig;

export function MultiChoiceChart() {
  const totalResponses = chartData.reduce((sum, item) => sum + item.count, 0);
  const maxCount = Math.max(...chartData.map(item => item.count));
  const mostSelected = chartData.find(item => item.count === maxCount)?.option || "";

  return (
    <Card className="flex flex-col shadow-none rounded-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Multi-Choice Response Distribution</CardTitle>
        <CardDescription>Response count for each option</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="h-80 w-full">
          <BarChart
            data={chartData}
            margin={{
              top: 10,
              right: 10,
              left: 0,
              bottom: 10,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#E5E7EB"
              vertical={false}
            />
            <XAxis
              dataKey="option"
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={12}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <ChartTooltip
              cursor={{ fill: "rgba(147, 51, 234, 0.1)" }}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="count"
              fill="#9333EA"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 leading-none font-medium">
          Most selected: {mostSelected} <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Total responses: {totalResponses}
        </div>
      </CardFooter>
    </Card>
  );
}

export default MultiChoiceChart;
