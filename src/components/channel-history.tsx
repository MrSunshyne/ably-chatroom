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
  const { user } = useContext(UserContext);

  const [channel] = useChannel(channelName, (message) => {
    updateMessages((prev: Types.Message[]) => [...prev, message]);
  });

  useMemo(() => {
    channel.history((err, result) => {
      if (result && result?.items.length === 0) {
        console.log("No messages found");
        return;
      }
      result && updateMessages(result.items);

      if (err) {
        console.log(err);
      }
    });
  }, [channel]);

  const renderChatBubble = (msg: Types.Message) => {
    const message = msg.data?.message || "";
    const name = msg.data?.name || "";

    const isRich = typeof msg.data === "object";
    const isCurrentUser = msg.clientId === user.clientId;

    return isRich ? (
      <div className="flex">
        <div
          className={
            "rounded-md p-2 flex" +
            (isCurrentUser ? " bg-green-300" : " bg-pink-300 justify-end")
          }
        >
          <div className="flex flex-col gap-2">
            <div className="rounded-md  inline-block p-2">
              <div className="text-xs uppercase font-bold">{name} says: </div>

              <div className="text-xl" title={JSON.stringify(msg.data)}>
                {message}
              </div>
            </div>
          </div>
        </div>
      </div>
    ) : (
      <div className="text-xl">{JSON.stringify(msg.data)}</div>
    );
  };

  // Convert the messages to list items to render in a react component
  return (
    <div>
      <div className="flex flex-col gap-2 pt-8">
        {messages.map((msg: Types.Message, index) => (
          <>{renderChatBubble(msg)}</>
        ))}
      </div>
    </div>
  );
};
