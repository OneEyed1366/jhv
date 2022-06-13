declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production";
      REACT_APP_APOLLO_TOKEN: string;
    }
  }
}

export {};
