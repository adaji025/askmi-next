import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface CampaignCardProps {
  title: string
  responses: number
  totalResponses: number
  status: "active" | "inactive"
}

export function CampaignCard({
  title,
  responses,
  totalResponses,
  status,
}: CampaignCardProps) {
  const percentage = (responses / totalResponses) * 100

  return (
    <Card className="border border-border">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[#8B5CF6]" />
            <h3 className="text-base font-medium">{title}</h3>
          </div>
          <Badge
            variant="secondary"
            className="bg-[#DCFCE7] text-[#16A34A] hover:bg-[#DCFCE7] font-normal"
          >
            {status === "active" ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground text-right">
            {responses} of {totalResponses} responses
          </p>
          <Progress value={percentage} className="h-1.5" />
        </div>
      </CardContent>
    </Card>
  )
}
