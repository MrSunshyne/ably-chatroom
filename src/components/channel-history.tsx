import { Types } from "ably";
import { useContext, useEffect, useMemo, useState } from "react";
import { configureAbly, useChannel } from "@ably-labs/react-hooks";
import { ChatHistory } from "./chat-history";
import { UserContext } from "../contexts/UserContext";

type ChannelHistoryProps = {
  channelName: string;
};
export const ChannelHistory = ({ channelName }: ChannelHistoryProps) => {
  const [messages, updateMessages] = useState<Types.Message[]>([]);

  const [channel] = useChannel(channelName, (message) => {
    updateMessages((prev: Types.Message[]) => [...prev, message]);
  });

  useMemo(() => {
    channel.history((err, result) => {
      if (result && result?.items.length === 0) {
        console.log("No messages found");
        return;
      }
      console.log("History found");
      console.log(result);
      result && updateMessages(result.items);

      if (err) {
        console.log(err);
      }
    });
  }, [channel]);

  const { user, setUser } = useContext(UserContext);

  const handleSetUser = () => {
    setUser({
      name: "Saamiyah",
      clientId: "je taime",
    });
  };

  // Convert the messages to list items to render in a react component
  return (
    <div>
      <button onClick={handleSetUser}>relog</button>

      <div className="flex flex-col gap-2 pt-8">
        {messages.map((msg: Types.Message, index) => (
          <div key={msg.id}>
            <div className="rounded-md bg-green-300 inline-block p-2">
              {/* <pre>
                <code>{JSON.stringify(msg, null, 2)}</code>
              </pre> */}
              <div className="text-xs uppercase font-bold">
                {msg.clientId} says:{" "}
              </div>

              <div className="text-xl">{msg.data}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
