import { useEffect } from 'react';
import style from './Preloader.module.scss';

interface PreloaderProps {
    preloader: number;
    setPreloader: (item: any) => void
}

export const Preloader: React.FC<PreloaderProps> = ({ preloader, setPreloader}) => {

    useEffect(() => {
        setTimeout(progressBarFunck, 50)
    }, [preloader])

    function progressBarFunck() {
        if (preloader < 100) {
            setPreloader((prev: number) => prev + 1)
        }
    }

    return (
        <div className={style.preloaderWrapper}>
            <div className={style.preloaderWrapper__preloader}>
                <div
                    style={{ width: `${preloader}%` }}
                    className={preloader < 100 ? style.preloaderWrapper__progress + ' ' +
                        style.preloaderWrapper__progressActive : style.preloaderWrapper__progress
                    }>
                </div>
            </div>
            <div className={style.preloaderWrapper__precent}>{preloader}%</div>
        </div>
    )
}