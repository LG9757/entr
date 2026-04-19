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

export const premiumPurchaseOptions = [
  {
    id: 'personal',
    category: 'Purchase for yourself',
    name: 'Standard Access',
    price: 65,
    priceLabel: 'One-time payment',
    audience: 'Individual learner',
    summary: 'Full personal access to the complete course for one learner.',
    benefits: [
      'Lifetime access to the full course',
      'All 8 modules, 69 lessons, and downloadable resources',
      'Ideal for individual upskilling and self-paced learning',
    ],
  },
  {
    id: 'bronze',
    category: 'Purchase for your business',
    name: 'Bronze',
    price: 895,
    priceLabel: 'One-time team licence',
    audience: 'Up to 20 employees',
    summary: 'A practical team package for smaller businesses that want a fast, effective skills uplift.',
    benefits: [
      'Full course designed to help your employees upskill, improving their efficiency and knowledge',
      'Course access for up to 20 employees',
    ],
  },
  {
    id: 'silver',
    category: 'Purchase for your business',
    name: 'Silver',
    price: 4950,
    priceLabel: 'One-time team licence',
    audience: 'Up to 200 employees',
    summary: 'A broader rollout for growing teams that want support alongside the training itself.',
    benefits: [
      'Full course designed to help your employees upskill, improving their efficiency and knowledge',
      'Course access for up to 200 employees',
      'Full support from our team',
      'Possibility to make minor amendments to the course to suit your needs',
    ],
  },
  {
    id: 'gold',
    category: 'Purchase for your business',
    name: 'Gold',
    price: 14500,
    priceLabel: 'One-time enterprise package',
    audience: 'Up to 1,000 employees',
    summary: 'A premium option for larger organisations that need a more tailored training rollout.',
    benefits: [
      'Full course designed to help your employees upskill, improving their efficiency and knowledge',
      'Course access for up to 1,000 employees',
      'Full support from our team',
      'Possibility to make minor amendments to the course to suit your needs',
      'A fully tailored course shaped around your needs and requirements',
    ],
  },
] as const

export type PremiumPurchaseOption = (typeof premiumPurchaseOptions)[number]

const selectedPurchaseOptionKey = 'premium-course:selected-option'

export function getPremiumPurchaseOption(optionId: string | null | undefined) {
  return premiumPurchaseOptions.find(option => option.id === optionId) ?? premiumPurchaseOptions[0]
}

export function getStoredPremiumPurchaseOption() {
  if (typeof window === 'undefined') return premiumPurchaseOptions[0]

  try {
    const optionId = window.localStorage.getItem(selectedPurchaseOptionKey)
    return getPremiumPurchaseOption(optionId)
  } catch {
    return premiumPurchaseOptions[0]
  }
}

export function setStoredPremiumPurchaseOption(optionId: PremiumPurchaseOption['id']) {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem(selectedPurchaseOptionKey, optionId)
  } catch {
    // Ignore storage failures.
  }
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
