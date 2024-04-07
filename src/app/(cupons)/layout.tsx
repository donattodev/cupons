import { ReactNode } from 'react'
import { Navbar } from '@/elements/navbar'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <section>
      <Navbar.Nav>
        <Navbar.Logo />
        <Navbar.Links />
      </Navbar.Nav>

      {children}
    </section>
  )
}
