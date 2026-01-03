import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

const NewSurveyCard = () => {
  const router = useRouter();
  return (
    <Card
      onClick={() => router.push("/create-survey")}
      className="bg-[#F0F4F8] rounded-md border border-[#E2E8F0] shadow-none cursor-pointer hover:bg-[#E8F0F5] transition-colors"
    >
      <CardContent className="p-4 flex h-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[#2563EB] flex items-center justify-center">
            <Plus className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewSurveyCard;
