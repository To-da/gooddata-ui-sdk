// (C) 2007-2018 GoodData Corporation
import { IMappingHeader } from './MappingHeader';
import { ColDef, CellEvent } from 'ag-grid';

export interface IGridRow {
    drillItemMap: {
        [key: string]: IMappingHeader;
    };
    [key: string]: any;
}

export interface IGridCellEvent extends CellEvent {
    colDef: IGridHeader;
}

export interface IGridHeader extends ColDef {
    index?: number;
    measureIndex?: number;
    drillItems: IMappingHeader[];
    children?: IGridHeader[];
}

export interface IColumnDefOptions {
    [key: string]: any;
}

export interface IGridAdapterOptions {
    makeRowGroups?: boolean;
    addLoadingRenderer?: string;
    columnDefOptions?: IColumnDefOptions;
}
