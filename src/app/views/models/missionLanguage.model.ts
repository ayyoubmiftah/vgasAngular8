import {LanguageModel} from './language.model';

export class MissionLanguageModel {
    languageId: number;
    missionId: number;
    missionLanguageIsNative: boolean;
    missionLanguageWritingLevel: number;
    missionLanguageLevel: string;
    missionLanguageSpeakingLevel: number;
    missionLanguageReadingLevel: number;
    language: LanguageModel;

}
