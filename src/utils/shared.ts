import pico from 'picocolors'

export const kebabCase = (s: string): string => {
  const ret = s.replace(/([A-Z])/g, ' $1').trim()
  return ret.split(' ').join('-').toLowerCase()
}

export function formatMarkdownTitle(s: string): string {
  return kebabCase(s.replace(/\s/g, ''))
}

export const logger = {
  info(text: string) {
    console.log(text)
  },
  success(text: string) {
    console.log(pico.green(text))
  },
  warning(text: string) {
    console.log(pico.yellow(text))
  },
  error(text: string) {
    console.log(pico.red(text))
  },
}
