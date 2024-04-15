'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { Logo } from '@/components/logo'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

function normalizeCityName(cityName: string) {
  const normalized = cityName.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return normalized
    .replace(/[^\w\s]/gi, '')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

export default function Home() {
  const [cityForURL, setCityForURL] = useState('')
  const [cityWithSpaces, setCityWithSpaces] = useState('')

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude
          const longitude = position.coords.longitude

          fetch(
            `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=pt`,
          )
            .then((response) => response.json())
            .then((data) => {
              const cityName = data.locality
              setCityWithSpaces(cityName)
              setCityForURL(normalizeCityName(cityName))
            })
            .catch((error) => console.error('Erro ao obter a cidade:', error))
        },
        (error) => {
          console.error('Erro ao obter localização:', error)
        },
      )
    } else {
      console.error('Geolocalização não suportada pelo navegador')
    }
  }

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center justify-center px-6 max-sm:flex-col">
      <div className="flex w-full flex-col items-center justify-center gap-8 rounded-lg bg-neutral-900 py-56 max-sm:py-16">
        <div>
          <div className="mb-4 flex flex-col items-center gap-2">
            <Logo className="w-10" />
            <h2 className="text-4xl font-bold uppercase">Cupons</h2>
          </div>
          <p className="max-w-sm text-center text-sm font-medium dark:text-neutral-300">
            Clique no botão para obter sua localização e descobrir varios cupons
            em sua cidade. Se você é uma emprsa e deseja colocar seus cupons{' '}
            <Link href="/" target="_blank" className="font-bold text-primary">
              clique aqui!
            </Link>
          </p>
        </div>

        <div className="max-lg:hidden">
          <p className="text-sm font-medium ">
            Criado por{' '}
            <Link
              href="https://donattodev.com.br/"
              target="_blank"
              className="font-bold uppercase text-primary transition-all hover:text-primary/90"
            >
              Felippe Donatto
            </Link>
          </p>
        </div>
      </div>

      <form className="flex h-full w-full flex-col gap-4 rounded-lg px-6 py-56 max-sm:py-16">
        <div className="w-full">
          <Label htmlFor="cidade" className="text-sm font-medium">
            Sua cidade
          </Label>
          <Input
            type="text"
            id="cidade"
            placeholder="Sua cidade"
            value={cityWithSpaces}
            readOnly
            autoFocus
          />
        </div>
        <div className="flex gap-3 max-sm:flex-col">
          <Button
            type="button"
            variant={'outline'}
            className="w-full"
            onClick={handleLocationClick}
          >
            Obter Localização
          </Button>
          <Button asChild className="w-full">
            <Link href={`/cidade/${encodeURIComponent(cityForURL)}`}>
              Acessar
            </Link>
          </Button>
        </div>
      </form>
    </main>
  )
}
