import config from "../config/config.js";

export const devLog = (...args) => {
    if (config.NODE_ENV === "development") {
        console.log(...args);
    }
};

