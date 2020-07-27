import {CandidateSkillModel} from './candidateSkill.model';
import {CandidateManagerialAbilityModel} from './candidateManagerialAbility.model';
import {CandidateTagsDetailModel} from './candidateTagsDetail.model';
import {CandidateLanguageModel} from './candidateLanguage.model';
import {CertificationsModel} from './certifications.model';
import {TrainingsModel} from './trainings.model';
import {ExperiencesDetailsModel} from './experiencesDetails.model';

export class CvtModel {
    id: number;
    candidateFirstName: string;
    candidateLastName: string;
    cadidateFirstAndLastName: string;
    birthDate: string;
    candidateAddress: string;
    candidateEmail: string;
    candidateMobileNo: string;
    gender: string;
    nationality: string;
    familySituation: string;
    qualificationLevel: number;
    candidateAvatar: string;
    qualificationComment: string;
    candidateAbout: string;
    availability: string;
    candidateProfileTitle: string;
    price: string;
    candidatesSkillsDetails: CandidateSkillModel[];
    candidatesManagerialAbilitiesDetails: CandidateManagerialAbilityModel[];
    candidatesTagsDetails: CandidateTagsDetailModel[];
    candidatesLanguagesDetails: CandidateLanguageModel[];
    certificationsDetails: CertificationsModel[];
    trainingsDetails: TrainingsModel[];
    experiencesDetails: ExperiencesDetailsModel[];
    missionIds: number[];
    actionIds: number[];
    skillIds: number[];
}
