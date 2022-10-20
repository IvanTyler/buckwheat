import { IGetData, initState } from "../initState";
import { getDataActionType, GetDataActionTypesEnum } from "../types/getDataTypes";


export const getDataReducer = (state = initState, action: getDataActionType): IGetData => {
    switch (action.type) {
        case GetDataActionTypesEnum.GET_DATA_TITLES:
            return { ...state, titles: action.payload }
        default:
            return state
    }
}