export class CandidatesRealibilityModel {
    id: {
        test_method_id: number;
    };
    reliability: number;
    grade: number;
    testMethodId: number;
    testMethodLabel: string;
    candidateId: number;
    skillId: number;
    testMethod: {
        label: string;
        id: number;
    };
}
