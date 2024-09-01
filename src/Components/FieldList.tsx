import {useSnapshot} from "valtio";
import {SQL_AST} from "@/model/SQLAST";
import {Collapse} from "antd";
import React from "react";
import {FieldSetting} from "@/Components/FieldSetting";

export const FiledList = () => {
    const snap = useSnapshot(SQL_AST);

    //create_definitions
    return (
        <Collapse items={snap.FieldData ?
            snap.FieldData.map((item: any, index: number) => {
                return {
                    key: index,
                    label: item.column.column + (item.comment ? `(${item.comment.value.value})` : '') ,
                    children: <FieldSetting columns={item}/>,
                }
            }) : []
        } defaultActiveKey={['0']}/>
    )
}


// <List<any>
//     itemLayout="horizontal"
//     dataSource={snap.FieldData}
//     renderItem={(item) => (
//         <List.Item>
//             <List.Item.Meta
//                 title={item.column.column + (item.comment ? `(${item.comment.value.value})` : '')}
//                 description={item.definition.dataType}
//             />
//         </List.Item>
//     )}
// />