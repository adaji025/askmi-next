import type { NewSurveyDraft } from "@/features/surveys/types";

export interface TargetAudienceItem {
  type: "all" | "custom";
  values: string[];
}

export interface TargetAudience {
  region?: TargetAudienceItem;
  city?: TargetAudienceItem;
  age?: TargetAudienceItem;
  gender?: TargetAudienceItem;
  interest?: TargetAudienceItem;
}

export interface CreateCampaignRequest {
  campaignName: string;
  description?: string;
  surveySource: "creating_new" | "existing";
  surveyId?: string;
  /** When creating a new survey with the campaign, filled in setup; survey is POSTed on submit. */
  newSurveyDraft?: NewSurveyDraft;
  totalQuestions?: number;
  targetAudience?: TargetAudience;
  totalVoteNeeded: number;
  startDate: string;
  endDate?: string;
  isActive?: boolean;
}

export interface Campaign {
  id: string;
  campaignName: string;
  description: string;
  surveySource: "creating_new" | "existing";
  surveyId: string;
  targetAudience: TargetAudience;
  totalVoteNeeded: number;
  response: number;
  startDate: string;
  endDate?: string;
  isActive: boolean;
  isCompleted: boolean;
  numberOfInfluencer: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCampaignSuccessResponse {
  success: true;
  message: string;
  campaign: Campaign;
}

export interface CreateCampaignErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

export type CreateCampaignResponse =
  | CreateCampaignSuccessResponse
  | CreateCampaignErrorResponse;

export interface GetCampaignsSuccessResponse {
  success: true;
  message: string;
  campaigns: Campaign[];
  total?: number;
}

export interface GetCampaignsErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

export type GetCampaignsResponse =
  | GetCampaignsSuccessResponse
  | GetCampaignsErrorResponse;

export interface GetCampaignSuccessResponse {
  success: true;
  message: string;
  campaign: Campaign;
}

export interface GetCampaignErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

export type GetCampaignResponse =
  | GetCampaignSuccessResponse
  | GetCampaignErrorResponse;
