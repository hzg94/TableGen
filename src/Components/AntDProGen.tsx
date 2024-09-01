import {useSnapshot} from "valtio";
import {SQL_AST} from "@/model/SQLAST";
import React, {useEffect, useState} from "react";
import request from "umi-request";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {vscDarkPlus} from "react-syntax-highlighter/dist/esm/styles/prism";
import ejs from "ejs";

import antdPro from "@/assets/antdPro.ejs";
import {subscribeKey} from "valtio/vanilla/utils";

export const AntdProGen = () => {
    const snap = useSnapshot(SQL_AST);

    const [RawTemplate, SetRawTemplate] = useState('')

    const [PluginsData, SetPluginsData] = useState(new Map())

    useEffect(() => {
        request<string>(antdPro).then(res => {
            SetRawTemplate(res)
        })
    }, []);

    useEffect(() => CodeGen, [snap.FieldData]);


    const CodeGen = () => {
        //exec
        let data = window.plugins.execute(snap.FieldData)
        console.log(data)
        SetPluginsData(data)
    }

    return (
        <>
            <SyntaxHighlighter language="javascript" style={vscDarkPlus}>
                {
                    ejs.render(RawTemplate, {
                        ast: snap.FieldData,
                        plugin: PluginsData
                    })
                }
            </SyntaxHighlighter>
        </>
    )
}