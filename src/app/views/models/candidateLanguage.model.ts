import {LanguageModel} from './language.model';

export class CandidateLanguageModel {
    languageId: number;
    candidateId: number;
    candidateLanguageIsNative: boolean;
    candidateLanguageWritingLevel: number;
    candidateLanguageLevel: string;
    candidateLanguageSpeakingLevel: number;
    candidateLanguageReadingLevel: number;
    language: LanguageModel;

}
