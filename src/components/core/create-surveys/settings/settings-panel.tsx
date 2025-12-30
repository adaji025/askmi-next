import { useQuestionStore } from "@/store/qustion-store";
import EmptySettings from "./empty-settings";
import FilledSettings from "./filled-settings";

export function SettingsPanel() {
  const selectedQuestionId = useQuestionStore((state) => state.selectedQuestionId);
  const selectedQuestion = useQuestionStore((state) =>
    selectedQuestionId
      ? state.questions.find((q) => q.id === selectedQuestionId)
      : null
  );

  // Show FilledSettings only if selected question is multiple-choice
  if (selectedQuestion && selectedQuestion.type === "multiple-choice") {
    return <FilledSettings />;
  }

  // Show EmptySettings otherwise
  return <EmptySettings />;
}