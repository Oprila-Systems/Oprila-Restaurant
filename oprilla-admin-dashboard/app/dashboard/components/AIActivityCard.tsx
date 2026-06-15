type AIActivityCardProps = {
  title: string;
  status: string;
  statusBg: string;
  statusText: string;
  dotColor: string;
  description: string;
  footer: string;
  italic?: boolean;
};

export default function AIActivityCard({
  title,
  status,
  statusBg,
  statusText,
  dotColor,
  description,
  footer,
  italic = false,
}: AIActivityCardProps) {
  return (
    <div className="relative pl-5 border-l border-gray-200">
      <div
        className={`absolute -left-[5px] top-1 w-2 h-2 rounded-full ${dotColor}`}
      ></div>

      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-sm text-[#2B2B2B]">
          {title}
        </h3>

        <span
          className={`${statusBg} ${statusText} text-[9px] px-3 py-1 rounded`}
        >
          {status}
        </span>
      </div>

      <p
        className={`text-sm text-gray-500 ${
          italic ? "italic" : ""
        }`}
      >
        {description}
      </p>

      <p className="text-[10px] text-gray-400 mt-3">
        {footer}
      </p>
    </div>
  );
}