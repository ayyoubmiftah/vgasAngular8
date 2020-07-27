import {DealsCommercial} from './dealsCommercial';

export interface SourcerModel {
    id: number;
    sourcerFirstName: string;
    sourcerLastName: string;
    sourcerMobileNo: string;
    sourcerAvatar: string;
    sourcerEmail: string;
    dealsCommercialById: DealsCommercial;
    suggestionsBySourcerId: number;
    actionsBySourcerId: number;
}
