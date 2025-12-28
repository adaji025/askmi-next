import { Button } from "@/components/ui/button";
import React from "react";

const Review = () => {
    
  return (
    <div className="p-4 sm:p-6 lg:px-8 bg-white space-y-12 rounded-lg border border-[#E2E8F0]! shadow-none!">
      {/* Action Footer */}
      <div className="flex justify-end pt-4">
        <Button
          //   onClick={() => handleNext("Budget & Timeline")}
          className="px-10 h-12 text-base font-semibold bg-[#2563EB] hover:bg-[#2563EB]/90 rounded-lg transition-all active:scale-95"
        >
          Launch Campaign
        </Button>
      </div>
    </div>
  );
};

export default Review;
