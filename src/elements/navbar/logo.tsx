import { Logo } from '@/components/logo'
import Link from 'next/link'

export function NavLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Logo className="w-6" />
      <h2 className="text-xl font-bold uppercase">Cupons</h2>
    </Link>
  )
}
