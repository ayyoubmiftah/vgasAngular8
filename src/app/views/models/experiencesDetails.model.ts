import {ProjectsModel} from './projects.model';

export class ExperiencesDetailsModel {
    id: number;
    experienceTitle: string;
    experienceStartDate: string;
    experienceEndDate: string;
    experienceDescription: string;
    experiencePlace: string;
    companyName: string;
    projects : ProjectsModel[];
    companieId: number;
    candidateId: number;
}
