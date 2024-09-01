import {CreateColumnDefinition} from "@/types/SQL";


export const typeTools = {
    name: 'type',
    run(FieldData: CreateColumnDefinition[]):any {
        let Result = []
        for (let field of FieldData) {
            Result.push({
                name: field.column.column,
                type: SQLTypeToJsType(field.definition.dataType)
            })
        }
        return Result
    }
}

export const SQLTypeToJsType = (SQLType: string) => {
    switch (SQLType) {
        //string
        case 'CHAR':
            return 'string';
        case 'VARCHAR':
            return 'string';
        case 'TEXT':
            return 'string';


        //number
        case 'BIGINT':
            return 'number';
        case 'DECIMAL':
            return 'number';
        case 'INT':
            return 'number';
        case 'FLOAT':
            return 'number';


        //boolean
        case 'TINYINT':
            return 'boolean';


        //Date
        case 'DATETIME':
            return 'Date';


        // No Found
        default:
            throw Error(`Unknown SQL Type: ${SQLType}`);

    }
}