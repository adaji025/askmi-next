import { PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export function CampaignCTA() {
  return (
    <div className="relative flex w-full flex-col items-start gap-4 rounded-xl border border-[#2563EB80] bg-[#f0f7ff] p-5 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-col gap-4">
        {/* Overlapping bubble icon */}
        <Image
          src={"/images/svgs/campaign-filled.svg"}
          width={20}
          height={20}
          alt="No Active Campaigns"
        />

        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-black">
            Create Your First Campaign!
          </h2>
          <div className="max-w-2xl space-y-1 text-sm text-slate-600">
            <p>
              Start collecting precise audience insights through influencers.
            </p>
            <p>
              Set up your survey, choose your target audience, and let our smart
              matching system find the perfect influencers for you.
            </p>
          </div>
        </div>
      </div>

      <Button className="mt-4 shrink-0 text-sm! rounded-md bg-[#2563eb] px-6 py-6 font-semibold hover:bg-[#1d4ed8] md:mt-0 md:self-end">
        <PlusCircle className="h-5 w-5" />
        New campaign
      </Button>
    </div>
  );
}
