import React, { useId, useState } from 'react'
import ModulePage, { type Lesson } from '../components/ModulePage'

type MCQOption = { id: string; label: string }

function MCQ({
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
        {options.map(opt => {
          const isSelected = selected === opt.id

          const stateClass =
            !answered
              ? ''
              : opt.id === correctId
                ? 'mcq-opt-correct'
                : isSelected
                  ? 'mcq-opt-wrong'
                  : 'mcq-opt-muted'

          return (
            <label
              key={opt.id}
              className={['mcq-option', stateClass, isSelected ? 'mcq-opt-selected' : ''].join(' ')}
            >
              <input
                type="radio"
                name={group}
                value={opt.id}
                checked={isSelected}
                onChange={() => setSelected(opt.id)}
              />
              <span>{opt.label}</span>
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

const lessons: Lesson[] = [
  {
    id: 1,
    title: 'What is AI in Finance?',
    duration: '8 min',
    type: 'video',
    status: 'completed',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag video">Video</span>
          <span className="tag success">Completed</span>
        </div>

        <h2 className="lesson-title">What is AI in Finance?</h2>

        <div className="video-placeholder">
          <div className="video-play-icon" />
          <div className="video-text-main">Video Player Placeholder</div>
          <div className="video-text-sub">What is AI in Finance?</div>
        </div>

        <section className="lesson-section">
          <h3>What you&apos;ll learn</h3>
          <ul>
            <li>Where AI is used across trading, risk, compliance, operations, and client services.</li>
            <li>The difference between rules-based automation and modern machine learning.</li>
            <li>Why good outputs can still be wrong, and how to think about risk.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>AI vs automation: quick mental model</h3>
          <p>
            Traditional automation follows explicit rules (if X then Y). Modern ML learns statistical patterns from data,
            which is powerful—but can fail in surprising ways when the world shifts.
          </p>
          <p>
            In finance, this matters because markets change, data is noisy, and small errors can scale quickly when
            content is generated at volume.
          </p>
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
          <span className="tag article">Article</span>
          <span className="tag success">Completed</span>
        </div>

        <h2 className="lesson-title">How AI Generates Financial Content</h2>

        <section className="lesson-section">
          <h3>From raw data to readable text</h3>
          <p>
            Modern language models can generate earnings summaries, market commentary, and analyst-style insights from
            structured data such as price feeds, financial statements, and guidance transcripts.
          </p>
          <p>
            They learn patterns from large corpora of historical reports and use probabilistic predictions to generate
            new text that mimics the style—token by token.
          </p>
          <p>
            In finance, this enables scaling commentary across thousands of tickers and events, far beyond what a human
            research team could cover manually.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Where the model gets its voice</h3>
          <p>
            Tone and structure come from training examples: if the dataset is formal equity research, outputs often sound
            cautious and “balanced”.
          </p>
          <p>
            Prompts and templates can hard-code an outline (revenue → margins → outlook → risks), which improves
            consistency but can also hide shallow reasoning.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Key signals of AI-generated content</h3>
          <ul>
            <li>Generic statements that could apply to many companies.</li>
            <li>Inconsistent numbers across paragraphs or versus source data.</li>
            <li>Repetitive transitions and symmetrical paragraph structure.</li>
            <li>Confident tone attached to vague evidence.</li>
            <li>Suspiciously perfect formatting across sections.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>Why this matters for you</h3>
          <p>
            The goal isn’t to “ban AI”—it’s to learn where it helps (speed, coverage, consistency) and where it needs
            guardrails (numerical accuracy, nuance, and accountability).
          </p>
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
          <span className="tag article">Article</span>
          <span className="tag success">Completed</span>
        </div>

        <h2 className="lesson-title">Common AI Patterns in Reports</h2>

        <section className="lesson-section">
          <h3>Template-driven structure</h3>
          <p>
            AI-generated financial writing often follows safe templates: upbeat macro context, then a familiar loop of
            revenue, margins, and outlook.
          </p>
          <p>
            This is great for readability, but it can disguise weak company-specific reasoning—especially when the model
            “fills” sections to match the template.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Language ticks to watch for</h3>
          <ul>
            <li>Repeated openers like “robust performance” or “mixed but improving trends”.</li>
            <li>Perfectly balanced pros/cons paragraphs that look too symmetric.</li>
            <li>Hedging phrases without follow-up (“may indicate”, “could suggest”).</li>
            <li>Overuse of vague drivers (“digital transformation”, “execution focus”).</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>How to use these patterns</h3>
          <p>
            Use them as triage. If you see multiple ticks together, treat the piece as a draft and verify the numeric
            claims and the causal story against source documents.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 4,
    title: 'Quick Check: Real or AI Report?',
    duration: '9 min',
    type: 'quiz',
    status: 'current',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag quiz">Quiz</span>
          <span className="tag neutral">Checkpoint</span>
        </div>

        <h2 className="lesson-title">Quick Check: Real or AI Report?</h2>

        <section className="lesson-section">
          <h3>How to answer</h3>
          <ul>
            <li>Ignore whether it sounds smart. Focus on evidence quality.</li>
            <li>Look for concrete links between numbers and narrative.</li>
            <li>Notice repetition, generic phrasing, and suspicious confidence.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>Question 1 of 2</h3>
          <div className="quiz-card">
            <p className="quiz-heading">Q3 2024 Financial Summary</p>
            <p>Revenue: $4.2B (+15% YoY)</p>
            <p>Operating Income: $890M (+8% YoY)</p>
            <p>Net Margin: 21.2%</p>
            <p>
              The company demonstrated robust performance in Q3, with revenue growth accelerating across all major
              segments. Digital transformation initiatives contributed approximately 40% of the incremental revenue.
              Management has raised full-year guidance, citing strong momentum.
            </p>

            <MCQ
              question="Is this report written by a human analyst or AI-generated?"
              options={[
                { id: 'human', label: 'Human analyst' },
                { id: 'ai', label: 'AI-generated' },
              ]}
              correctId="ai"
              explanationCorrect="Correct: it’s heavy on generic praise ('robust performance'), includes a precise-sounding attribution (40% of incremental revenue) without any sourcing, and reads like a template fill."
              explanationWrong="A human could write this, but the mix of generic tone + precise unsourced attribution + template structure is a common AI-draft smell. Treat it as a draft and verify the numbers/claims."
            />
          </div>
        </section>

        <section className="lesson-section">
          <h3>Question 2 of 2</h3>
          <div className="quiz-card">
            <p className="quiz-heading">Rates &amp; FX Update</p>
            <p>GBP weakened against USD following a surprise CPI print. Options markets priced a wider distribution of outcomes, with short-dated implied vol rising notably.</p>
            <p>
              Traders highlighted two competing narratives: near-term inflation persistence versus slower growth. The key
              is how the next policy statement clarifies the reaction function.
            </p>

            <MCQ
              question="Which feels more “human” to you, and why?"
              options={[
                { id: 'human', label: 'Mostly human' },
                { id: 'ai', label: 'Mostly AI' },
              ]}
              correctId="human"
              explanationCorrect="Good call: it’s specific about market mechanics (options-implied distribution, short-dated vol) and frames uncertainty in a way that feels anchored to actual trader reasoning."
              explanationWrong="You can argue either way, but compared to the first snippet this one is more specific and better-grounded in market language, which tends to correlate with human-written desk commentary."
            />
          </div>
        </section>
      </>
    ),
  },
  {
    id: 5,
    title: 'Identifying Generic Analysis (with examples)',
    duration: '14 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Locked</span>
        </div>

        <h2 className="lesson-title">Identifying Generic Analysis (with examples)</h2>

        <section className="lesson-section">
          <h3>What generic looks like</h3>
          <p>
            Generic analysis reads like it could apply to almost any company: it states direction (“improved”,
            “pressured”, “solid”) without pinning the claim to specific line items, segments, or drivers.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Side-by-side: generic vs specific</h3>
          <p>
            <strong>Generic:</strong> “Margins improved due to operational efficiencies.”
          </p>
          <p>
            <strong>Specific:</strong> “Gross margin improved by 120 bps, driven by a richer mix in segment A and a 6%
            reduction in logistics costs; segment B margins fell due to promo intensity.”
          </p>
          <p>
            The “specific” version gives you something you can verify. The generic version is hard to falsify—and that’s
            a red flag in high-stakes domains.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Checklist: turn vague into verifiable</h3>
          <ul>
            <li>Which metric moved, and by how much?</li>
            <li>Which segment/region/product drove it?</li>
            <li>What evidence supports the claim (transcript quote, table, footnote)?</li>
            <li>What alternative explanation could also fit the numbers?</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 6,
    title: 'Numbers, Narratives, and Hallucinations',
    duration: '16 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Locked</span>
        </div>

        <h2 className="lesson-title">Numbers, Narratives, and Hallucinations</h2>

        <section className="lesson-section">
          <h3>Why hallucinations happen</h3>
          <p>
            Language models optimise for plausible text, not “truth”. In a financial context, that can look like a clean
            story built around a number that was never in the source.
          </p>
          <p>
            The danger is subtle: the paragraph can be coherent and professional, so reviewers may skim and miss the
            exact numeric mismatch.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Common hallucination patterns</h3>
          <ul>
            <li>Invented breakdowns (e.g., “40% of growth came from X”) without a cited table.</li>
            <li>Unit confusion (bps vs %, millions vs billions).</li>
            <li>Time-window drift (mixing quarterly and yearly stats).</li>
            <li>Over-confident causal links (“because of…”) without evidence.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>Practical verification loop</h3>
          <ul>
            <li>Extract every numeric claim into a list.</li>
            <li>Map each claim to a source (row/slide/quote).</li>
            <li>Flag claims with no source as draft-only.</li>
            <li>Recompute simple derived metrics (YoY, margin, contribution) yourself.</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 7,
    title: 'Case Study: Earnings Call Summary Under Pressure',
    duration: '18 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Locked</span>
        </div>

        <h2 className="lesson-title">Case Study: Earnings Call Summary Under Pressure</h2>

        <section className="lesson-section">
          <h3>Scenario</h3>
          <p>
            It’s 20 minutes after an earnings call ends. Your team must publish a short market note. Someone proposes
            generating the draft with AI, then “quickly checking it”.
          </p>
        </section>

        <section className="lesson-section">
          <h3>What can go wrong fast</h3>
          <ul>
            <li>The model paraphrases management guidance incorrectly (range endpoints flip).</li>
            <li>Qualifiers disappear (“may”, “subject to”) and become certainty.</li>
            <li>Risk language becomes boilerplate and misses the key new issue.</li>
            <li>One invented stat makes the whole note unreliable.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>Better workflow</h3>
          <p>
            The safest pattern is: (1) extract source facts first (numbers + quotes), (2) generate narrative only from
            that fact list, (3) require “source mapping” for every numeric statement.
          </p>
          <p>
            AI can help with structure and wording, but your review process should treat it as a drafting tool, not a
            fact engine.
          </p>
        </section>
      </>
    ),
  },
  {
    id: 8,
    title: 'Mini-Workshop: Build a Review Checklist',
    duration: '13 min',
    type: 'article',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag article">Article</span>
          <span className="tag neutral">Locked</span>
        </div>

        <h2 className="lesson-title">Mini-Workshop: Build a Review Checklist</h2>

        <section className="lesson-section">
          <h3>Your goal</h3>
          <p>
            Create a checklist you could hand to someone new on the desk. It should help them catch the most common
            failure modes in AI-generated commentary quickly.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Checklist v1 starter</h3>
          <ul>
            <li>Are all numbers traceable to a source? (table/slide/transcript)</li>
            <li>Any unit confusion? (% vs bps, currency, timeframe)</li>
            <li>Are key drivers specific (segment/region/product), not generic?</li>
            <li>Does the conclusion follow from the evidence given?</li>
            <li>Does the tone match uncertainty in the source (no false certainty)?</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>Checklist v2 stretch</h3>
          <ul>
            <li>Any template filler paragraphs that add no new information?</li>
            <li>Any claims that sound causal but could just be correlation?</li>
            <li>Does the note mention the biggest new risk or change from last quarter?</li>
            <li>Is there a clear separation between facts and interpretation?</li>
          </ul>
        </section>
      </>
    ),
  },
  {
    id: 9,
    title: 'Spot the Red Flags: Interactive Quiz',
    duration: '12 min',
    type: 'quiz',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag quiz">Quiz</span>
          <span className="tag neutral">Locked</span>
        </div>

        <h2 className="lesson-title">Spot the Red Flags: Interactive Quiz</h2>

        <section className="lesson-section">
          <h3>Instructions</h3>
          <p>
            Read the snippet and pick the most concerning issue. Pretend you must decide whether the note can be sent to
            clients as-is.
          </p>
        </section>

        <section className="lesson-section">
          <h3>Question 1 of 3</h3>
          <div className="quiz-card">
            <p className="quiz-heading">Snippet A</p>
            <p>
              “Operating margin expanded meaningfully as the company benefited from improved pricing and stronger demand.
              This trend should continue into the next quarter.”
            </p>

            <MCQ
              question="What is the biggest red flag?"
              options={[
                { id: 'vague', label: 'Too vague: no magnitude or evidence.' },
                { id: 'short', label: 'Too short: needs more words.' },
                { id: 'demand', label: 'Mentions demand; demand is always unknown.' },
              ]}
              correctId="vague"
              explanationCorrect="Exactly: the claim isn’t falsifiable. “Meaningfully” and “benefited” give no numbers, no driver, and no source to check."
              explanationWrong="The core issue is verifiability. Without a magnitude, driver, or source, the claim can’t be checked and is high-risk in client-facing commentary."
            />
          </div>
        </section>

        <section className="lesson-section">
          <h3>Question 2 of 3</h3>
          <div className="quiz-card">
            <p className="quiz-heading">Snippet B</p>
            <p>
              “Revenue rose to $3.1B (+18% YoY). Management stated the improvement was primarily driven by APAC,
              contributing 55% of incremental growth.”
            </p>

            <MCQ
              question="What do you do first?"
              options={[
                { id: 'verify', label: 'Find the source for 55% and verify.' },
                { id: 'rewrite', label: 'Rewrite to sound more confident.' },
                { id: 'delete', label: 'Delete the APAC mention entirely.' },
              ]}
              correctId="verify"
              explanationCorrect="Yes: treat precise attributions as “must-source” claims. Locate the table/quote and confirm the 55% math."
              explanationWrong="When a draft contains a precise attribution (55% of incremental growth), you verify the source and recompute before polishing wording."
            />
          </div>
        </section>

        <section className="lesson-section">
          <h3>Question 3 of 3</h3>
          <div className="quiz-card">
            <p className="quiz-heading">Snippet C</p>
            <p>
              “Net margin improved 200 bps to 24%, demonstrating strong operational efficiency and cost discipline.”
            </p>

            <MCQ
              question="What is the most likely subtle issue?"
              options={[
                { id: 'units', label: 'bps vs % confusion risk; recompute from statements.' },
                { id: 'cant', label: 'Margins can’t improve by 200 bps.' },
                { id: 'formal', label: 'The sentence is too formal.' },
              ]}
              correctId="units"
              explanationCorrect="Right: unit slips are common (bps vs percentage points). You’d recompute the margin change from the underlying numbers."
              explanationWrong="The likely risk is unit confusion. In finance writing, bps vs % mistakes are easy to miss and can materially change the meaning."
            />
          </div>
        </section>
      </>
    ),
  },
  {
    id: 10,
    title: 'Module 1 Assessment (Final)',
    duration: '20 min',
    type: 'quiz',
    status: 'locked',
    content: (
      <>
        <div className="lesson-tags">
          <span className="tag quiz">Quiz</span>
          <span className="tag neutral">Locked</span>
        </div>

        <h2 className="lesson-title">Module 1 Assessment</h2>

        <section className="lesson-section">
          <h3>What this covers</h3>
          <ul>
            <li>Recognising template writing and generic analysis.</li>
            <li>Finding numeric hallucinations and unit errors.</li>
            <li>Choosing a safe review workflow under time pressure.</li>
          </ul>
        </section>

        <section className="lesson-section">
          <h3>Sample question</h3>
          <div className="quiz-card">
            <p className="quiz-heading">Workflow decision</p>
            <p>
              You receive an AI-generated earnings note. It contains 6 numeric claims and 3 causal statements. You have
              7 minutes before distribution.
            </p>

            <MCQ
              question="What is the best first action?"
              options={[
                { id: 'extract', label: 'Extract and source-check all numeric claims.' },
                { id: 'polish', label: 'Polish the wording to sound more professional.' },
                { id: 'macro', label: 'Add more macro context at the top.' },
              ]}
              correctId="extract"
              explanationCorrect="Correct: the fastest risk-reducer is verifying facts. Wording improvements can wait until the numeric backbone is solid."
              explanationWrong="Under time pressure, you reduce risk by verifying the factual backbone (numbers and sources) before polishing narrative or adding extra context."
            />
          </div>
        </section>

        <section className="lesson-section">
          <h3>Reminder</h3>
          <p>
            The goal is not to guess “AI or human” perfectly—it’s to reduce risk by verifying what matters and
            documenting what you can’t verify.
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
