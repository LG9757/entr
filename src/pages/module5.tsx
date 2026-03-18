import ModulePage, { type Lesson } from '../components/ModulePage'
import { MCQ, ModuleAssessment } from '../components/CourseInteractions'

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'AI Use and Compliance Fundamentals',
    duration: '9 min',
    type: 'video',
    status: 'current',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag video">Video</span>
          <span className="tag neutral">Start here</span>
        </div>

        <div className="video-placeholder">
          <div className="video-play-icon" />
          <div className="video-text-main">Compliance primer</div>
          <div className="video-text-sub">Why AI-generated finance content still needs accountable human controls</div>
        </div>

        <section className="lesson-section">
          <h3>What this module covers</h3>
          <ul>
            <li>How AI affects recordkeeping, review, suitability, and disclosure expectations.</li>
            <li>Where compliance risk appears when content is generated quickly and at scale.</li>
            <li>What good governance looks like when teams use AI-assisted drafting tools.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 2,
    title: 'Recordkeeping and Auditability',
    duration: '11 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Core skill</span>
        </div>

        <section className="lesson-section">
          <h3>Why audit trails matter</h3>
          <p>
            When AI helps create client-facing material, teams need to know what inputs were used, what the model
            produced, who reviewed it, and what changes were made before release. Without that trail, accountability gets
            fuzzy very quickly.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Practical controls</h3>
          <ul>
            <li>Store prompts, source packs, and final approved versions.</li>
            <li>Record reviewer sign-off and material edits.</li>
            <li>Make it clear when content was generated from a constrained fact set versus free-form prompting.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 3,
    title: 'Fair Presentation and Suitability',
    duration: '10 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Risk area</span>
        </div>

        <section className="lesson-section">
          <h3>Balanced does not mean vague</h3>
          <p>
            Compliance concerns often arise when an AI-generated note overemphasises upside, hides uncertainty, or uses
            generic "balanced" language that looks fair but does not accurately represent the real risk profile.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Reviewer questions</h3>
          <ul>
            <li>Does the note reflect material downside as clearly as upside?</li>
            <li>Are forward-looking statements appropriately qualified?</li>
            <li>Would the intended audience be misled by tone, omission, or framing?</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 4,
    title: 'Confidentiality, MNPI, and Prompt Safety',
    duration: '12 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Risk area</span>
        </div>

        <section className="lesson-section">
          <h3>Input risk matters too</h3>
          <p>
            Compliance risk is not only about what comes out of the model. It is also about what goes in. Teams need to
            know whether prompts or uploaded documents contain confidential information, non-public data, or client
            material that should not be exposed to a general-purpose system.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 5,
    title: 'Disclosure and Human Approval Checkpoint',
    duration: '8 min',
    type: 'quiz',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag quiz">Quiz</span>
          <span className="tag neutral">Checkpoint</span>
        </div>

        <section className="lesson-section">
          <h3>Question</h3>
          <div className="quiz-card">
            <p className="quiz-heading">Scenario</p>
            <p>
              A draft market note was generated from a source pack and lightly edited, but no reviewer recorded final
              approval before it was scheduled to send.
            </p>

            <MCQ
              question="What is the main compliance concern?"
              options={[
                { id: 'approval', label: 'There is no accountable sign-off for the released content.' },
                { id: 'length', label: 'The note might be too short for clients.' },
                { id: 'format', label: 'The source pack should have been alphabetised first.' },
              ]}
              correctId="approval"
              explanationCorrect="Right. The biggest issue is the missing approval trail and accountability gap."
              explanationWrong="Formatting is secondary here. The key compliance problem is the lack of documented review and approval."
            />
          </div>
        </section>
      </>
    ),
  },
  {
    id: 6,
    title: 'Model Governance and Control Design',
    duration: '11 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Governance</span>
        </div>

        <section className="lesson-section">
          <h3>What good governance looks like</h3>
          <p>
            Strong governance defines approved use cases, restricted inputs, required controls, escalation paths, and
            ownership. It also makes clear when a team is allowed to automate and when human review must stay decisive.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 7,
    title: 'Incident Response and Remediation',
    duration: '10 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Response</span>
        </div>

        <section className="lesson-section">
          <h3>When something goes wrong</h3>
          <p>
            If an AI-assisted note ships with a material error, teams need a clear process: contain the issue, notify the
            right stakeholders, correct the content, preserve the evidence trail, and revisit the control that failed.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 8,
    title: 'Module 5 Assessment',
    duration: '16 min',
    type: 'quiz',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag quiz">Quiz</span>
          <span className="tag neutral">Final check</span>
        </div>

        <section className="lesson-section">
          <h3>What this checks</h3>
          <ul>
            <li>Auditability and approval controls.</li>
            <li>Fair presentation and confidentiality awareness.</li>
            <li>Basic model governance and remediation judgement.</li>
          </ul>
        </section>

        <ModuleAssessment
          moduleNumber={5}
          passPercent={80}
          questions={[
            {
              id: 'q1',
              prompt: 'Why is documented reviewer sign-off important in AI-assisted content creation?',
              options: [
                { id: 'a', label: 'It creates accountability and an audit trail for release decisions.' },
                { id: 'b', label: 'It makes the note look more formal to readers.' },
                { id: 'c', label: 'It reduces the word count.' },
              ],
              correctId: 'a',
              explanation: 'Approval records are a core control for accountability and auditability.',
            },
            {
              id: 'q2',
              prompt: 'What is the main risk of putting confidential or non-public information into an unrestricted prompt?',
              options: [
                { id: 'a', label: 'Sensitive information may be exposed inappropriately.' },
                { id: 'b', label: 'The model output will always be shorter.' },
                { id: 'c', label: 'The note will be too balanced.' },
              ],
              correctId: 'a',
              explanation: 'Input handling is a compliance issue in its own right, not just an output quality issue.',
            },
            {
              id: 'q3',
              prompt: 'What is the best way to think about fair presentation in an AI-generated note?',
              options: [
                { id: 'a', label: 'It should represent both upside and material downside honestly and clearly.' },
                { id: 'b', label: 'It only matters if the note includes recommendations.' },
                { id: 'c', label: 'It means using very neutral adjectives.' },
              ],
              correctId: 'a',
              explanation: 'Fair presentation is about substance and framing, not just tone.',
            },
            {
              id: 'q4',
              prompt: 'If an AI-assisted note is sent with a material error, what should happen next?',
              options: [
                { id: 'a', label: 'Contain, correct, preserve evidence, and review the failed control.' },
                { id: 'b', label: 'Delete the note and avoid documenting the incident.' },
                { id: 'c', label: 'Blame the model and move on.' },
              ],
              correctId: 'a',
              explanation: 'A controlled response includes correction, evidence preservation, and remediation.',
            },
          ]}
        />
      </>
    ),
  },
]

export default function Module5() {
  return <ModulePage moduleTitle="Regulatory Compliance" moduleNumber={5} lessons={lessons} backPath="/course" />
}
