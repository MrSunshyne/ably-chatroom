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
      <div>Channel History</div>
      {localHistory.map((history, index) => (
        <div key={index}>{history}</div>
      ))}
    </div>
  );
};
