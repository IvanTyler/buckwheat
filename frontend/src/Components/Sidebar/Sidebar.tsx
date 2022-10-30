import style from './Sidebar.module.scss'
import { useRef, useState } from 'react';

interface IDataProps {
    reference: any;
    openSidebar: boolean;
    getMapCoordinates: any[];
    getMapAddressCountry: string;
    getMapAddressStreet: string;
    markers: any[];
    setButtonAddAdress(prev: any): void;
    setOpenSidebar(prev: any): void;
    setGetMapCoordinates(prev: any): void;
    setShowMarkers(prev: any): void;
}

export const Sidebar: React.FC<IDataProps> = (
    {
        reference,
        openSidebar,
        getMapCoordinates,
        getMapAddressCountry,
        getMapAddressStreet,
        setButtonAddAdress,
        setOpenSidebar,
        setGetMapCoordinates,
        setShowMarkers,
        markers,
    }) => {

    const title = useRef<HTMLDivElement>(null)
    const headline = useRef<HTMLDivElement>(null)

    const description = useRef<HTMLDivElement>(null)
    const descriptionBlock = useRef<HTMLDivElement>(null)

    const titles = reference.data.titles
    const descriptions = reference.data.descriptions

    const [listTitles, setListTitles] = useState(false)
    const [listDescriptions, setListDescriptions] = useState(false)

    const [selectedTitle, setSelectedTitle] = useState(false)
    const [selectedDescription, setSelectedDescription] = useState(false)


    const showListTitles = () => {
        setListTitles(prev => !prev)
        setListDescriptions(prev => prev = false)
    }

    const showListDescriptions = () => {
        setListDescriptions(prev => !prev)
        setListTitles(prev => prev = false)
    }

    const getTitleName = (titleName: string) => {
        headline.current!.innerText = '';
        title.current!.innerText = titleName;
        setSelectedTitle(prev => prev = false)
    }

    const getDescriptionName = (descriptionName: string) => {
        descriptionBlock.current!.innerText = '';
        description.current!.innerText = descriptionName;
        setSelectedDescription(prev => prev = false)
    }

    const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        let titleName = title.current!.innerText;
        let descriptionName = description.current!.innerText;

        if (titleName === '') setSelectedTitle(prev => prev = true)
        if (descriptionName === '') setSelectedDescription(prev => prev = true)

        if (titleName !== '' && descriptionName !== '' && getMapCoordinates.length) {
            const onPushNewMarker = {
                id: Math.floor(Math.random() * (100000000 - 999999999) + 100000000),
                title: titleName,
                description: descriptionName,
                position: getMapCoordinates,
            }

            const currentCoordinates = [...markers, onPushNewMarker]

            setButtonAddAdress((prev: any) => prev = true)
            setOpenSidebar((prev: boolean) => prev = false)
            setGetMapCoordinates((prev: never[]) => prev = [])
            setShowMarkers((prev: boolean) => prev = true)
            titleName = ''
            descriptionName = ''
            localStorage.setItem('markers', JSON.stringify(currentCoordinates))
        }
    }

    return (
        <>
            {openSidebar && <form action="" className={style.formAddAdress} onSubmit={submitHandler}>
                <h1 className={style.formAddAdress__title}>Выбирите аддресс на карте</h1>
                <div className={getMapCoordinates.length ?
                    style.formAddAdress__selectedAdress + ' ' + style.adressSelected :
                    style.formAddAdress__selectedAdress}>
                    Адресс: {getMapCoordinates.length ?
                        `${getMapAddressCountry}, улица: ${getMapAddressStreet}`
                        : 'не выбран'}
                </div>
                <div onClick={() => showListTitles()}
                    className={
                        selectedTitle ?
                            style.formAddAdress__wrapperListTitles + ' ' + style.error :
                            style.formAddAdress__wrapperListTitles
                    }>
                    <span ref={headline}>Заголовок</span>
                    <div className={style.formAddAdress__selectTitle}>
                        <span ref={title}></span>
                        <div className={style.formAddAdress__arrowShowTitle}></div>
                    </div>
                    {listTitles && <ul className={style.formAddAdress__titlesList}>
                        {
                            titles.length ?
                                titles.map((el: any, index: number) => {
                                    return <li
                                        key={index}
                                        className={style.formAddAdress__titlesItem}
                                        onClick={() => getTitleName(el.name)}
                                    >
                                        {el.name}
                                    </li>
                                }) : null
                        }
                    </ul>}
                </div>
                <div onClick={() => showListDescriptions()} className={
                    selectedDescription ?
                        style.formAddAdress__wrapperListDescriptions + ' ' + style.error :
                        style.formAddAdress__wrapperListDescriptions
                }>
                    <span ref={descriptionBlock}>Описание</span>
                    <div className={style.formAddAdress__selectDescription}>
                        <span ref={description}></span>
                        <div className={style.formAddAdress__arrowShowDescription}></div>
                    </div>
                    {listDescriptions && <ul className={style.formAddAdress__descriptionsList}>
                        {
                            descriptions.length ?
                                descriptions.map((el: any, index: number) => {
                                    return <li
                                        key={index}
                                        className={style.formAddAdress__descriptionsItem}
                                        onClick={() => getDescriptionName(el.name)}
                                    >
                                        {el.name}
                                    </li>
                                }) : null
                        }
                    </ul>}
                </div>
                <button className={style.formAddAdress__buttonAddAdress}>Добавить</button>
            </form>}
        </>
    )
}

function setSubstrate(arg0: (prev: boolean) => boolean) {
    throw new Error('Function not implemented.');
}
