export class GenericTableModel {
    title: string;
    heads: any[];
    data: TableDataModel[];
}
export class SmartTableModel extends GenericTableModel {
    Total: number;
    Page: number;
    RowsOfPage: number;
    SearchText: string;
}
export class TableDataModel {
    data1: any;
    data2: any;
    data3: any;
    data4: any;
}
export class UserSmartTableModel {
    SearchText: string;
    data: any[];
}
