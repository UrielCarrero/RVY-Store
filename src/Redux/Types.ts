export type ActionStore = {
    type: string,
    payload: any,
}

export type StateStore = {
    isLoading: boolean,
    errMess: string,
    products: any,
    productPage: string,
}

export interface IUserProps {
    id?: number;
    email:string;
    username:string;
    password:string;
    name:{
        firstname:string;
        lastname:string;
    },
    address:{
        city:string;
        street:string;
        number?:number;
        zipcode:string;
        geolocation:{
            lat:string;
            long:string;
        }
    },
    phone:string;
}

export type IUserState = {
    registered_email: boolean;
    active: boolean;
    user: IUserProps;
    errMess: string;
    validationProcess:string;
    favorites?: any;
}

export type CartState = {
    total_price: number;
    products: any;
    date?: string;
    userId?:number;
    errMess?: string;
    added?: string;
}

export type ProductTraits = Array<{
    price: string,
    name: string,
    img_link: string,
    quantity: number,
    id: number
}>