import ModulePage, { type Lesson } from '../components/ModulePage'
import { MCQ, ModuleAssessment } from '../components/CourseInteractions'
import { financeCourseSlug } from '../lib/courseProgress'

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Case Study Framework for AI Review',
    duration: '10 min',
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
          <div className="video-text-main">Capstone framework</div>
          <div className="video-text-sub">How to analyse an AI-content failure from source to release control</div>
        </div>

        <section className="lesson-section">
          <h3>What this module does</h3>
          <ul>
            <li>Pulls together the detection, verification, and compliance ideas from earlier modules.</li>
            <li>Uses realistic case studies rather than isolated single-skill examples.</li>
            <li>Ends with a capstone-style assessment focused on judgment and workflow.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 2,
    title: 'Case Study: Sell-Side Note With Invented Drivers',
    duration: '12 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Case study</span>
          <span className="tag neutral">Analysis</span>
        </div>

        <section className="lesson-section">
          <h3>Scenario</h3>
          <p>
            A model-generated earnings recap correctly states the headline numbers but invents a tidy narrative about
            segment mix and pricing discipline. The note reads well, and the invented drivers are close enough to sound
            plausible unless someone checks the deck closely.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Lessons from the case</h3>
          <ul>
            <li>Correct totals do not guarantee safe reasoning.</li>
            <li>Invented drivers often appear where templates expect explanation, but the source does not provide one.</li>
            <li>Reviewers need a habit of checking narrative claims, not just numeric accuracy.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 3,
    title: 'Case Study: Internal Market Recap Under Time Pressure',
    duration: '11 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Case study</span>
          <span className="tag neutral">Analysis</span>
        </div>

        <section className="lesson-section">
          <h3>Scenario</h3>
          <p>
            An internal desk recap is generated minutes before a meeting. The prices and market moves are mostly right,
            but the summary attributes the entire move to one macro release and ignores the fact that positioning and an
            earlier central-bank interview were also part of the picture.
          </p>
        </section>

        <section className="lesson-section">
          <h3>What the reviewer should do</h3>
          <p>
            Keep the useful factual summary, but soften the causal claims and add the uncertainty or alternative drivers
            that traders were actually discussing.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 4,
    title: 'Checkpoint: Client Newsletter Red Flags',
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
            <p className="quiz-heading">Newsletter excerpt</p>
            <p>
              Management’s strategic repositioning clearly unlocked broad-based demand recovery, proving the business is
              now entering a structurally higher-growth phase.
            </p>

            <MCQ
              question="What is the clearest concern?"
              options={[
                { id: 'causal', label: 'It makes strong causal and forward-looking claims without enough evidence.' },
                { id: 'short', label: 'It is too short to be useful.' },
                { id: 'simple', label: 'It should use more technical terminology.' },
              ]}
              correctId="causal"
              explanationCorrect="Exactly. The excerpt overstates both causality and future certainty without grounding them in specific evidence."
              explanationWrong="The problem is not brevity or technical depth. It is unsupported causal and forward-looking language."
            />
          </div>
        </section>
      </>
    ),
  },
  {
    id: 5,
    title: 'Redesigning a Safer Workflow',
    duration: '13 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Workflow</span>
          <span className="tag neutral">Practice</span>
        </div>

        <section className="lesson-section">
          <h3>From failure to better process</h3>
          <p>
            Good post-mortems do more than identify the bad sentence. They ask what upstream control, prompt design,
            source discipline, or review habit would have prevented the issue from surviving to publication.
          </p>
        </section>

        <section className="lesson-section">
          <h3>High-value control improvements</h3>
          <ul>
            <li>Constrain model drafting to verified fact packs.</li>
            <li>Require sign-off on narrative claims, not just figures.</li>
            <li>Use checklists that force reviewers to inspect the riskiest failure modes first.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 6,
    title: 'Team Checklist and Operating Norms',
    duration: '10 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Toolkit</span>
          <span className="tag neutral">Practice</span>
        </div>

        <section className="lesson-section">
          <h3>What good teams standardise</h3>
          <ul>
            <li>When AI can be used for first draft generation.</li>
            <li>Which claims always require source linkage or recomputation.</li>
            <li>What language needs qualification before release.</li>
            <li>How reviewers escalate ambiguous or unsourced content quickly.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 7,
    title: 'Module 6 Capstone Assessment',
    duration: '18 min',
    type: 'quiz',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag quiz">Quiz</span>
          <span className="tag neutral">Capstone</span>
        </div>

        <section className="lesson-section">
          <h3>What this checks</h3>
          <ul>
            <li>Applying source, narrative, and compliance judgement together.</li>
            <li>Choosing the best workflow fix, not just spotting the bad sentence.</li>
            <li>Recognising when a polished AI draft still needs escalation.</li>
          </ul>
        </section>

        <ModuleAssessment
          moduleNumber={6}
          courseSlug={financeCourseSlug}
          passPercent={80}
          questions={[
            {
              id: 'q1',
              prompt: 'A draft has correct headline figures but unsupported narrative drivers. What is the best classification?',
              options: [
                { id: 'a', label: 'Lower numeric risk, but still unsafe without narrative verification.' },
                { id: 'b', label: 'Safe to publish because the totals are right.' },
                { id: 'c', label: 'Only a formatting issue.' },
              ],
              correctId: 'a',
              explanation: 'Correct numbers do not make unsupported reasoning safe.',
            },
            {
              id: 'q2',
              prompt: 'Which control improvement is most likely to prevent repeated hallucinated drivers?',
              options: [
                { id: 'a', label: 'Draft only from a verified fact pack and require reviewer sign-off on causality.' },
                { id: 'b', label: 'Ask the model to sound less confident.' },
                { id: 'c', label: 'Make every note longer.' },
              ],
              correctId: 'a',
              explanation: 'Constraining inputs and reviewing causal claims directly targets the failure mode.',
            },
            {
              id: 'q3',
              prompt: 'What should a strong post-mortem focus on after an AI content incident?',
              options: [
                { id: 'a', label: 'Which control, workflow, or governance gap allowed the issue through.' },
                { id: 'b', label: 'Which employee to blame first.' },
                { id: 'c', label: 'How to hide the original draft.' },
              ],
              correctId: 'a',
              explanation: 'The goal is remediation and prevention, not just blame.',
            },
            {
              id: 'q4',
              prompt: 'When is escalation the best choice?',
              options: [
                { id: 'a', label: 'When a claim is material, unsourced, or too ambiguous to clear safely in time.' },
                { id: 'b', label: 'Only when there is a spelling mistake.' },
                { id: 'c', label: 'Never, if the note reads professionally.' },
              ],
              correctId: 'a',
              explanation: 'Material uncertainty or weak sourcing should trigger escalation rather than quiet publication.',
            },
          ]}
        />
      </>
    ),
  },
]

export default function Module6() {
  return (
    <ModulePage
      moduleTitle="Case Studies and Applications"
      moduleNumber={6}
      lessons={lessons}
      backPath="/course"
      courseSlug={financeCourseSlug}
    />
  )
}
