import { MapContent } from "../MapContent/MapContent"
import { Preloader } from "../Preloader/Preloader"
import { useState } from 'react';
import style from './WrapperMap.module.scss'
import { useGetData } from '../../Hooks/useGetData';

export const WrapperMap: React.FC = () => {
    const reference = useGetData()

    const [preloader, setPreloader] = useState(0)
    
    return (
        <div className={style.wrapperMap}>
            {preloader < 100 && <Preloader preloader={preloader} setPreloader={setPreloader} />}
            {preloader === 100 && <MapContent reference={reference}/>}
        </div>
    )
}