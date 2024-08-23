import { input } from '@inquirer/prompts'
import { getConfig } from '../utils/config'
import { formatMarkdownTitle, logger } from '../utils/shared'
import { format } from 'date-fns'
import { resolve } from 'path'

import fse from 'fs-extra'

export async function docs() {
  const config = await getConfig()
  const title = await input({ message: "Document's title", required: true })
  const description = await input({ message: "Document's description", default: 'Example description' })
  const dir = await input({ message: "Document's dir", default: config.docs.dir })
  const publishAt = format(new Date(), 'yyyy-MM-dd')
  const filename = formatMarkdownTitle(title)

  const template = `\
---
title: "${title}"
description: "${description}"
publishedAt: ${publishAt}
---

Fugiat dolor irure aliquip ut nisi et tempor mollit deserunt nostrud cupidatat nostrud. Est dolore commodo consectetur dolor sint. Aute veniam duis nostrud duis non commodo est fugiat. Officia fugiat sunt proident do cupidatat ad.
`

  if (!fse.existsSync(dir)) {
    logger.error(`Directory ${dir} does not exist`)
    return
  }

  const file = resolve(dir, `${filename}.mdoc`)
  if (fse.existsSync(file)) {
    logger.error(`File ${file} already exists`)
  }

  fse.outputFileSync(file, template)
  logger.success(`Created ${file}`)
}
