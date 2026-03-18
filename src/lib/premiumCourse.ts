export const premiumEnrollmentKey = 'premium-course:enrolled'

export const premiumCourse = {
  slug: 'real-vs-ai',
  title: 'Real vs AI: Master the Art of Detection',
  subtitle:
    'Learn to identify AI-generated content across text, images, video, and media. Develop critical thinking skills for the AI era.',
  hours: '12+',
  modules: 8,
  lessons: 69,
  rating: '4.9',
  reviews: '2,847',
  difficulty: 'Intermediate',
  price: 65,
  description:
    'A comprehensive premium programme covering practical detection skills, media forensics, model fingerprints, and real-world review workflows.',
  includes: [
    'Lifetime access to all course materials',
    '69 comprehensive video lessons',
    'Downloadable resources and guides',
    'Certificate of completion',
    'Community forum access',
  ],
}

export const premiumCurriculum = [
  {
    number: 1,
    title: 'Text Detection Fundamentals',
    duration: '1.5 hours',
    lessons: 8,
    objectives: [
      'Identify common patterns in AI-generated text',
      'Understand language model fingerprints',
      'Apply basic stylistic analysis techniques',
    ],
  },
  {
    number: 2,
    title: 'Image Analysis Techniques',
    duration: '2 hours',
    lessons: 10,
    objectives: [
      'Spot synthetic image artifacts and inconsistencies',
      'Evaluate lighting, texture, and edge realism',
      'Use a repeatable process for image review',
    ],
  },
  {
    number: 3,
    title: 'Audio and Voice Cloning Detection',
    duration: '1.25 hours',
    lessons: 7,
    objectives: [
      'Recognise common deepfake audio issues',
      'Check cadence, breath, and phoneme transitions',
      'Escalate suspicious clips appropriately',
    ],
  },
  {
    number: 4,
    title: 'Video Verification Workflows',
    duration: '1.75 hours',
    lessons: 9,
    objectives: [
      'Inspect frame-level anomalies and sync drift',
      'Assess visual continuity under compression',
      'Build a safe verification workflow for social video',
    ],
  },
  {
    number: 5,
    title: 'Prompting, Provenance, and Metadata',
    duration: '1 hour',
    lessons: 8,
    objectives: [
      'Use metadata as one input to verification',
      'Understand provenance limitations and tampering',
      'Combine source context with technical checks',
    ],
  },
  {
    number: 6,
    title: 'Real-World Case Studies',
    duration: '1.5 hours',
    lessons: 9,
    objectives: [
      'Review mixed-modality case studies',
      'Distinguish suspicious content from low-quality authentic content',
      'Practise concise escalation notes',
    ],
  },
  {
    number: 7,
    title: 'Team Playbooks and Review Operations',
    duration: '1.25 hours',
    lessons: 9,
    objectives: [
      'Create practical review checklists',
      'Define triage thresholds and escalation paths',
      'Operate confidently under time pressure',
    ],
  },
  {
    number: 8,
    title: 'Capstone Assessment',
    duration: '1 hour',
    lessons: 9,
    objectives: [
      'Apply the full detection framework end to end',
      'Justify decisions with evidence',
      'Complete a final practical assessment',
    ],
  },
]

export function getPremiumEnrollment() {
  if (typeof window === 'undefined') return false

  try {
    return window.localStorage.getItem(premiumEnrollmentKey) === 'true'
  } catch {
    return false
  }
}

export function setPremiumEnrollment(value: boolean) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(premiumEnrollmentKey, value ? 'true' : 'false')
  } catch {
    // Ignore storage failures.
  }
}
