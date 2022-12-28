type ChatHistoryProps = {
  history: string[];
};
export const ChatHistory = ({ history }: ChatHistoryProps) => {
  return (
    <div>
      <div className="flex flex-col gap-2 pt-8">
        {history.map((message, index) => (
          <div key={index}>
            <div className="rounded-md bg-green-300 inline-block p-2">
              {message}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
