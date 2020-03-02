// (C) 2019-2020 GoodData Corporation
/**
 * Represents the current status of CSV source.
 *
 * @public
 */
export type DatasetLoadStatus = "RUNNING" | "OK" | "ERROR" | "CANCELLED" | "ERROR_METADATA" | "REFRESHING";

/**
 * Object wrapping info about the user that created CSV load. Contains their login and full name.
 *
 * @public
 */
export interface IDatasetUser {
    login: string;
    fullName: string;
}

/**
 * Object wrapping basic information (owner, date created, status) about a CSV Load.
 *
 * @public
 */
export interface IDatasetLoadInfo {
    owner: IDatasetUser;
    status: DatasetLoadStatus;
    created: string;
}

/**
 * Represents type of LDM field created from the Dataset column.
 *
 * @public
 */
export type DataColumnType = "ATTRIBUTE" | "FACT" | "DATE";

/**
 * Dataset column with name, type and boolean flag whether the column
 * needs to be skipped while data loading or not.
 *
 * @public
 */
export interface IDataColumn {
    column: {
        name: string;
        type: DataColumnType;
        skip?: boolean;
        format?: string;
    };
}

/**
 * Structural information about CSV header and columns. Indicates whether the CSV file
 * contains header or not and on which row. Also contains the list of CSV columns with
 * their names and types.
 *
 * @public
 */
export interface IDataHeader {
    headerRowIndex?: number;
    columns: IDataColumn[];
}

/**
 * Dataset describes a particular structure of dataset (CSV file). There may be many Loads
 * related to a single dataset - meaning multiple files with the same structure and different data.
 *
 * @public
 */
export interface IDataset {
    dataset: {
        name: string;
        dataHeader: IDataHeader;
        datasetId: string;
        loadedRowCount: number;
        datasetLoadStatus: DatasetLoadStatus;
        firstSuccessfulUpdate?: IDatasetLoadInfo;
        lastSuccessfulUpdate?: IDatasetLoadInfo;
        lastUpdate?: IDatasetLoadInfo;
    };
}
