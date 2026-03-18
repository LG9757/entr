import ModulePage, { type Lesson } from '../components/ModulePage'
import { MCQ, ModuleAssessment } from '../components/CourseInteractions'

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Building a Source-First Review Habit',
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
          <div className="video-text-main">Review workflow walkthrough</div>
          <div className="video-text-sub">Source-first checking for AI-assisted finance notes</div>
        </div>

        <section className="lesson-section">
          <h3>What this lesson sets up</h3>
          <ul>
            <li>Why source-tracing should happen before style edits or formatting.</li>
            <li>How to separate verified facts, model-generated language, and analyst judgement.</li>
            <li>A quick review sequence that works under desk-level time pressure.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>The source-first mindset</h3>
          <p>
            AI-generated finance writing often sounds polished before it is trustworthy. A source-first workflow flips
            the instinct: first prove the facts, then improve the prose.
          </p>
          <p>
            In practice that means building a habit of asking three questions early: what document supports this claim,
            what exact figure is being referenced, and whether the narrative is stronger than the evidence behind it.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 2,
    title: 'Triangulating Claims Against Source Documents',
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
          <h3>The three-source check</h3>
          <p>
            Strong reviewers do not rely on a single source when the claim matters. They triangulate across the core
            financial statement, management commentary, and any supporting slide or appendix material.
          </p>
          <ul>
            <li>The statement tells you whether the number itself exists.</li>
            <li>The transcript or commentary explains what management says drove the move.</li>
            <li>The slide deck often provides segment or regional detail needed for attribution.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>When a claim should make you pause</h3>
          <p>
            The risk rises when a sentence combines a precise number with an interpretation, such as stating that a
            specific region drove a precise percentage of growth. That kind of sentence needs a source and often a quick
            recomputation, not just a glance.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 3,
    title: 'Spotting Numeric Drift and Unit Errors',
    duration: '10 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Core skill</span>
        </div>

        <section className="lesson-section">
          <h3>Why numeric drift is common</h3>
          <p>
            AI drafts often repeat the same figure several times. Each repetition creates a chance for drift: a changed
            time period, swapped unit, slightly altered percentage, or confused basis point reference.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Common failure modes</h3>
          <ul>
            <li>Quarterly figures quietly becoming annual figures in a later paragraph.</li>
            <li>Percent, percentage point, and basis point language being used interchangeably.</li>
            <li>Constant-currency commentary being rewritten as reported growth.</li>
            <li>Rounded numbers no longer matching the explanation attached to them.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>Safe reviewer move</h3>
          <p>
            Build a mini inventory of every number in the draft. If two sentences reference the same metric, make sure
            the unit, time window, and denominator are identical before you let the note move forward.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 4,
    title: 'Quick Check: Which Claim Needs Proof First?',
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
          <h3>How to approach this check</h3>
          <ul>
            <li>Prioritise the claim with the highest downside if it is wrong.</li>
            <li>Precise attributions usually deserve immediate source review.</li>
            <li>Ask whether the sentence contains both a number and a causal story.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>Question 1 of 2</h3>
          <div className="quiz-card">
            <p className="quiz-heading">Draft sentence</p>
            <p>
              Revenue increased 14% year over year, with 60% of the improvement driven by pricing in North America.
            </p>

            <MCQ
              question="What is the most important first action?"
              options={[
                { id: 'style', label: 'Improve the wording so it reads more naturally.' },
                { id: 'source', label: 'Find the support for the 60% pricing attribution.' },
                { id: 'shorten', label: 'Shorten the sentence to make it easier to read.' },
              ]}
              correctId="source"
              explanationCorrect="Exactly. The pricing attribution is precise and potentially high-risk, so it needs an explicit source or recomputation before anything else."
              explanationWrong="The wording can wait. The main risk is the precise attribution to pricing and region, which must be source-checked first."
            />
          </div>
        </section>

        <section className="lesson-section">
          <h3>Question 2 of 2</h3>
          <div className="quiz-card">
            <p className="quiz-heading">Draft sentence</p>
            <p>
              Gross margin expanded by 150 bps to 38%, reflecting disciplined execution and a healthier category mix.
            </p>

            <MCQ
              question="What subtle risk is most worth checking?"
              options={[
                { id: 'units', label: 'Whether the 150 bps change actually matches the underlying margin math.' },
                { id: 'length', label: 'Whether the sentence should be split into two shorter sentences.' },
                { id: 'tone', label: 'Whether the phrase disciplined execution sounds too formal.' },
              ]}
              correctId="units"
              explanationCorrect="Right. Basis point changes often get misstated, so recomputing the margin movement is the safest check."
              explanationWrong="The highest-value check here is the unit math. Basis point slips can look small but materially distort meaning."
            />
          </div>
        </section>
      </>
    ),
  },
  {
    id: 5,
    title: 'Separating Facts, Interpretation, and Speculation',
    duration: '12 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Framework</span>
        </div>

        <section className="lesson-section">
          <h3>Three layers in a finance note</h3>
          <p>
            Good market commentary usually blends three things: verified facts, analyst interpretation, and forward
            judgement. Problems appear when AI-generated drafts collapse those layers into a single confident paragraph.
          </p>
          <ul>
            <li>Facts are observable and sourceable.</li>
            <li>Interpretation explains what the facts may mean.</li>
            <li>Speculation reaches into what could happen next.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>What a reviewer should rewrite</h3>
          <p>
            Rewrite when a draft presents speculation as if it were a settled fact. Phrases like "this trend should
            continue" or "the market will reward the company" need stronger support or more careful qualification.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 6,
    title: 'Desk Exercise: Review a Short Earnings Note',
    duration: '14 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Exercise</span>
          <span className="tag neutral">Practice</span>
        </div>

        <section className="lesson-section">
          <h3>Scenario</h3>
          <p>
            You have ten minutes before distribution. A model-generated earnings summary has already been drafted and a
            senior reviewer wants the two or three highest-risk issues, not a line edit of everything.
          </p>
        </section>

        <section className="lesson-section">
          <h3>What you should surface first</h3>
          <ul>
            <li>Any precise number or attribution that you cannot trace.</li>
            <li>Any mismatch between stated drivers and the disclosed segment detail.</li>
            <li>Any future-looking claim that overstates certainty relative to management guidance.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>Useful escalation language</h3>
          <p>
            A good escalation is short and specific: "Revenue figure checks out, but the claim that Europe drove half of
            incremental growth is not supported by the deck or transcript. Recommend removing until verified."
          </p>
        </section>
      </>
    ),
  },
  {
    id: 7,
    title: 'Red Flags in Tone and Structure',
    duration: '9 min',
    type: 'quiz',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag quiz">Quiz</span>
          <span className="tag neutral">Practice</span>
        </div>

        <section className="lesson-section">
          <h3>Question</h3>
          <div className="quiz-card">
            <p className="quiz-heading">Snippet</p>
            <p>
              The quarter reflected solid execution, resilient demand, balanced performance across key segments, and a
              constructive outlook supported by ongoing strategic momentum.
            </p>

            <MCQ
              question="What is the clearest red flag in this snippet?"
              options={[
                { id: 'generic', label: 'It sounds polished but contains no concrete, checkable detail.' },
                { id: 'negative', label: 'It is too negative for a client note.' },
                { id: 'technical', label: 'It uses language that is too technical for finance readers.' },
              ]}
              correctId="generic"
              explanationCorrect="Yes. The sentence is made of broad positive signals with no metric, no source, and no company-specific evidence."
              explanationWrong="The main issue is not sentiment or complexity. It is that the sentence is almost entirely generic filler."
            />
          </div>
        </section>
      </>
    ),
  },
  {
    id: 8,
    title: 'Module 2 Assessment',
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
          <h3>What this assessment covers</h3>
          <ul>
            <li>Source-tracing the riskiest parts of an AI-assisted note.</li>
            <li>Recognising unit drift, weak evidence, and overconfident narrative.</li>
            <li>Choosing the safest review action under limited time.</li>
          </ul>
        </section>

        <ModuleAssessment
          moduleNumber={2}
          passPercent={80}
          questions={[
            {
              id: 'q1',
              prompt: 'Which claim deserves immediate verification before stylistic edits?',
              options: [
                { id: 'a', label: 'The note uses the word resilient twice.' },
                { id: 'b', label: 'The draft says APAC drove 52% of incremental growth.' },
                { id: 'c', label: 'The conclusion paragraph feels too long.' },
              ],
              correctId: 'b',
              explanation: 'Precise contribution claims are high-risk and must be sourced or recomputed.',
            },
            {
              id: 'q2',
              prompt: 'What is the safest response to a basis point claim you did not compute yourself?',
              options: [
                { id: 'a', label: 'Recalculate the margin move from the underlying figures.' },
                { id: 'b', label: 'Leave it if the sentence sounds reasonable.' },
                { id: 'c', label: 'Convert it to a percentage to simplify the note.' },
              ],
              correctId: 'a',
              explanation: 'Unit mistakes are easy to miss, so recomputation is the safest check.',
            },
            {
              id: 'q3',
              prompt: 'A paragraph contains only broad praise with no numbers or sources. How should you classify it?',
              options: [
                { id: 'a', label: 'Low-risk filler that still needs evidence before publication.' },
                { id: 'b', label: 'Safe because it contains no figures.' },
                { id: 'c', label: 'Preferable to specific language because it is flexible.' },
              ],
              correctId: 'a',
              explanation: 'Even without numbers, generic filler can mislead by implying analysis without supporting detail.',
            },
            {
              id: 'q4',
              prompt: 'What is the best review order under time pressure?',
              options: [
                { id: 'a', label: 'Tone, formatting, then numbers.' },
                { id: 'b', label: 'Numbers and sources first, then reasoning and wording.' },
                { id: 'c', label: 'Headline first, then visual polish.' },
              ],
              correctId: 'b',
              explanation: 'Fact risk should be reduced before time is spent polishing presentation.',
            },
            {
              id: 'q5',
              prompt: 'Why is a future-looking sentence like "this trend should continue" risky?',
              options: [
                { id: 'a', label: 'It may present speculation as if it were evidence-backed fact.' },
                { id: 'b', label: 'It is always illegal to write forward-looking commentary.' },
                { id: 'c', label: 'It makes the note too short.' },
              ],
              correctId: 'a',
              explanation: 'Forward-looking language needs qualification and support, especially in high-stakes commentary.',
            },
          ]}
        />
      </>
    ),
  },
]

export default function Module2() {
  return (
    <ModulePage
      moduleTitle="Detecting AI-Generated Reports"
      moduleNumber={2}
      lessons={lessons}
      backPath="/course"
    />
  )
}
