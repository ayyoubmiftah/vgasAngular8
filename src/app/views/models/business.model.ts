import {CustomervModel} from './customerv.model';

export class BusinessModel {
    id: number;
    createdDate: string;
    businessTitle: string;
    realTurnover: number;
    potentialTurnover: number;
    businessCreationDate: string;
    businessAbout: string;
    attachment: string;
    businessEstimatedDate: string;
    businessDuration: number;
    businessStartDate: string;
    customerById=new CustomervModel();
    businessStatuId: number;
    businessStatuTitle: string;
    missionsIds: number[];
    customerId: number;
}
