import Image from "next/image";

const AuthLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex">
      <div className="max-w-118.5 w-full h-screen bg-primary hidden lg:flex  text-white flex-col justify-between p-6 xl:p-10">
        <div className="">
          <Image
            src={"/images/svgs/askmi-logo.svg"}
            height={32}
            width={120}
            alt="askmi logo"
          />
        </div>

        {/* Main Content */}
        <div className="space-y-6 max-w-lg">
          <h2 className="text-4xl font-extrabold leading-tight text-balance">
            Monetize your Instagram audience
          </h2>
          <p className="text-lg text-[#E2E8F0] leading-relaxed">
            Create surveys, launch campaigns, and get real-time data from
            Instagram influencers and their audiences.
          </p>
        </div>

        {/* Features */}
        <div className="flex gap-8">
          <div className="relative pl-4 border-l-4 border-[#2563EB]">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"></div>
            <div className="text-3xl font-bold mb-1">24/7</div>
            <div className="text-sm text-gray-400">Customer support</div>
          </div>
          <div className="relative pl-4 border-l-4 border-[#2563EB]">
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-full"></div>
            <div className="text-3xl font-bold mb-1">Free trial</div>
            <div className="text-sm text-gray-400">7 days free trial</div>
          </div>
        </div>
      </div>
      <div className="flex-1 h-screen overflow-y-auto py-10 px-6 lg:px-8">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
