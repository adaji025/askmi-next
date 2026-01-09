import MultiChoiceChart from "./multi-choice-chart";
import OpenQuestion from "./open-question";
import { RatingChart } from "./rating-chart";
import { YesNoChart } from "./yes-no-chart";

const SurveyResultAnalysis = () => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <RatingChart />
      <YesNoChart />
      <MultiChoiceChart />
      <OpenQuestion />
    </div>
  );
};

export default SurveyResultAnalysis;
