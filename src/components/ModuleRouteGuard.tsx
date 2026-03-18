import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { isModuleUnlocked } from '../lib/courseProgress'

export default function ModuleRouteGuard({
  moduleNumber,
  children,
}: {
  moduleNumber: number
  children: ReactNode
}) {
  if (!isModuleUnlocked(moduleNumber)) {
    return <Navigate to="/course" replace />
  }

  return <>{children}</>
}
