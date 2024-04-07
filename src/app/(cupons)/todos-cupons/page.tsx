'use client'

import { toast } from 'sonner'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Toaster } from '@/components/ui/sonner'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'

export default function Cupons() {
  const cupons = [
    {
      id: 1,
      name: 'pegaagora',
      valor: '25%',
      loja: 'Colcci Conquista',
      location: 'vitoria-da-conquista',
      quantidade: 10,
    },
    {
      id: 2,
      name: 'pegouganhou',
      valor: '35%',
      loja: 'DMK Shopping',
      location: 'itapetinga',
      quantidade: 10,
    },
    {
      id: 3,
      name: 'pegouganhou',
      valor: '35%',
      loja: 'DMK Shopping',
      location: 'vitoria-da-conquista',
      quantidade: 10,
    },
    {
      id: 4,
      name: 'DescontãoDoPoder',
      valor: '15%',
      loja: 'Loja 04',
      location: 'itapetinga',
      quantidade: 10,
    },
    {
      id: 5,
      name: 'sovaleum',
      valor: '75%',
      loja: 'DMK Shopping',
      location: 'vitoria-da-conquista',
      quantidade: 10,
    },
  ]

  const itemsPerPage = 4
  const [filter, setFilter] = useState<string>('')
  const [currentPage, setCurrentPage] = useState(1)

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const filteredCupons = cupons.filter(
    (cupon) =>
      cupon.loja.toLowerCase().includes(filter.toLowerCase()) ||
      cupon.name.toLowerCase().includes(filter.toLowerCase()),
  )

  const currentCupons = filteredCupons.slice(indexOfFirstItem, indexOfLastItem)

  const [, setCopiedName] = useState<string | null>(null)

  const handleCopyName = (name: string) => {
    navigator.clipboard.writeText(name)
    setCopiedName(name)
    toast.success('Cupom copiado para a área de transferência!')
    setTimeout(() => setCopiedName(null), 1500)
  }

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

  const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPage(1)
    setFilter(event.target.value)
  }

  return (
    <section className="flex flex-col gap-4 px-28 py-4">
      <div className="mt-4 max-w-lg">
        <Input
          type="text"
          placeholder="Filtrar por nome da empresa ou categoria"
          value={filter}
          onChange={handleFilterChange}
        />
      </div>

      <div className="mt-4 flex flex-col gap-4">
        {currentCupons.map((cupon) => (
          <div
            className="flex w-full cursor-pointer items-center justify-between rounded-lg bg-gradient-to-r from-sky-500 to-indigo-500 px-4 py-8"
            key={cupon.id}
            onClick={() => handleCopyName(cupon.name)}
          >
            <div className="flex flex-col">
              <div className="font-bold uppercase text-white">{cupon.name}</div>{' '}
              <div>{cupon.loja}</div>
            </div>
            <div className="text-4xl font-bold">{cupon.valor}</div>
          </div>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={() => paginate(currentPage - 1)}
            />
          </PaginationItem>
          {Array(Math.ceil(filteredCupons.length / itemsPerPage))
            .fill(0)
            .map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink href="#" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={() => paginate(currentPage + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>

      <Toaster />
    </section>
  )
}
