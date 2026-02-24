// src/pages/module2.tsx
import ModulePage, { type Lesson } from '../components/ModulePage'

const lessons: Lesson[] = [
  // define Module 2 lessons/content here
]

export default function Module2() {
  return (
    <ModulePage
      moduleTitle="Detecting AI-Generated Reports"
      moduleNumber={2}
      totalLessons={lessons.length}
      completedCount={0}
      lessons={lessons}
      backPath="/course"
    />
  )
}
