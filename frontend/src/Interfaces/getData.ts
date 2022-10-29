export interface IReference {
    reference: {
        titles: ITitles[];
        descriptions: IDescriptions[];
    }
}

export interface ITitles {
    id: number;
    name: string;
}

export interface IDescriptions {
    id: number;
    name: string;
}