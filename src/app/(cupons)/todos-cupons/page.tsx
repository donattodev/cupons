'use client'

import { cupons } from '@/data/cupons'
import { ChangeEvent, useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

export default function Cupons() {
  const [input, setInput] = useState('')
  const [page, setPage] = useState(1)

  const filteredCupons = cupons.filter(
    (cupon) =>
      cupon.name.toLowerCase().includes(input.toLowerCase()) ||
      cupon.category.toLowerCase().includes(input.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredCupons.length / 12)

  function onSearchInputChanged(event: ChangeEvent<HTMLInputElement>) {
    setInput(event.target.value)
    setPage(1)
  }

  function goToNextPage() {
    setPage(page + 1)
  }

  function goToLastPage() {
    setPage(totalPages)
  }

  function goBackNextPage() {
    setPage(page - 1)
  }

  function goToFirstPage() {
    setPage(1)
  }

  return (
    <section className="grid w-full grid-cols-6 gap-4 px-28 py-4 max-lg:grid-cols-1 max-lg:px-6">
      <div className="col-span-4 grid w-full grid-cols-3 gap-4 max-lg:order-2 max-sm:grid-cols-1">
        {filteredCupons.slice((page - 1) * 12, page * 12).map((cupon) => (
          <div
            className="flex w-full cursor-pointer items-center justify-between rounded-md bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-8 max-sm:col-span-3"
            key={cupon.id}
          >
            <div className="flex flex-col">
              <div className="font-bold uppercase text-white">{cupon.name}</div>
              <div>
                {cupon.loja} {cupon.location}
              </div>
            </div>
            <div className="text-4xl font-bold">{cupon.valor}</div>
          </div>
        ))}

        <div className="col-span-3 flex items-center justify-between rounded-md border px-4">
          <div className="col-span-1 py-3 text-xs font-semibold text-zinc-400">
            Mostrando {Math.min(filteredCupons.length, 12)} de{' '}
            {filteredCupons.length}
          </div>

          <div className="col-span-2 flex items-center justify-end gap-4">
            <div className="text-xs font-semibold text-zinc-500">
              Página {page} de {totalPages}
            </div>

            <div className="flex items-center gap-4">
              <button
                className="rounded bg-neutral-600 px-2 py-1 text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-900 dark:text-zinc-500 disabled:dark:bg-zinc-900"
                onClick={goToFirstPage}
                disabled={page === 1}
              >
                <ChevronsLeft className="w-4 " />
              </button>

              <button
                className="rounded bg-neutral-600 px-2 py-1 text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-900 dark:text-zinc-500 disabled:dark:bg-zinc-900"
                onClick={goBackNextPage}
                disabled={page === 1}
              >
                <ChevronLeft className="w-4" />
              </button>

              <button
                className="rounded bg-neutral-600 px-2 py-1 text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-900 dark:text-zinc-500 disabled:dark:bg-zinc-900"
                onClick={goToNextPage}
                disabled={page === totalPages}
              >
                <ChevronRight className="w-4 " />
              </button>

              <button
                className="rounded bg-neutral-600 px-2 py-1 text-zinc-300 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-neutral-900 dark:text-zinc-500 disabled:dark:bg-zinc-900"
                onClick={goToLastPage}
                disabled={page === totalPages}
              >
                <ChevronsRight className="w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="col-span-2 max-lg:order-1 max-sm:col-span-4">
        <div className="w-full max-w-md ">
          <Input
            type="text"
            placeholder="Filtrar por nome da empresa ou categoria"
            onChange={onSearchInputChanged}
          />
        </div>
      </div>
    </section>
  )
}
