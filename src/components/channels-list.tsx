import { useEffect, useState } from "react";

export const ChannelsList = () => {
  const [channels, setChannels] = useState<string[]>([]);

  return (
    <div>
      <div className="flex flex-col gap-2 pt-8">
        {channels.reverse().map((history, index) => (
          <div key={index}>
            <div className="rounded-md bg-green-300 inline-block p-2">
              {history}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
