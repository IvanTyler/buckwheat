import { IDescriptions, ITitles } from "../Interfaces/getData";

export interface IGetData {
    data: {},
    error: null | string;
}

export const initState: IGetData = {
    data: {},
    error: '',
}