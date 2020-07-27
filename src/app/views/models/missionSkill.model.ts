import {SkillsModel} from './skills.model';

export class MissionSkillModel {
    id: number;
    skills: SkillsModel;
    skillId: number;
    missionId: number;
    missionSkillGrade: number;
    missionSkillReliability: number;
    missionSkillExperience: number;
    missionSkillComment: string;
}
