import { MapContent } from "../Map/Map"
import { Preloader } from "../Preloader/Preloader"
import { useState } from 'react';
import style from './WrapperMap.module.scss'

export const WrapperMap: React.FC = () => {

    const [preloader, setPreloader] = useState(0)
    
    return (
        <div className={style.wrapperMap}>
            {preloader < 100 && <Preloader preloader={preloader} setPreloader={setPreloader} />}
            {preloader === 100 && <MapContent />}
        </div>
    )
}