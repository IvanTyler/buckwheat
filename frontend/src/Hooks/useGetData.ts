import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getDataTitles } from "../Redux/action/dataAction"
import { useTypeSelector } from "./useTypeSelector"

export const useGetData = () => {
    const dispath = useDispatch<any>()

    useEffect(() => {
        dispath(getDataTitles())
    }, [])

    const reference = useTypeSelector(state => state.data)

    return reference
}