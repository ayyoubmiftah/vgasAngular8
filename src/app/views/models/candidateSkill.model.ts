import {SkillsModel} from './skills.model';

export class CandidateSkillModel {
    id: number;
    skills: SkillsModel;
    skillId: number;
    candidateId: number;
    candidateSkillGrade: number;
    candidateSkillReliability: number;
    candidateSkillExperience: number;
    candidateSkillComment: string;
}
