"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Pie, PieChart, Cell } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

interface DemographicsData {
  name: string;
  value: number;
  color: string;
}

interface DemographicsChartProps {
  title: string;
  data: DemographicsData[];
}

const DemographicsChart = ({ title, data }: DemographicsChartProps) => {
  const chartConfig: ChartConfig = {};
  
  data.forEach((item) => {
    chartConfig[item.name.toLowerCase().replace(/\s+/g, "")] = {
      label: item.name,
      color: item.color,
    };
  });

  return (
    <Card className="bg-white rounded-lg border border-[#E2E8F0] shadow-none">
      <CardContent className="p-2">
        <h3 className="text-base font-semibold text-foreground mb-6 text-center">
          {title}
        </h3>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-40 mb-6"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={30}
              outerRadius={60}
              strokeWidth={0}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        {/* Legend */}
        <div className="flex flex-wrap gap-4">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-muted-foreground">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export function AudienceDemographics() {
  const ageData: DemographicsData[] = [
    { name: "18-24", value: 25, color: "#F97316" }, // Orange
    { name: "25-34", value: 25, color: "#3B82F6" }, // Blue
    { name: "35-44", value: 25, color: "#10B981" }, // Green
    { name: "45+", value: 25, color: "#9333EA" }, // Purple
  ];

  const genderData: DemographicsData[] = [
    { name: "Female", value: 50, color: "#F97316" }, // Orange
    { name: "Male", value: 25, color: "#3B82F6" }, // Blue
    { name: "Other", value: 25, color: "#9333EA" }, // Purple
  ];

  const locationData: DemographicsData[] = [
    { name: "Tel Aviv", value: 25, color: "#F97316" }, // Orange
    { name: "Jerusalem", value: 25, color: "#3B82F6" }, // Blue
    { name: "Haifa", value: 25, color: "#10B981" }, // Green
    { name: "Other", value: 25, color: "#9333EA" }, // Purple
  ];

  return (
    <div className="mt-10">
      <h2 className="text-2xl font-bold text-foreground mb-6">
        Audience Demographics
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DemographicsChart title="Age Distribution" data={ageData} />
        <DemographicsChart title="Gender Split" data={genderData} />
        <DemographicsChart title="Top Locations" data={locationData} />
      </div>
    </div>
  );
}

export default AudienceDemographics;
