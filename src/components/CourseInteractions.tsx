import { useEffect, useId, useState } from 'react'
import { passModule } from '../lib/api'

type MCQOption = { id: string; label: string }

export function MCQ({
  question,
  options,
  correctId,
  explanationCorrect,
  explanationWrong,
}: {
  question: string
  options: MCQOption[]
  correctId: string
  explanationCorrect: string
  explanationWrong: string
}) {
  const group = useId()
  const [selected, setSelected] = useState<string | null>(null)

  const answered = selected !== null
  const correct = selected === correctId

  return (
    <div className="mcq">
      <p className="mcq-question">{question}</p>

      <div className="mcq-options" role="radiogroup" aria-label={question}>
        {options.map(option => {
          const isSelected = selected === option.id

          const stateClass =
            !answered
              ? ''
              : option.id === correctId
                ? 'mcq-opt-correct'
                : isSelected
                  ? 'mcq-opt-wrong'
                  : 'mcq-opt-muted'

          return (
            <label
              key={option.id}
              className={['mcq-option', stateClass, isSelected ? 'mcq-opt-selected' : ''].join(' ')}
            >
              <input
                type="radio"
                name={group}
                value={option.id}
                checked={isSelected}
                onChange={() => setSelected(option.id)}
              />
              <span>{option.label}</span>
            </label>
          )
        })}
      </div>

      {answered && (
        <div className={['mcq-feedback', correct ? 'mcq-ok' : 'mcq-no'].join(' ')}>
          <div className="mcq-feedback-title">{correct ? 'Correct' : 'Not quite'}</div>
          <div className="mcq-feedback-body">{correct ? explanationCorrect : explanationWrong}</div>
        </div>
      )}
    </div>
  )
}

export type AssessmentQuestion = {
  id: string
  prompt: string
  options: { id: string; label: string }[]
  correctId: string
  explanation: string
}

export function ModuleAssessment({
  moduleNumber,
  courseSlug,
  questions,
  passPercent,
}: {
  moduleNumber: number
  courseSlug: string
  questions: AssessmentQuestion[]
  passPercent: number
}) {
  const [answers, setAnswers] = useState<Record<string, string | null>>(() =>
    Object.fromEntries(questions.map(question => [question.id, null]))
  )
  const [submitted, setSubmitted] = useState(false)

  const total = questions.length
  const correctCount = questions.reduce(
    (count, question) => count + (answers[question.id] === question.correctId ? 1 : 0),
    0
  )
  const percent = Math.round((correctCount / total) * 100)
  const passed = percent >= passPercent
  const unansweredCount = questions.reduce((count, question) => count + (answers[question.id] ? 0 : 1), 0)
  const passKey = `course:module:${moduleNumber}:passed`

  const onSubmit = () => {
    setSubmitted(true)
    const container = document.querySelector('.lesson-content')
    if (container instanceof HTMLElement) {
      container.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const reset = () => {
    setAnswers(Object.fromEntries(questions.map(question => [question.id, null])))
    setSubmitted(false)
    window.localStorage.removeItem(passKey)
  }

  useEffect(() => {
    if (submitted && passed) {
      window.localStorage.setItem(passKey, 'true')
      void passModule(courseSlug, moduleNumber).catch(() => {
        // Keep local completion even if backend sync is temporarily unavailable.
      })
    }
  }, [courseSlug, moduleNumber, passKey, passed, submitted])

  return (
    <div className="assess">
      <div className="assess-top">
        <div>
          <div className="assess-title">Final Assessment</div>
          <div className="assess-subtitle">
            {total} questions | Pass mark: {passPercent}% | Feedback appears after submission
          </div>
        </div>
      </div>

      {!submitted && unansweredCount > 0 && (
        <div className="assess-callout">
          You still have {unansweredCount} unanswered question{unansweredCount === 1 ? '' : 's'}.
        </div>
      )}

      {submitted && (
        <div className={['assess-result', passed ? 'pass' : 'fail'].join(' ')}>
          <div className="assess-result-main">
            <div className="assess-result-score">{percent}%</div>
            <div>
              <div className="assess-result-status">{passed ? 'Pass' : 'Needs another try'}</div>
              <div className="assess-result-meta">
                {correctCount}/{total} correct (pass mark {passPercent}%)
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="assess-list">
        {questions.map((question, index) => {
          const group = `module-${moduleNumber}-${question.id}`
          const selected = answers[question.id]
          const isCorrect = submitted && selected === question.correctId

          return (
            <div key={question.id} className="assess-q">
              <div className="assess-q-head">
                <div className="assess-q-num">Q{index + 1}</div>
                <div className="assess-q-prompt">{question.prompt}</div>
              </div>

              <div className="assess-opts" role="radiogroup" aria-label={question.prompt}>
                {question.options.map(option => {
                  const checked = selected === option.id

                  const stateClass =
                    !submitted
                      ? ''
                      : option.id === question.correctId
                        ? 'opt-correct'
                        : checked
                          ? 'opt-wrong'
                          : 'opt-muted'

                  return (
                    <label
                      key={option.id}
                      className={['assess-opt', stateClass, checked ? 'opt-selected' : ''].join(' ')}
                    >
                      <input
                        type="radio"
                        name={group}
                        checked={checked}
                        onChange={() => setAnswers(previous => ({ ...previous, [question.id]: option.id }))}
                      />
                      <span>{option.label}</span>
                    </label>
                  )
                })}
              </div>

              {submitted && (
                <div className={['assess-feedback', isCorrect ? 'ok' : 'no'].join(' ')}>
                  <div className="assess-feedback-title">{isCorrect ? 'Correct' : 'Incorrect'}</div>
                  <div className="assess-feedback-body">
                    {selected === null ? 'No answer selected.' : question.explanation}
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="assess-actions assess-actions-bottom">
        <button type="button" className="nav-btn nav-btn-secondary" onClick={reset}>
          Reset
        </button>
        <button type="button" className="nav-btn nav-btn-primary" onClick={onSubmit}>
          Submit
        </button>
      </div>
    </div>
  )
}
