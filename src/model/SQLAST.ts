import {proxyWithComputed} from "umi";
import {ColumnRef, Create} from "node-sql-parser";

interface sql_ast_type {
    AST: Create[],
    update: boolean
}


export const SQL_AST = proxyWithComputed<sql_ast_type,any>({
    AST: [],
    update: false
},{
    FieldData: (snap) => {
        if(snap.AST.length === 0) {
            return
        }
        return snap.AST[0].create_definitions!.filter((item) => {

            if (item.column){
                return true
            }

            return false
        })
    }
})