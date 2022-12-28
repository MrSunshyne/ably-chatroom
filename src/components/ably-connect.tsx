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
  };

  return (
    <div>
      <div>{status}</div>
      <div>{history}</div>
      <div>{payload}</div>
      <form onSubmit={onSubmit}>
        {/* Input Box in React */}
        <input type="text" onChange={(e) => setPayload(e.target.value)} />
        <button>Send</button>
      </form>
      
      <ChannelHistory channel={CHANNEL} history={history} />
    </div>
  );
};
