import {
  useChannel,
  provideSdkInstance,
  usePresence,
} from "@ably-labs/react-hooks";
import React from "react";
import { useState } from "react";
import { ChannelHistory } from "./channel-history";
import { ChannelsList } from "./channels-list";
interface MyPresenceType {
  foo: string;
}
export const AblyConnect = () => {
  const CHANNEL_NAME = "quickstart";
  const [status, setStatus] = useState(false);
  const [payload, setPayload] = useState(
    Math.random().toString(36).substring(7)
  );

  const [channel] = useChannel(CHANNEL_NAME, (message) => {});

  const TypedUsePresenceComponent = () => {
    // In this example MyPresenceType will be checked - if omitted, the shape of the initial
    // value will be used ...and if that's omitted, `any` will be the default.

    const [val] = usePresence<MyPresenceType>(CHANNEL_NAME);

    return <div role="presence">{JSON.stringify(val)}</div>;
  };

  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    channel.publish(CHANNEL_NAME, payload);
    setPayload("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* <div
        className={
          "uppercase text-sm font-bold " +
          (status ? "text-green-400" : "text-yellow-500")
        }
      >
        {status ? "Connected" : "Connecting..."}
      </div> */}

      {/* <div>
        <ChannelsList />
      </div> */}

      <div className="bg-green-500">{TypedUsePresenceComponent()}</div>

      <div className="flex-grow">
        <ChannelHistory channelName={CHANNEL_NAME} />
        {/* {messagePreviews()} */}
      </div>

      <form onSubmit={onSubmit} className="w-full grid md:grid-cols-4 gap-4">
        <input
          type="text"
          value={payload}
          onChange={(e) => setPayload(e.target.value)}
          placeholder="Type a message..."
          className="p-3 text-xl w-full md:col-span-3"
        />
        <button className="border py-2  w-full md:text-xl uppercase font-bold text-white rounded-lg bg-green-500">
          Send
        </button>
      </form>
    </div>
  );
};
