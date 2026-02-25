import ModulePage, { type Lesson } from '../components/ModulePage'

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'What is AI in Finance?',
    duration: '8 min',
    type: 'video',
    status: 'current',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag">video</span>
          <span className="tag success">Completed</span>
        </div>

        <h2 className="lesson-title">What is AI in Finance?</h2>

        <div className="video-placeholder">
          <div className="video-play-icon">▶︎</div>
          <div className="video-text-main">Video Player Placeholder</div>
          <div className="video-text-sub">What is AI in Finance?</div>
        </div>

        <section className="lesson-section">
          <h3>What you&apos;ll learn</h3>
          <ul>
            <li>How AI is used across trading, risk, compliance, and client services.</li>
            <li>The difference between traditional automation and modern machine learning.</li>
            <li>Key benefits and risks of AI in financial decision‑making.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 2,
    title: 'How AI Generates Financial Content',
    duration: '12 min',
    type: 'article',
    status: 'completed',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag">article</span>
          <span className="tag success">Completed</span>
        </div>

        <h2 className="lesson-title">How AI Generates Financial Content</h2>

        <section className="lesson-section">
          <p>
            Modern language models can generate earnings summaries, market commentary,
            and analyst‑style insights from structured data such as price feeds or
            financial statements.
          </p>
          <p>
            They learn patterns from large corpora of historical reports and use
            probabilistic predictions to generate new text that mimics this style.
          </p>
          <p>
            In finance, this enables rapid scaling of commentary but also introduces
            risks such as hallucinated figures, over‑confident tone, and subtle bias.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Key signals of AI‑generated content</h3>
          <ul>
            <li>Overly generic language that could apply to many different companies.</li>
            <li>Inconsistent numbers across paragraphs or versus source data.</li>
            <li>Repetitive phrases and transitions reused throughout a document.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 3,
    title: 'Common AI Patterns in Reports',
    duration: '10 min',
    type: 'article',
    status: 'completed',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag">article</span>
          <span className="tag success">Completed</span>
        </div>

        <h2 className="lesson-title">Common AI Patterns in Reports</h2>

        <section className="lesson-section">
          <p>
            When AI writes financial text, it often follows safe templates—for example,
            opening with upbeat macro context and then repeating the same structure
            for revenue, margins, and outlook.
          </p>
          <p>
            Spotting these templates helps identify sections that were likely generated
            and need closer verification.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 4,
    title: 'Quick Check: Real or AI Report?',
    duration: '8 min',
    type: 'quiz',
    status: 'current',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag">image‑quiz</span>
          <span className="tag neutral">Score: 0/2</span>
        </div>

        <h2 className="lesson-title">Quick Check: Real or AI Report?</h2>

        <section className="lesson-section">
          <h3>Question 1 of 2</h3>
          <div className="quiz-card">
            <p className="quiz-heading">Q3 2024 Financial Summary</p>
            <p>Revenue: $4.2B (+15% YoY)</p>
            <p>Operating Income: $890M (+8% YoY)</p>
            <p>Net Margin: 21.2%</p>
            <p>
              The company demonstrated robust performance in Q3, with revenue growth
              accelerating across all major segments. Digital transformation initiatives
              contributed approximately 40% of the incremental revenue.
            </p>
          </div>

          <p className="quiz-question">
            Is this report written by a human analyst or AI‑generated?
          </p>

          <div className="quiz-options">
            <button className="quiz-option">Human Analyst</button>
            <button className="quiz-option">AI Generated</button>
          </div>
        </section>
      </>
    ),
  },
  {
    id: 5,
    title: 'Identifying Generic Analysis',
    duration: '10 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag">article</span>
          <span className="tag neutral">Locked preview</span>
        </div>

        <h2 className="lesson-title">Identifying Generic Analysis</h2>

        <section className="lesson-section">
          <p>
            This lesson walks through side‑by‑side examples of specific vs generic
            commentary, showing where AI tends to gloss over company‑specific details.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 6,
    title: 'Module 1 Assessment',
    duration: '15 min',
    type: 'quiz',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag">quiz</span>
          <span className="tag neutral">Locked</span>
        </div>

        <h2 className="lesson-title">Module 1 Assessment</h2>

        <section className="lesson-section">
          <p>
            A short assessment to check your understanding before moving on to detection
            techniques in Module 2.
          </p>
        </section>
      </>
    ),
  },
]

export default function Module1() {
  return (
    <ModulePage
      moduleTitle="Introduction to AI in Finance"
      moduleNumber={1}
      lessons={lessons}
      backPath="/course"
    />
  )
}

