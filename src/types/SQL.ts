import {ColumnRef} from "node-sql-parser";

export type CreateColumnDefinition = {
    column: ColumnRef;
    definition: DataType;
    resource: "column";
} & ColumnDefinitionOptList;

type Timezone = ["WITHOUT" | "WITH", "TIME", "ZONE"];
type KW_UNSIGNED = "UNSIGNED";
type KW_ZEROFILL = "ZEROFILL";

type DataType = {
    dataType: string;
    length?: number;
    parentheses?: true;
    suffix?: Timezone | (KW_UNSIGNED | KW_ZEROFILL)[];
    array?: "one" | "two";
};

type LiteralNotNull = {
    type: "not null";
    value: "not null";
};

type ColumnConstraint = {
    default_val: {
        type: "default";
        value: any;
    };
    nullable: LiteralNotNull | LiteralNull;
};

type LiteralNull = { type: "null"; value: null };


type KeywordComment = {
    type: "comment";
    keyword: "comment";
    symbol?: "=";
    value: string;
};

type CollateExpr = {
    type: "collate";
    symbol?: "=";
    value: string;
};


type ColumnDefinitionOptList = {
    nullable?: ColumnConstraint["nullable"];
    default_val?: ColumnConstraint["default_val"];
    auto_increment?: "auto_increment";
    unique?: "unique" | "unique key";
    primary?: "key" | "primary key";
    comment?: KeywordComment;
    collate?: { collate: CollateExpr };
    column_format?: { column_format: any };
    storage?: { storage: any };
    reference_definition?: { reference_definition: any };
    character_set?: { type: "CHARACTER SET"; value: string; symbol?: "=" };
};
