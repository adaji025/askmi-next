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

export const description = "A bar chart showing rating distribution from 1 to 10";

// Sample data for ratings 1-10 with response counts
const chartData = [
  { rating: "1", count: 12 },
  { rating: "2", count: 8 },
  { rating: "3", count: 15 },
  { rating: "4", count: 22 },
  { rating: "5", count: 35 },
  { rating: "6", count: 48 },
  { rating: "7", count: 65 },
  { rating: "8", count: 82 },
  { rating: "9", count: 95 },
  { rating: "10", count: 120 },
];

const chartConfig = {
  count: {
    label: "Responses",
    color: "#9333EA", // Purple color matching the design system
  },
} satisfies ChartConfig;

export function RatingChart() {
  return (
    <Card className="flex flex-col shadow-none rounded-md">
      <CardHeader className="items-center pb-0">
        <CardTitle>Rating Distribution</CardTitle>
        <CardDescription>Response count for each rating (1-10)</CardDescription>
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
              dataKey="rating"
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
          Average rating: 7.8 <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing distribution of responses across rating scale
        </div>
      </CardFooter>
    </Card>
  );
}
