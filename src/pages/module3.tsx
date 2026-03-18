import ModulePage, { type Lesson } from '../components/ModulePage'
import { MCQ, ModuleAssessment } from '../components/CourseInteractions'

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'How AI Shows Up in Market Analysis',
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
          <div className="video-text-main">Market analysis walkthrough</div>
          <div className="video-text-sub">Where AI helps and where it overreaches in market commentary</div>
        </div>

        <section className="lesson-section">
          <h3>What this module focuses on</h3>
          <ul>
            <li>Using AI to summarise market moves without losing the underlying mechanics.</li>
            <li>Separating legitimate pattern recognition from overly tidy storytelling.</li>
            <li>Reviewing macro and market notes when the model sounds confident but the evidence is thin.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>The core challenge</h3>
          <p>
            Market analysis often invites plausible narration. Rates move, FX reacts, equities rotate, and a model can
            quickly produce a clean story tying all of it together. The problem is that financial markets frequently move
            for mixed reasons, and a neat explanation can hide uncertainty rather than clarify it.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 2,
    title: 'Signal Versus Story in Macro Commentary',
    duration: '11 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Core concept</span>
        </div>

        <section className="lesson-section">
          <h3>Why narratives can run ahead of evidence</h3>
          <p>
            Financial commentary becomes risky when the story is stronger than the observable signal. A sharp move in
            yields might coincide with an inflation release, but that does not prove the entire move was caused by one
            data point.
          </p>
          <p>
            Reviewers should ask whether the note distinguishes between what happened, what traders said may have driven
            it, and what the analyst believes the broader implication might be.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Useful review prompts</h3>
          <ul>
            <li>Is the market move described with actual numbers and time windows?</li>
            <li>Does the note label trader interpretation as interpretation, rather than fact?</li>
            <li>Are competing explanations acknowledged where appropriate?</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 3,
    title: 'Scenario Framing Without False Certainty',
    duration: '9 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Core concept</span>
        </div>

        <section className="lesson-section">
          <h3>Good scenario writing</h3>
          <p>
            Good analysts lay out paths, probabilities, and conditions. Weak AI-generated notes often collapse that into
            a single, smooth base case that reads as inevitable.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Better wording patterns</h3>
          <ul>
            <li>Use "if this continues" rather than implying an outcome is locked in.</li>
            <li>Anchor the scenario to a catalyst such as payrolls, CPI, or guidance language.</li>
            <li>State what would invalidate the scenario.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 4,
    title: 'Quick Check: Does This Market Note Overstate the Case?',
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
            <p className="quiz-heading">Snippet</p>
            <p>
              The central bank’s tone clearly confirms a June cut, and today’s equity rebound reflects broad market
              confidence that policy easing is now unavoidable.
            </p>

            <MCQ
              question="What is the biggest issue with this note?"
              options={[
                { id: 'certainty', label: 'It presents a probabilistic outcome as if it were certain.' },
                { id: 'length', label: 'It should be split into two shorter sentences.' },
                { id: 'style', label: 'It needs more energetic wording.' },
              ]}
              correctId="certainty"
              explanationCorrect="Exactly. The note overstates certainty and attributes a single, definite interpretation to a market move that is usually more conditional."
              explanationWrong="The main risk is overconfidence, not style. Macro notes should preserve uncertainty when the evidence is not definitive."
            />
          </div>
        </section>
      </>
    ),
  },
  {
    id: 5,
    title: 'Alternative Data, Bias, and Coverage Gaps',
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
          <h3>Why input quality matters</h3>
          <p>
            AI tools used for market analysis often blend structured market data with commentary, news, and alternative
            signals. If those inputs are biased, stale, or unevenly distributed across regions and sectors, the output
            can look sophisticated while still being directionally wrong.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Common blind spots</h3>
          <ul>
            <li>Models leaning too heavily on US market patterns when explaining global moves.</li>
            <li>Thin coverage in smaller sectors leading to generic conclusions.</li>
            <li>Alternative data being treated as representative when it is only partial.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 6,
    title: 'Human Oversight in Daily Market Wraps',
    duration: '11 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Workflow</span>
          <span className="tag neutral">Practice</span>
        </div>

        <section className="lesson-section">
          <h3>Where humans add the most value</h3>
          <p>
            In daily market wraps, the highest-value human intervention is not rewriting every line. It is checking
            causality, stress-testing certainty, and ensuring the note actually reflects the market texture of the day.
          </p>
        </section>

        <section className="lesson-section">
          <h3>A simple review sequence</h3>
          <ul>
            <li>Check the market facts first: levels, changes, and time window.</li>
            <li>Review the causal language second: what evidence supports the explanation?</li>
            <li>Then refine tone so the note reads cleanly without overstating the case.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 7,
    title: 'Module 3 Assessment',
    duration: '17 min',
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
            <li>Signal versus story in market notes.</li>
            <li>Avoiding false certainty in scenario writing.</li>
            <li>Knowing where oversight matters most in AI-assisted macro commentary.</li>
          </ul>
        </section>

        <ModuleAssessment
          moduleNumber={3}
          passPercent={80}
          questions={[
            {
              id: 'q1',
              prompt: 'Which statement is the best example of false certainty?',
              options: [
                { id: 'a', label: 'Markets appear to be leaning toward a June cut, pending incoming data.' },
                { id: 'b', label: 'Today’s price action clearly guarantees a June cut.' },
                { id: 'c', label: 'Traders discussed a range of possible policy paths.' },
              ],
              correctId: 'b',
              explanation: 'It converts a probabilistic market view into an absolute conclusion.',
            },
            {
              id: 'q2',
              prompt: 'What should a reviewer check first in a daily market wrap?',
              options: [
                { id: 'a', label: 'The factual market moves and time window described.' },
                { id: 'b', label: 'Whether the adjectives feel lively enough.' },
                { id: 'c', label: 'Whether the note has enough paragraphs.' },
              ],
              correctId: 'a',
              explanation: 'The facts provide the base layer. If those are off, the analysis built on them is unsafe.',
            },
            {
              id: 'q3',
              prompt: 'What is the strongest sign that a market note is leaning too hard on narrative?',
              options: [
                { id: 'a', label: 'It acknowledges multiple explanations for the move.' },
                { id: 'b', label: 'It offers a single tidy cause without enough supporting evidence.' },
                { id: 'c', label: 'It includes both prices and yields.' },
              ],
              correctId: 'b',
              explanation: 'A clean single-cause story can be appealing, but markets often move for mixed reasons.',
            },
            {
              id: 'q4',
              prompt: 'Why can alternative data create risk in AI-generated market analysis?',
              options: [
                { id: 'a', label: 'Because partial or biased data can look representative when it is not.' },
                { id: 'b', label: 'Because alternative data should never be used.' },
                { id: 'c', label: 'Because it makes reports too technical.' },
              ],
              correctId: 'a',
              explanation: 'The risk is overgeneralising from incomplete or skewed input data.',
            },
          ]}
        />
      </>
    ),
  },
]

export default function Module3() {
  return <ModulePage moduleTitle="AI in Market Analysis" moduleNumber={3} lessons={lessons} backPath="/course" />
}
