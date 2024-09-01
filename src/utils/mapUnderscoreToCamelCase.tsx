import {CreateColumnDefinition} from "@/types/SQL";
import {ProjectConfigs} from "@/model/Config";
import React from "react";
import {Switch} from "antd";
import {SQL_AST} from "@/model/SQLAST";


export const mapUnderscoreToCamelCase = {
    name: 'mapUnderscoreToCamelCase',
    run(FieldData: CreateColumnDefinition[]): any {
        if(ProjectConfigs.mapUnderscoreToCamelCase){
            FieldData.map(x => {
                if(typeof x.column.column === 'string'){
                    let StringArray = x.column.column.split('_')
                    let firstString = [StringArray.shift() as string]
                    x.column.column = firstString.concat(StringArray.map(x => {
                        return x.at(0)!.toUpperCase() + x.slice(1) as string
                    })).join('')
                }
                return x
            })
        }
        return {}
    },
    configPage: (
        <>
            mapUnderscoreToCamelCase:
            <Switch defaultValue={ProjectConfigs.mapUnderscoreToCamelCase} onChange={() => {
                SQL_AST.update = !SQL_AST.update
                ProjectConfigs.mapUnderscoreToCamelCase = !ProjectConfigs.mapUnderscoreToCamelCase
            }}/>
        </>
    )
}