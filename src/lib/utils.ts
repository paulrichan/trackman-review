import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const domainFormatter = (
  num: number,
  opts: { threshold: number; toFixed?: number } = { threshold: 10, toFixed: 0 }
) => (num + opts.threshold).toFixed(opts.toFixed)

export const PITCHCOLORS = {
  Fastball: '#fe456d',
  Slider: '#ff9900',
  ChangeUp: '#77f400',
  Curveball: '#007cc9',
  Splitter: '#e100ff',
  Cutter: '#f3e54e'
} as { [key: string]: string }
