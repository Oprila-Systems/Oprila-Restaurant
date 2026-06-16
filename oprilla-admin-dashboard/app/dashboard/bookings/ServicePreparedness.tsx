export default function ServicePreparedness() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#232323] via-[#2B2B2B] to-[#383838] px-8 py-7">
      <div className="flex items-center justify-between">
        <div className="max-w-lg">
          <h2 className="text-[34px] font-serif font-semibold text-[#D8D2CC]">
            Service Preparedness
          </h2>

          <p className="mt-3 max-w-md text-[15px] leading-6 text-[#8E8E8E]">
            The kitchen has been notified of 4 high-priority dietary
            requirements for this evening's service.
          </p>
        </div>

        <div className="relative flex h-[95px] w-[95px] items-center justify-center rounded-full border-[3px] border-[#4F4F4F]">
          <div className="absolute inset-0 rounded-full bg-white/5 blur-md" />

          <span className="relative text-[28px] font-bold text-[#CFCFCF]">
            85%
          </span>
        </div>
      </div>

      <div className="absolute right-10 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-white/[0.03] blur-3xl" />
    </div>
  );
}