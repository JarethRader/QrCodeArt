import React from "react";
import config from "config.json";

interface IApiState {
  token?: string;
}

interface SetToken {
  type: "SET_TOKEN";
  payload: Record<"token", string>;
}

type TApiAction = SetToken;

type TApiDispatch = (action: TApiAction) => void;

const reducer = (state: IApiState, action: TApiAction): IApiState => {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        ...state,
        token: action.payload.token,
      };
    default:
      return state;
  }
};

const initialState = {
  token: undefined,
};

const ApiContext = React.createContext<{ state: IApiState; dispatch: TApiDispatch } | undefined>(
  undefined
);

interface IApiProviderProps {
  children: JSX.Element | React.ReactNode;
}

const ApiProvider: React.FC<IApiProviderProps> = (props: IApiProviderProps) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = { state, dispatch };

  return <ApiContext.Provider value={value}>{props.children}</ApiContext.Provider>;
};

const useApi = () => {
  const context = React.useContext(ApiContext);
  if (context === undefined) {
    throw new Error("useApi must be used within an Api Provider");
  }
  return context;
};

export { ApiProvider, useApi };
