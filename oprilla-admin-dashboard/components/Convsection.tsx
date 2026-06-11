import ChatBubble from "./ChatBubble";

export default function ConversationSection() {
  return (
    <div className="bg-white border border-[#E6E1DA] rounded-xl p-5">

      <h2 className="text-[20px] font-bold text-[#1F2937] mb-6">
        Conversation Transcript
      </h2>

      <div className="space-y-6">

        <ChatBubble
          sender="AI Assistant"
          message="Good afternoon. Thank you for calling Maitre D' Pro Bistro. How may I assist you with your reservation today?"
        />

        <ChatBubble
          sender="Customer"
          message="Hi, I'd like to book a table for four people for dinner tonight, maybe around 8:00 PM if possible?"
        />

        <ChatBubble
          sender="AI Assistant"
          message="Let me check our availability for you. We do have a table in our main dining room available at 8:00 PM."
        />

        <ChatBubble
          sender="Customer"
          message="A booth would be perfect. Thank you."
        />

      </div>
    </div>
  );
}