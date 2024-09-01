import {useSnapshot} from "valtio";
import {SQL_AST} from "@/model/SQLAST";
import ReactJson from "react-json-view";
import React from "react";


export const JSONView = () => {
    const snap = useSnapshot(SQL_AST);
    return (
        <ReactJson theme="monokai" src={snap.AST}/>
    )
}