import {Alert, AlertTitle, Snackbar} from "@mui/material";
import React from "react";
import {PopupContext} from "./PopupProvider";

function Popup() {

    const {props} = React.useContext(PopupContext);
    const {open, content} = props;


    return <Snackbar message="Here is snackbar message" open={open} autoHideDuration={6000}>
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {content}
        </Alert>
    </Snackbar>
}

export default Popup