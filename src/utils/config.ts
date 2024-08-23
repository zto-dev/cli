import { loadConfig } from 'unconfig'

export interface ZtoConfig {
  blog?: {
    dir?: string
  }

  docs?: {
    dir?: string
  }
}

export interface ZtoInternalConfig {
  blog: {
    dir: string
  }

  docs: {
    dir: string
  }
}

export async function getConfig() {
  const result = await loadConfig<ZtoInternalConfig>({
    sources: [
      {
        files: 'zto.config',
        extensions: ['ts', 'mts', 'cts', 'js', 'mjs', 'cjs', 'json'],
      },
    ],
    defaults: {
      blog: {
        dir: 'apps/web/content/posts',
      },
      docs: {
        dir: 'apps/web/content/documentation',
      },
    }
  })

  return result.config
}
