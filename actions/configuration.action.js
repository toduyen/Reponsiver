import { sendGet, sendPost } from "utils/requests";
import { sendDelete, sendPatch } from "../utils/requests";

export const lstConfigs = (jwt) => {
    return sendGet(`${API_CONFIG_URL}/api/configs?size=10000`, null, jwt);
}

export const insertConfig = (jwt, data) => {
    return sendPost(`${API_CONFIG_URL}/api/configs`, null, data, jwt);
}

export const updateConfig = (jwt, data) => {
    const{application, profile, label, key} = data;
    return sendPatch(`${API_CONFIG_URL}/api/configs/${application}/${profile}/${label}/${key}`, null, data, jwt);
}

export const deleteConfig = (jwt, data) => {
    const{application, profile, label, key} = data;
    return sendDelete(`${API_CONFIG_URL}/api/configs/${application}/${profile}/${label}/${key}`, null, jwt);
}