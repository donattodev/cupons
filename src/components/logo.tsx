import { ComponentProps } from 'react'

export function Logo(props: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M128 42.667L64 128v298.667a42.667 42.667 0 0042.667 42.666h298.666A42.667 42.667 0 00448 426.667V128l-64-85.333H128zM64 128h384M341.333 213.333a85.333 85.333 0 11-170.666 0"
        stroke="#0EA5E9"
        strokeWidth={42.6667}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
