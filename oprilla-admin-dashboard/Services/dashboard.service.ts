export interface ChatMessage {
  sender: string;
  message: string;
}

export const getConversationTranscript = (): ChatMessage[] => {
  return [
    {
      sender: "AI Assistant",
      message:
        "Good afternoon! Thank you for calling Bella Vista. How may I assist you today?",
    },
    {
      sender: "Customer",
      message:
        "Hi, I'd like to book a table for four people tonight.",
    },
    {
      sender: "AI Assistant",
      message:
        "Certainly. What time would you prefer?",
    },
    {
      sender: "Customer",
      message: "Around 8 PM, please.",
    },
  ];
};