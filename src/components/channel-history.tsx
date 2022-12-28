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
      <div className="text-xl uppercase py-10">chat log</div>
      {localHistory.reverse().map((history, index) => (
        <div key={index}>{history}</div>
      ))}
    </div>
  );
};
