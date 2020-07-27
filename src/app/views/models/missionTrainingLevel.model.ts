import {TrainingLevelModel} from './trainingLevel.model';

export class MissionTrainingLevelModel {
    id: number;
    trainingLevel = new TrainingLevelModel();
    trainingLevelId: number;
    missionId: number;
}
