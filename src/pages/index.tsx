import {Button, Input, Tabs} from "antd";
import React, {useEffect, useRef, useState} from "react";
import {Parser} from 'node-sql-parser/build/mysql'
import {SQL_AST} from "@/model/SQLAST";
import {typeTools} from "@/utils/typeTool";
import {Plugins} from "@/utils/Plugins";
import {FieldName} from "@/utils/FieldName";
import {mapUnderscoreToCamelCase} from "@/utils/mapUnderscoreToCamelCase";
import {JSONView} from "@/Components/JsonView";
import {FiledList} from "@/Components/FieldList";
import {SettingPanel} from "@/Components/SettingPanel";
import {AntdProGen} from "@/Components/AntDProGen";
import {FieldSetting} from "@/utils/FieldSetting";

// plugins
window.plugins = Plugins();
window.plugins.resign(FieldSetting)
window.plugins.resign(mapUnderscoreToCamelCase)
window.plugins.resign(typeTools)
window.plugins.resign(FieldName)


const items = [
    {
        label: `List Filed`,
        key: 1,
        children: <FiledList/>
    },
    {
        label: `AntD Pro Gen`,
        key: 2,
        children: <AntdProGen/>
    },
    {
        label: `Setting Panel`,
        key: 3,
        children: <SettingPanel/>
    },
    {
        label: `AST JSON(Debug)`,
        key: 0,
        children: <JSONView/>
    },
]

export default () => {

    const SQLParse = useRef<Parser>()

    const [SQL, SetSQL] = useState<string>(window.localStorage.getItem('SQL') || '')

    useEffect(() => {
        SQLParse.current = new Parser()
        if (SQL !== '') {
            let astify = SQLParse.current?.astify(SQL);
            SQL_AST.AST = astify
        }
    }, []);

    return (
        <div style={{
            // background: 'rgb(39, 40, 34)',
            width: '100vw',
            height: '100vh',
            padding: '10px',
            boxSizing: 'border-box',
        }}>
            <Input style={{
                width: '50%',
                marginRight: '10px',
                marginBottom: 10
            }} placeholder={"sql语言"} defaultValue={SQL} onChange={(e) => {
                console.log(e.target.value)
                SetSQL(e.target.value)
                window.localStorage.setItem('SQL', e.target.value)
            }}/>
            <Button type="primary" onClick={() => {
                let astify = SQLParse.current?.astify(SQL);
                SQL_AST.AST = astify
            }}>
                Ok(Refresh)
            </Button>
            <Tabs
                style={{
                    height: '80%',
                    maxWidth: '50%',
                    overflowY: 'scroll',
                }}
                type="card"
                //@ts-ignore
                items={items}
            />
        </div>
    );
}
