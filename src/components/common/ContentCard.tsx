import type { PropsWithChildren } from 'react'
import { Link, useLocation } from 'react-router-dom'

interface ContentCardProps extends PropsWithChildren {
  className: string
  to?: string
}

export function ContentCard({ className, to, children }: ContentCardProps) {
  const { pathname } = useLocation()
  const classes = `d-card ${className}`

  return !to || to === pathname.replace(/\/$/, '')
    ? <article className={classes}>{children}</article>
    : <Link className={classes} to={to}>{children}</Link>
}
