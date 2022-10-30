export enum GetDataActionTypesEnum {
    GET_DATA = 'GET_DATA',
    GET_DATA_ERROR = 'GET_DATA_ERROR',
    GET_DATA_CURRENT_ADRESS = 'GET_DATA_CURRENT_ADRESS',
}

export interface GetDataTitlesAction {
    type: GetDataActionTypesEnum.GET_DATA;
    payload: any;
}

export interface GetDataErrorAction {
    type: GetDataActionTypesEnum.GET_DATA_ERROR;
    payload: string;
}

export interface GetDataAdressAction {
    type: GetDataActionTypesEnum.GET_DATA_CURRENT_ADRESS;
    payload: any;
}

export type getDataActionType = GetDataTitlesAction | GetDataErrorAction | GetDataAdressAction