'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Logo } from '@/components/logo'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

export default function Home() {
  const [cityWithSpaces, setCityWithSpaces] = useState('')
  const [cityForURL, setCityForURL] = useState('')

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
              setCityForURL(cityName.replace(/\s+/g, '-').toLowerCase())
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
    <main className="flex h-screen w-full items-center justify-center">
      <div className="mx-auto grid w-full  max-w-6xl grid-cols-2 flex-col items-center justify-center gap-4 max-lg:grid-cols-1 max-lg:px-12 max-sm:px-4">
        <div className="flex h-full flex-col items-center justify-between gap-2 rounded-lg bg-neutral-300 px-6 py-6 dark:bg-neutral-900 max-sm:h-96 max-sm:justify-center">
          <div />

          <div>
            <div className="mb-4 flex flex-col items-center gap-2">
              <Logo className="w-10" />
              <h2 className="text-4xl font-bold uppercase">Cupons</h2>
            </div>
            <p className="max-w-sm text-center text-sm font-medium dark:text-neutral-300">
              Clique no botão para obter sua localização e descobrir varios
              cupons em sua cidade. Se você é uma emprsa e deseja colocar seus
              cupons{' '}
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

        <form className="flex h-full  w-full flex-col gap-4 rounded-lg px-6 py-60">
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
          <div className="flex gap-3">
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
      </div>
    </main>
  )
}
