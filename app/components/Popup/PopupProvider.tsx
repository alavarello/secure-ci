import React, {FC, ReactNode} from "react";
import {AlertColor} from "@mui/material";

export interface PopupContextType {
    props: PopupProps;
    dispatchPopup: React.Dispatch<{props: PopupProps}>
}

export const PopupContext = React.createContext<PopupContextType>({
  props: {open: false, content: <></>, severity: "error", title: "Error"},
  dispatchPopup: () => {},
});

export interface PopupProps {
    open: boolean;
    content: ReactNode;
    severity: AlertColor;
    title: string;
}

export const PopupReducer = (
  state: PopupProps,
  action: {props: PopupProps}
): PopupProps => {
  return {...action.props};
};

interface MintingProviderProps {
    children?: React.ReactNode
}

export const PopupProvider: FC<MintingProviderProps> = (props) => {

  const [PopUpProps, dispatchPopup] = React.useReducer(
      PopupReducer,
      {open: false, content: <></>, severity: "error", title: "Error"}
  );

  return <PopupContext.Provider
    value={{props: PopUpProps, dispatchPopup: dispatchPopup}}
  >
    {props.children}
  </PopupContext.Provider>;
};