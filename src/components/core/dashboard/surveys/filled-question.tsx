import LongTextQuestionCard from "./long-text-question-card";
import MultiChoiceQuestionCard from "./multi-choice-question-card";
import RatingQuestionCard from "./rating-question-card";
import ShortTextQuestionCard from "./short-text-question-card";
import YesNoQuestionCard from "./yes-no-question-card";

const FilledQuestion = () => {
  return (
    <div className="grid gap-12">
      <MultiChoiceQuestionCard />
      <RatingQuestionCard />
      <YesNoQuestionCard />
      <ShortTextQuestionCard />
      <LongTextQuestionCard />
    </div>
  );
};

export default FilledQuestion;
