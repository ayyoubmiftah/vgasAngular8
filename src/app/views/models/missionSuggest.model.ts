import {CandidateSuggestModel} from './CandidateSuggestModel';

export interface MissionSuggestModel {
    id: number;
    missionTitle: string;
    missionEstimatedDateStart: string;
    missionEstimatedDateFin: string;
    businessId: number;
    missionStatusTitle: string;
    candidates: CandidateSuggestModel[];
    sourcersFullName: string;

}
