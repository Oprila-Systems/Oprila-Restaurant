type ChatBubbleProps = {
  sender: string;
  message: string;
};

export default function ChatBubble({
  sender,
  message,
}: ChatBubbleProps) {
  const isAI = sender === "AI Assistant";

  return (
    <div className={`flex ${isAI ? "justify-start" : "justify-end"}`}>
      <div
        className={`max-w-[420px] rounded-xl p-4 ${
          isAI
            ? "bg-[#F3F0EC]"
            : "bg-[#A85B2B]"
        }`}
      >
        <p
          className={`text-[11px] font-bold uppercase mb-2 ${
            isAI
              ? "text-[#1F2937]"
              : "text-white"
          }`}
        >
          {sender}
        </p>

        <p
          className={`text-sm leading-6 ${
            isAI
              ? "text-[#374151]"
              : "text-white"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}