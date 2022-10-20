export enum GetDataActionTypesEnum {
    GET_DATA_TITLES = 'GET_DATA_TITLES',
    GET_DATA_ERROR = 'GET_DATA_ERROR',
}

export interface GetDataTitlesAction {
    type: GetDataActionTypesEnum.GET_DATA_TITLES;
    payload: any;
}

export interface GetDataErrorAction {
    type: GetDataActionTypesEnum.GET_DATA_ERROR;
    payload: string;
}

export type getDataActionType = GetDataTitlesAction | GetDataErrorAction