import { Plus } from "lucide-react";

const Empty = () => {
  return (
    <div className="text-center mb-8">
      <p className="text-base text-muted-foreground mb-6">
        Add or drag your first survey question here.
      </p>
      <div className="border-2 border-dashed border-[#E2E8F0] rounded-lg p-6 bg-white max-w-71.5 mx-auto">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="h-8 w-8 rounded-full bg-[#2563EB] flex items-center justify-center">
            <Plus className="h-6 w-6 text-white" />
          </div>
          <p className="text-sm font-medium text-foreground">Drag here</p>
        </div>
      </div>
    </div>
  );
};

export default Empty;
