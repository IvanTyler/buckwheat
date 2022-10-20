import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { getDataTitles } from "../Redux/action/dataAction"
import { useTypeSelector } from "./useTypeSelector"

export const useGetTitles = () => {
    const dispath = useDispatch<any>()

    useEffect(() => {
        dispath(getDataTitles())
    }, [])

    const { titles, descriptions } = useTypeSelector(state => state.data)

    return { titles, descriptions }
}