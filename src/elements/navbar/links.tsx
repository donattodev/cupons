import Link from 'next/link'
import { ModeToggle } from '@/components/themes/toggle-mode'

export function Links() {
  return (
    <ul className="flex items-center gap-8 text-sm font-bold uppercase text-neutral-700 dark:text-neutral-400">
      <li>
        <Link href="/todos-cupons">Todos os cupons</Link>
      </li>
      <li>
        <Link href="/" target="_blank">
          Empresas
        </Link>
      </li>
      <li>
        <ModeToggle />
      </li>
    </ul>
  )
}
