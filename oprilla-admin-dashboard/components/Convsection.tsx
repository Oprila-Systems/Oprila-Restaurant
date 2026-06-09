import ChatBubble from "./ChatBubble";

export default function ConversationSection() {
  return (
    <div className="flex-1 bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">
        Conversation Transcript
      </h2>

      <div className="space-y-6">

        <ChatBubble
          sender="AI Assistant"
          message="Good afternoon! Thank you for calling Bella Vista. How may I assist you today?"
        />

        <ChatBubble
          sender="Customer"
          message="Hi, I'd like to book a table for four people tonight."
        />

        <ChatBubble
          sender="AI Assistant"
          message="Certainly. What time would you prefer?"
        />

        <ChatBubble
          sender="Customer"
          message="Around 8 PM, please."
        />

      </div>
    </div>
  );
}