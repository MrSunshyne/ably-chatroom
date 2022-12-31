import { useChannel, usePresence } from "@ably-labs/react-hooks";
import React, { useContext } from "react";
import { useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { ChannelHistory } from "./channel-history";

interface MyPresenceType {
  foo: string;
}

export const AblyConnect = () => {

  const { user, setUser, logout, isLogged, getActiveChannel } = useContext(UserContext);
  const CHANNEL_NAME = user.activeChannel;
  if (!CHANNEL_NAME) return (
    <div>
      Channel Name Not Set 
    </div>

  );

  const [payload, setPayload] = useState(
    Math.random().toString(36).substring(7)
  );

  const [channel] = useChannel(CHANNEL_NAME, (message) => {});

  const TypedUsePresenceComponent = () => {
    const [val] = usePresence<MyPresenceType>(CHANNEL_NAME);

    return <div role="presence">{JSON.stringify(val)}</div>;
  };


  const onSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    channel.publish(CHANNEL_NAME, {
      message: payload,
      clientId: user.clientId,
      name: user.name,
    });
    setPayload("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* <div>
        <ChannelsList />
      </div> */}

      <div>
        {JSON.stringify(user)} {isLogged ? "logged" : "not logged"}
      </div>

      <div className="bg-green-500">{TypedUsePresenceComponent()}</div>

      <div className="flex-grow">
        <ChannelHistory channelName={CHANNEL_NAME} />
        {/* {messagePreviews()} */}
      </div>

      <button onClick={logout}>logout</button>

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
