import { CommonResponse } from 'interfaces';

export interface GetContributeServiceResponse extends CommonResponse {
  url: string;
  error?: string;
  isPdf?: boolean;
}
