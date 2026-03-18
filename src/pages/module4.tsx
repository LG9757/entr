import ModulePage, { type Lesson } from '../components/ModulePage'
import { MCQ, ModuleAssessment } from '../components/CourseInteractions'

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'Anatomy of Suspicious Financial News',
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
          <div className="video-text-main">News verification overview</div>
          <div className="video-text-sub">How false or distorted finance stories usually show up</div>
        </div>

        <section className="lesson-section">
          <h3>What makes finance news risky</h3>
          <ul>
            <li>False headlines can move prices before verification catches up.</li>
            <li>AI tools can repackage weak sourcing into confident summaries very quickly.</li>
            <li>Even partly true stories can be misleading if the context is wrong or incomplete.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>The reviewer’s job</h3>
          <p>
            You do not need to solve the whole story immediately. You need to establish whether the headline is sourced,
            current, and consistent with what the underlying documents or reputable outlets actually say.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 2,
    title: 'Source Provenance and Outlet Credibility',
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
          <h3>Start with origin, not virality</h3>
          <p>
            The first useful question is not how widely a story is being shared. It is where the claim originated. A
            reposted headline, screenshot, or paraphrased social post is not the same thing as a reliable primary source.
          </p>
        </section>

        <section className="lesson-section">
          <h3>What to look for</h3>
          <ul>
            <li>Named outlet or document rather than "reports suggest".</li>
            <li>Clear publication time and author trail.</li>
            <li>Evidence that the summary matches the underlying article, filing, or release.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 3,
    title: 'Timestamp, Context, and Recirculated Stories',
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
          <h3>Old stories, new market impact</h3>
          <p>
            One of the most common failure modes in fast-moving environments is recirculation. An old report, quote, or
            rumour is reshared without its original timestamp, and an AI summary rewrites it as if it were new.
          </p>
        </section>

        <section className="lesson-section">
          <h3>How to catch it</h3>
          <ul>
            <li>Check whether the document date and the market reaction line up.</li>
            <li>Look for references to stale guidance, old board decisions, or outdated price levels.</li>
            <li>Confirm that the article is not summarising historical reporting as current news.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 4,
    title: 'Quote Verification Checkpoint',
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
            <p className="quiz-heading">Headline summary</p>
            <p>
              The CEO said the firm expects "record profitability next quarter," according to reports following the
              results call.
            </p>

            <MCQ
              question="What should you do before repeating that quote?"
              options={[
                { id: 'verify', label: 'Locate the original transcript or recording and confirm the wording.' },
                { id: 'rewrite', label: 'Paraphrase it to sound safer without checking the source.' },
                { id: 'post', label: 'Repeat it if several secondary outlets use similar wording.' },
              ]}
              correctId="verify"
              explanationCorrect="Yes. Direct quotes and quote-like paraphrases should be checked against the original transcript whenever possible."
              explanationWrong="Second-hand repetition is not enough. The safest move is to verify the quote against the original source."
            />
          </div>
        </section>
      </>
    ),
  },
  {
    id: 5,
    title: 'Cross-Market Reaction as a Sanity Check',
    duration: '10 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Technique</span>
        </div>

        <section className="lesson-section">
          <h3>Why market reaction helps</h3>
          <p>
            Cross-market reaction is not proof, but it can be a useful sanity check. If a headline claims a dramatic
            policy or earnings surprise and yet closely related assets barely move, that mismatch should trigger a closer
            look.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Use this carefully</h3>
          <ul>
            <li>Do not treat market reaction as the only validator.</li>
            <li>Use it to prioritise verification when a story seems materially important.</li>
            <li>Consider timing, liquidity, and whether the information was already expected.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 6,
    title: 'Escalation Playbook for Dubious Headlines',
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
          <h3>What a strong escalation sounds like</h3>
          <p>
            A strong escalation is short, evidence-based, and actionable: "The claim appears to derive from a reposted
            excerpt rather than the original filing. Timestamp is stale and we have not verified the quote. Recommend we
            hold distribution until source confirmation."
          </p>
        </section>
      </>
    ),
  },
  {
    id: 7,
    title: 'Module 4 Assessment',
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
            <li>Primary versus secondary sourcing.</li>
            <li>Detecting stale or recirculated stories.</li>
            <li>Knowing when to escalate instead of forwarding a headline.</li>
          </ul>
        </section>

        <ModuleAssessment
          moduleNumber={4}
          passPercent={80}
          questions={[
            {
              id: 'q1',
              prompt: 'What is the best first question when reviewing a dramatic finance headline?',
              options: [
                { id: 'a', label: 'Where did the claim originate?' },
                { id: 'b', label: 'How many reposts does it have?' },
                { id: 'c', label: 'Can it be shortened?' },
              ],
              correctId: 'a',
              explanation: 'Origin matters more than reach. You need to know whether the claim comes from a credible primary source.',
            },
            {
              id: 'q2',
              prompt: 'Why are recirculated stories dangerous?',
              options: [
                { id: 'a', label: 'They can be rewritten as current news even when the source is old.' },
                { id: 'b', label: 'They are always illegal to share.' },
                { id: 'c', label: 'They usually contain too many numbers.' },
              ],
              correctId: 'a',
              explanation: 'The main risk is stale context being mistaken for fresh information.',
            },
            {
              id: 'q3',
              prompt: 'How should you handle a quote carried by secondary reports?',
              options: [
                { id: 'a', label: 'Verify it against the original transcript or recording if possible.' },
                { id: 'b', label: 'Assume it is fine if several outlets repeat it.' },
                { id: 'c', label: 'Rewrite it into indirect speech and move on.' },
              ],
              correctId: 'a',
              explanation: 'Direct quote verification is a high-value control in news authentication.',
            },
            {
              id: 'q4',
              prompt: 'What does weak or absent market reaction tell you about a dramatic story?',
              options: [
                { id: 'a', label: 'It can be a useful prompt to verify the story more carefully.' },
                { id: 'b', label: 'It proves the story is false.' },
                { id: 'c', label: 'It means the story should be rewritten in stronger language.' },
              ],
              correctId: 'a',
              explanation: 'It is not proof, but it can be a helpful sanity check when prioritising review.',
            },
          ]}
        />
      </>
    ),
  },
]

export default function Module4() {
  return (
    <ModulePage
      moduleTitle="Financial News Authentication"
      moduleNumber={4}
      lessons={lessons}
      backPath="/course"
    />
  )
}
