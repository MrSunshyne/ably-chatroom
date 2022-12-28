import React from "react";
import { useState } from "react";
import ably from "../utils/ably-connection";
import { ChannelHistory } from "./channel-history";

export const AblyConnect = () => {
  const [status, setStatus] = useState("Connecting...");
  const [history, setHistory] = useState("Waiting for message...");
  const [payload, setPayload] = useState("");
  const CHANNEL = "quickstart";

  const channel = ably.channels.get(CHANNEL);

  const ablyRealtimePromiseExample = async () => {
    // Connect to Ably
    await ably.connection.once("connected");
    setStatus("Connected to System!");

    /* 
        Subscribe to a channel. 
        The promise resolves when the channel is attached 
        (and resolves synchronously if the channel is already attached).
    */

    await channel.subscribe(CHANNEL, (message) => {
      setHistory(message.data);
    });

    // Publish a message
    await channel.publish(CHANNEL, "hello");
  };

  ablyRealtimePromiseExample();

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    console.log(payload);
    await channel.publish(CHANNEL, payload);
    setPayload("");
  };

  return (
    <div className="h-full flex flex-col">
      <div className="uppercase text-sm font-bold">{status}</div>

      <div className="flex-grow">
        <ChannelHistory channel={CHANNEL} history={history} />
      </div>

      <form onSubmit={onSubmit} className="w-full flex h-16 gap-8">
        <input
          type="text"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder="Type a message..."
          className="w-3/4 p-3 text-xl"
        />
        <button className="w-1/4 border text-xl uppercase font-bold text-white rounded-lg bg-green-500">Send</button>
      </form>
    </div>
  );
};
