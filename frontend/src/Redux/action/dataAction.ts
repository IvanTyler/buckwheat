import axios from "axios"
import { Dispatch } from "react"
import { BACKEND_HOST } from "../../Constants/constants"
import { IReference } from "../../Interfaces/getData"
import { getDataActionType, GetDataActionTypesEnum, GetDataTitlesAction } from "../types/getDataTypes"

export const getDataTitles = () => {
    return async (dispath: Dispatch<getDataActionType>) => {
        const response = await axios.get<IReference>(`${BACKEND_HOST}`)

        try {
            dispath({
                type: GetDataActionTypesEnum.GET_DATA,
                payload: response.data.reference,
            })
        } catch (e) {
            dispath({
                type: GetDataActionTypesEnum.GET_DATA_ERROR,
                payload: 'Ошибка, данных нет',
            })
        }
    }
}