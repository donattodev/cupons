import { ComponentProps, ReactNode } from 'react'

export type NavTypes = ComponentProps<'nav'> & {
  children: ReactNode
}
export function Nav({ children, ...props }: NavTypes) {
  return (
    <nav
      className="flex h-[10vh] justify-between bg-neutral-200 px-28 dark:bg-neutral-900"
      {...props}
    >
      {children}
    </nav>
  )
}
