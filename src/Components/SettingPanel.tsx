import React from "react";

export const SettingPanel = () => {

    return (
        <>
            {
                window.plugins.getAllConfigPage()
            }
        </>
    )
}