import {ShorlistSeriesModel} from './shorlistSeries.model';

export class ShortlistModel {
  id: number;
  savedAt: string;
  shortlistComment: string;
  shortlistTitle: string;
  stepTitle: string;
  shortlistSeries: ShorlistSeriesModel;
  candidatesIds: number[];
  countOfCandidates: number;
}
