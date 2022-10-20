import { IDescriptions, ITitles } from "../Interfaces/interface";

export interface IGetData {
    titles: ITitles[],
    descriptions: IDescriptions[],
    error: null | string;
}

export const initState: IGetData = {
    titles: [],
    descriptions: [],
    error: '',
}