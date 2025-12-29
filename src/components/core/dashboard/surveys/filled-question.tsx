import MultiChoiceQuestionCard from './multi-choice-question-card'
import RatingQuestionCard from './rating-question-card'

const FilledQuestion = () => {
  return (
    <div className='grid gap-8'>
      <MultiChoiceQuestionCard />
      <RatingQuestionCard />
    </div>
  )
}

export default FilledQuestion
