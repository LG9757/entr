import { useNavigate } from 'react-router-dom'
import AppHeader from '../components/AppHeader'
import '../App.css'

type Person = {
  name: string
  role: string
  bio: string
}

const coFounders: Person[] = [
  {
    name: 'Lewis Grice',
    role: 'Co-founder',
    bio: 'Computer Science student focused on product architecture and turning complex technical requirements into practical, user-friendly learning experiences.',
  },
  {
    name: 'James Ogborne',
    role: 'Co-founder',
    bio: 'Computer Science student with a strong interest in platform engineering, responsible for delivery workflows and keeping the project reliable as it scales.',
  },
  {
    name: 'Maciej Kosela',
    role: 'Co-founder',
    bio: 'Computer Science student specialising in frontend systems and interface quality, ensuring the learning journey remains clear, polished, and accessible.',
  },
  {
    name: 'Zac Couglan',
    role: 'Co-founder',
    bio: 'Computer Science student focused on analytics and learning outcomes, helping shape data-driven features that improve student progress and engagement.',
  },
  {
    name: 'Matthew Pearson',
    role: 'Co-founder',
    bio: 'Computer Science student with a backend and security focus, building robust account, access, and progress infrastructure for the platform.',
  },
]

const professors: Person[] = [
  {
    name: 'Professor Eleanor Hayes',
    role: 'Professor of Financial Technology, University of Bath',
    bio: 'Leads research in AI-assisted risk modelling and financial data governance, advising on how emerging systems can be safely applied in regulated environments.',
  },
  {
    name: 'Dr. Oliver Bennett',
    role: 'Senior Lecturer in Quantitative Finance, University of Bath',
    bio: 'Specialises in market microstructure and computational finance, supporting the team with curriculum rigor and real-world finance case design.',
  },
  {
    name: 'Sophie Patel',
    role: 'Learning & Capability Manager, Lloyds Banking Group',
    bio: 'Works with enterprise learning teams to improve digital skills adoption, contributing practical insights on workforce development and training impact.',
  },
]

function PersonCard({ person }: { person: Person }) {
  return (
    <article className="team-card">
      <div className="team-avatar" aria-hidden="true">
        <div className="team-avatar-head" />
        <div className="team-avatar-body" />
      </div>
      <div className="team-person-name">{person.name}</div>
      <div className="team-person-role">{person.role}</div>
      <p className="team-person-bio">{person.bio}</p>
    </article>
  )
}

export default function OurTeamPage() {
  const navigate = useNavigate()

  return (
    <div className="team-page-root">
      <AppHeader
        title="Our Team"
        subtitle="Meet the co-founders and academic/industry advisors behind the platform."
        backLabel="Back to Home"
        onBack={() => navigate('/home')}
      />

      <main className="team-layout">
        <section className="team-section">
          <div className="team-section-head">
            <h1>Co-founders</h1>
            <p>Our core team building the product and learning experience end to end.</p>
          </div>
          <div className="team-grid team-grid-founders">
            {coFounders.map(person => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </section>

        <section className="team-section">
          <div className="team-section-head">
            <h2>Our Professors</h2>
            <p>Academic and industry guidance helping us keep both technical quality and real-world relevance high.</p>
          </div>
          <div className="team-grid team-grid-professors">
            {professors.map(person => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
