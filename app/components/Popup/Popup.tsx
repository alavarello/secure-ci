import {Alert, AlertTitle, Snackbar} from "@mui/material";
import React from "react";
import {PopupContext} from "./PopupProvider";

function Popup() {

    const {props, dispatchPopup} = React.useContext(PopupContext);
    const {open, content, severity, title} = props;


    setTimeout(() => {
        if(!open) return;
        dispatchPopup({props: {open: false, content: <></>, severity: "error", title: "Error"}})
    }, 6000)

    return <Snackbar message="Here is snackbar message" open={open}>
        <Alert severity={severity}>
            <AlertTitle>{title}</AlertTitle>
            {content}
        </Alert>
    </Snackbar>
}

export default Popup