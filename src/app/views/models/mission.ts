import {MissionSkillModel} from './missionSkill.model';
import {MissionManagerialAbilityModel} from './missionManagerialAbility.model';
import {MissionLanguageModel} from './missionLanguage.model';
import {MissionTagsModel} from './missionTags.model';
import {MissionTrainingLevelModel} from './missionTrainingLevel.model';

export class Mission {
    id: number;
    missionTitle: string;
    missionActualDateEnd: string;
    missionEstimatedDateEnd: string;
    missionActualDateStart: string;
    missionEstimatedDateStart: string;
    missionAbout: string;
    missionDuration: number;
    missionProfiles: number;
    businessId: number;
    missionStatusId: number;
    missionStatusTitle: string;
    missionTypeId: number;
    missionTypeTitle: string;
    missionSkillsDetails: MissionSkillModel[];
    missionManagerialAbilitiesDetails: MissionManagerialAbilityModel[];
    missionTagsDetails: MissionTagsModel[];
    missionLanguagesDetails: MissionLanguageModel[];
    missionTrainingLevelDetails: MissionTrainingLevelModel[];
}
