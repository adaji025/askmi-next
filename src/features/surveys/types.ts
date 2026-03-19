export interface SurveyQuestionOption {
  id: number;
  text: string;
}

export interface SurveyQuestion {
  type: "multiple-choice" | "yes-no" | "rating-scale" | "text";
  title: string;
  required: boolean;
  options?: SurveyQuestionOption[];
  id: string;
  order: number;
}

export interface CreateSurveyRequest {
  questions: SurveyQuestion[];
  title?: string;
  campaignId?: string;
}

export interface Survey {
  id: string;
  title: string;
  questions: SurveyQuestion[];
  campaignId?: string;
  userId?: string;
  status?: "draft" | "published";
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateSurveySuccessResponse {
  success: true;
  message: string;
  survey: Survey;
}

export interface CreateSurveyErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}

export interface GetSurveysSuccessResponse {
  success: true;
  message: string;
  surveys: Survey[];
  count?: number;
}

export interface GetSurveysErrorResponse {
  success: false;
  message: string;
  errors?: Array<Record<string, unknown>>;
}
