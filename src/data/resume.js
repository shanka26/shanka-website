// From the résumé. Keep in sync with public/Shamarl_Leonard_Resume.pdf
export const RESUME_URL = `${process.env.PUBLIC_URL}/Shamarl_Leonard_Resume.pdf`

export const EXPERIENCE = [
  {
    when: 'Jun 2023 — Present',
    role: 'Full-stack Software Engineer',
    org: "Dillard's",
    points: [
      '300% faster file processing on critical apps.',
      '~50% less setup time on a rebuilt allocation system, with AI-driven inventory decisions.',
      'Faster SQL through indexing. Test-driven development.',
    ],
  },
  {
    when: '2022 — Present',
    role: 'Web Developer',
    org: 'Independent',
    points: ['Client sites and products.'],
  },
]

export const EDUCATION = [
  { when: '2023', what: 'B.S. Computer Science', where: 'University of Central Arkansas' },
  { when: '2020', what: "Associate's, Computer Studies", where: 'H. Lavity Stoutt Community College, BVI' },
]

// Short on purpose: the full list lives in the PDF.
export const SKILLS = [
  { group: 'Frontend', items: ['React', 'Next.js', 'Angular'] },
  { group: 'Backend', items: ['Spring Boot', 'Django', 'SQL', 'MongoDB'] },
  { group: 'Quality', items: ['TDD', 'JUnit', 'Cypress'] },
  { group: 'AI', items: ['OpenAI', 'Lovable', 'v0'] },
]
