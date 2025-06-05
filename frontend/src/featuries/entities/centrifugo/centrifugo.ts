// centrifugo.ts
import core from "../../../core/core";
import { Centrifuge, ConnectionTokenContext } from "centrifuge";
import { updateAccessToken } from "../../api/authinstance";

const centrifuge = new Centrifuge(core.centrifugoEndpoints.websocket, {
    token: localStorage.getItem(core.localStorageKeys.access_token) ?? "",
    getToken: async (_ctx: ConnectionTokenContext) => {
        const newToken = await updateAccessToken();
        localStorage.setItem(core.localStorageKeys.access_token, newToken);
        return newToken;
    },
});

// Connect once when this module is first imported
centrifuge.connect();

export default centrifuge;
