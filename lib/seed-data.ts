import { UserProfile, Mission, LibraryItem, ReadingItem, PortfolioItem, DecisionEntry, ReflectionEntry, MonthlyReview, WeeklyOp } from '@/types';

export const seedUserProfile: UserProfile = {
  id: 'user-001',
  name: 'Mochamad Hanif Arsyadi',
  role: 'International Relations Student',
  semester: 2,
  gpa: 3.82,
  strategicPath: 'Non-civil-service technocrat → think tank / policy ecosystem → part-time master\'s related to governance / strategic studies → long-term strategic influence',
  primaryFocus: 'ASEAN / Indo-Pacific',
  secondaryFocus: 'Middle East / humanitarian diplomacy',
  longTermGoal: 'Build policy capacity, strategic influence, and long-term national leadership',
  operatingDoctrine: [
    'Build competence before influence',
    'Every decision must be tested with second- and third-order consequences',
    'Strategy must obey moral red lines',
    'Output matters, not only structure',
    'Reflection must lead to system correction'
  ]
};

export const seedMissions: Mission[] = [
  {
    id: 'mission-001',
    title: 'Mission Alpha — Cognitive Foundation',
    phase: 'Sekarang',
    timeframe: '0–12 bulan',
    objective: 'Build thinking system, issue identity, and policy-oriented portfolio',
    tasks: [
      { id: 'task-001', text: 'Complete 12-week cognitive system', done: false },
      { id: 'task-002', text: 'Write 6 basic policy briefs', done: false },
      { id: 'task-003', text: 'Read 12 foundational IR texts', done: false },
      { id: 'task-004', text: 'Map ASEAN policy landscape', done: false }
    ]
  }
];

export const seedLibraryItems: LibraryItem[] = [
  {
    id: 'lib-001',
    category: 'Political Theory',
    title: 'Realism vs Institutionalism',
    level: 'Basic',
    description: 'Power, security, rules, institutions, and actor behavior in international relations',
    completed: false,
    tags: ['ir-theory', 'foundation']
  },
  {
    id: 'lib-002',
    category: 'ASEAN Studies',
    title: 'ASEAN Centrality in Indo-Pacific',
    level: 'Intermediate',
    description: 'Understanding ASEAN role in regional architecture and balance',
    completed: false,
    tags: ['asean', 'indo-pacific']
  },
  {
    id: 'lib-003',
    category: 'Policy Analysis',
    title: 'Policy Brief Writing Fundamentals',
    level: 'Basic',
    description: 'Structure, clarity, and impact in policy communications',
    completed: false,
    tags: ['writing', 'policy']
  }
];

export const seedReadingItems: ReadingItem[] = [
  {
    id: 'reading-001',
    title: 'Realism in International Relations',
    source: 'Stanford Encyclopedia of Philosophy',
    category: 'Political Theory',
    status: 'reading',
    notes: 'Focus on anarchy, security, and distribution of power',
    tags: ['realism', 'theory']
  },
  {
    id: 'reading-002',
    title: 'The ASEAN Way and Regional Order',
    source: 'Journal of Strategic Studies',
    category: 'ASEAN Studies',
    status: 'inbox',
    notes: '',
    tags: ['asean', 'regionalism']
  }
];

export const seedPortfolioItems: PortfolioItem[] = [
  {
    id: 'portfolio-001',
    type: 'policy_brief',
    title: 'ASEAN Centrality in Indo-Pacific Competition',
    status: 'planned',
    due: '2026-07-15'
  },
  {
    id: 'portfolio-002',
    type: 'analytical_note',
    title: 'Security Dilemma in South China Sea',
    status: 'planned',
    due: '2026-08-30'
  }
];

export const seedDecisionEntry: DecisionEntry = {
  id: 'decision-001',
  date: '2026-05-01',
  context: 'Choosing early career direction',
  decision: 'Choose non-civil-service technocratic path oriented toward think tank ecosystem',
  reasoning: 'Preserve flexibility and build policy credibility independent of state machinery',
  layer23: 'Analytical capacity grows → entry into policy ecosystem → policy influence without bureaucratic constraints',
  moralCheck: 'Aligned with values of independent thinking and strategic national service'
};

export const seedReflectionEntry: ReflectionEntry = {
  id: 'reflection-001',
  date: '2026-05-01',
  title: 'Baseline Thinking Audit',
  tag: 'Refleksi',
  content: 'Strong in logic and system thinking, but needs faster output externalization. The thinking is there, but the written articulation lags. This is the bottleneck.'
};

export const seedMonthlyReview: MonthlyReview = {
  id: 'review-001',
  month: '2026-05',
  wins: 'Started building Hanif OS, clarified strategic path, strong baseline thinking identified',
  gaps: 'Not enough written output yet, reading speed slower than target, no portfolio pieces completed',
  blindSpots: 'Too much time refining structure, perfectionism in system design, not enough "imperfect action"',
  nextFocus: 'Consistent reading memo and policy brief outline. Output over perfection.'
};

export const seedWeeklyOps: WeeklyOp[] = [
  {
    id: 'weekly-001',
    day: 'Monday',
    task: 'Reading memo: Realism vs Institutionalism',
    done: false
  },
  {
    id: 'weekly-002',
    day: 'Tuesday',
    task: 'Write 300-word analytical note on security dilemma',
    done: false
  },
  {
    id: 'weekly-003',
    day: 'Wednesday',
    task: 'Review and annotate one ASEAN policy document',
    done: false
  },
  {
    id: 'weekly-004',
    day: 'Thursday',
    task: 'Reflection: What did you learn this week?',
    done: false
  },
  {
    id: 'weekly-005',
    day: 'Friday',
    task: 'Plan next week priorities',
    done: false
  }
];
