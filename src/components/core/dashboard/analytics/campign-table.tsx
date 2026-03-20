"use client";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MessageCircle, Users, Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import type { AnalyticsCampaign } from "@/features/analytics/use-get-analytics";

interface CampaignTableProps {
  campaigns?: AnalyticsCampaign[];
}

export function CampaignTable({ campaigns: campaignsProp }: CampaignTableProps) {
  const campaigns = campaignsProp ?? [];
  const router = useRouter();

  const handleViewDetails = (campaignId: string) => {
    router.push(`/dashboard/analytics/${campaignId}`);
  };

  return (
    <div className="w-full bg-white rounded-md border border-[#E2E8F0] overflow-auto mt-10 sm:max-w-[calc(100vw-300px)] 2xl:max-w-[calc(100vw-280px)] min-w-0">
      <div className="rounded-xl border border-border bg-card overflow-auto">
        <Table className="overflow-auto">
          <TableHeader className="bg-muted/30 border-none">
            <TableRow className="hover:bg-transparent border-none">
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                CAMPAIGNS
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                STATUS
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                RESPONSES
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                COMPLETION RATE
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                COST / RESPONSE
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                INFLUENCERS
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                CONFIDENCE
              </TableHead>
              <TableHead className="py-4 px-6 text-[11px] font-bold uppercase tracking-wider text-muted-foreground text-center">
                ACTIONS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((campaign) => (
              <TableRow key={campaign.id} className="hover:bg-muted/20 border-border">
                <TableCell className="py-5 px-6 font-bold text-foreground">
                  {campaign.campaignName}
                </TableCell>
                <TableCell className="py-5 px-6 text-center">
                  <Badge
                    variant="outline"
                    className={cn(
                      "px-3 py-1 rounded-md text-[11px] font-medium border",
                      campaign.status === "active"
                        ? "bg-green-50 text-green-600 border-green-100 hover:bg-green-50"
                        : "bg-blue-50 text-blue-600 border-blue-100 hover:bg-blue-50",
                    )}
                  >
                    {campaign.status === "active" ? "Active" : "Completed"}
                  </Badge>
                </TableCell>
                <TableCell className="py-5 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">
                      {campaign.responses.toLocaleString()}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-5 px-6 text-center text-foreground font-medium">
                  {campaign.completionRate}%
                </TableCell>
                <TableCell className="py-5 px-6 text-center text-foreground font-medium">
                  ${campaign.costPerResponse.toFixed(2)}
                </TableCell>
                <TableCell className="py-5 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">
                      {campaign.influencers}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-5 px-6 text-center">
                  <div className="flex items-center justify-center gap-2">
                    <div
                      className={cn(
                        "h-2 w-2 rounded-full",
                        campaign.confidence === "high"
                          ? "bg-green-500"
                          : campaign.confidence === "medium"
                            ? "bg-orange-500"
                            : "bg-red-500",
                      )}
                    />
                    <span className="text-foreground font-medium text-sm capitalize">
                      {campaign.confidence}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="py-5 px-6 text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleViewDetails(campaign.id)}
                    className="h-8 w-8 p-0 hover:bg-muted"
                    title="View Analytics Details"
                  >
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default CampaignTable;
