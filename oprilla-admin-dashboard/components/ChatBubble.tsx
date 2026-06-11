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
    <div
      className={`flex ${
        isAI ? "justify-start" : "justify-end"
      }`}
    >
      <div
        className={`max-w-md p-3 rounded-xl shadow-sm border ${
          isAI
            ? "bg-gray-100 border-gray-200"
            : "bg-[#A85B2B] border-[#A85B2B]"
        }`}
      >
        <p
          className={`font-bold mb-2 ${
            isAI
              ? "text-gray-700"
              : "text-white"
          }`}
        >
          {sender}
        </p>

        <p
          className={`leading-relaxed ${
            isAI
              ? "text-gray-700"
              : "text-white"
          }`}
        >
          {message}
        </p>
      </div>
    </div>
  );
}