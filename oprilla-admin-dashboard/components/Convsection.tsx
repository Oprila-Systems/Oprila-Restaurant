import ChatBubble from "./ChatBubble";

const conversations = [
  {
    sender: "AI Assistant",
    message:
      "Good afternoon. Thank you for calling Maitre D' Pro Bistro. How may I assist you with your reservation today?",
  },
  {
    sender: "Customer",
    message:
      "Hi, I'd like to book a table for four people for dinner tonight, maybe around 8:00 PM if possible?",
  },
  {
    sender: "AI Assistant",
    message:
      "Let me check our availability for you. We do have a table in our main dining room available at 8:00 PM.",
  },
  {
    sender: "Customer",
    message: "A booth would be perfect. Thank you.",
  },
];

export default function ConversationSection() {
  return (
    <div className="bg-white border border-[#E6E1DA] rounded-xl p-3">
      <h2 className="text-[20px] font-bold text-[#1F2937] mb-3">
        Conversation Transcript
      </h2>

      <div className="space-y-2">
        {conversations.map((conversation, index) => (
          <ChatBubble
            key={index}
            sender={conversation.sender}
            message={conversation.message}
          />
        ))}
      </div>
    </div>
  );
}