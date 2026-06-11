import ChatBubble from "./ChatBubble";

export default function ConversationSection() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Conversation Transcript
      </h2>

      <div className="space-y-5">
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