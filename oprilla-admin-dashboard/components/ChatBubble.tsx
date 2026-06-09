type ChatBubbleProps = {
  sender: string;
  message: string;
};

export default function ChatBubble({
  sender,
  message,
}: ChatBubbleProps) {
  return (
    <div className="border rounded-lg p-4 bg-gray-50">
      <p className="font-bold text-gray-800 mb-2">
        {sender}
      </p>

      <p className="text-gray-600">
        {message}
      </p>
    </div>
  );
}