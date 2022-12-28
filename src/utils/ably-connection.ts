const API_KEY = import.meta.env.VITE_APP_ABLY_API_KEY;
import Ably from "ably";

const ably = new Ably.Realtime.Promise(API_KEY);

export const isConnected = async () => {
    return await ably.connection.once("connected");
};

export default ably;
