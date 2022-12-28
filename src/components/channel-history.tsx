import { useEffect, useState } from "react";

type ChannelHistoryProps = {
  channel: any;
  history: string;
};
export const ChannelHistory = ({ channel, history }: ChannelHistoryProps) => {
  const [localHistory, setLocalHistory] = useState<string[]>([]);

  useEffect(() => {
    setLocalHistory([...localHistory, history]);
  }, [history]);

  return (
    <div>
      <div className="flex flex-col gap-2 pt-8">
        {localHistory.reverse().map((history, index) => (
          <div>
            <div
              className="rounded-md bg-green-300 inline-block p-2"
              key={index}
            >
              {history}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
