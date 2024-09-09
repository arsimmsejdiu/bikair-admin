import {initializeApp} from "firebase/app";
import {fetchAndActivate, getRemoteConfig, getValue} from "firebase/remote-config";
import {RemoteConfigDefault} from "models/values/RemoteConfigDefault";

const firebaseConfig = {
    apiKey: "AIzaSyBjc9lBGjLgE7QWIM3Fz16DVPCXDtm74Es",
    authDomain: "bikair-8c4ba.firebaseapp.com",
    databaseURL: "https://bikair-8c4ba.firebaseio.com",
    projectId: "bikair-8c4ba",
    storageBucket: "bikair-8c4ba.appspot.com",
    messagingSenderId: "154825594215",
    appId: "1:154825594215:web:60db5fc8a73fb0b560cbc2",
    measurementId: "G-5P5CXGNYZN"
};

const firebaseApp = initializeApp(firebaseConfig);
const remoteConfig = getRemoteConfig(firebaseApp);
remoteConfig.settings.minimumFetchIntervalMillis = 3600000;
remoteConfig.defaultConfig = RemoteConfigDefault;

export const initRemoteConfig = async () => {
    return await fetchAndActivate(remoteConfig);
};

export const getRemoteConfigString = (key: keyof typeof RemoteConfigDefault): string => {
    return getValue(remoteConfig, key).asString();
};
export const getRemoteConfigNumber = (key: keyof typeof RemoteConfigDefault): number => {
    return getValue(remoteConfig, key).asNumber();
};
export const getRemoteConfigBoolean = (key: keyof typeof RemoteConfigDefault): boolean => {
    return getValue(remoteConfig, key).asBoolean();
};
export const getRemoteConfigJson = (key: keyof typeof RemoteConfigDefault): any => {
    return JSON.parse(getValue(remoteConfig, key).asString());
};


