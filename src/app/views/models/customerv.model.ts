import {FieldsOfActivityModel} from './fieldsOfActivity.model';

export class CustomervModel {
    id?: number;
    customerId?: number;
    customerFullName?: string;
    customerAddress?: string;
    customerMobileNo?: string;
    customerFax?: string;
    customerAvatar?: string;
    customerAbout?: string;
    customerRating?: number;
    fieldOfActivityById?: FieldsOfActivityModel;
    actionsIds: number[];
    businessesIds: number[];
    contactsIds: number[];
}
