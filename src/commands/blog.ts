import { input } from '@inquirer/prompts'
import { getConfig } from '../utils/config'
import { formatMarkdownTitle, logger } from '../utils/shared'
import { format } from 'date-fns'
import { resolve } from 'path'

import fse from 'fs-extra'

export async function blog() {
  const config = await getConfig()
  const title = await input({ message: "Blog's title", required: true })
  const description = await input({ message: "Blog's description", default: 'Example description' })
  const image = await input({ message: "Blog's image" })
  const publishAt = format(new Date(), 'yyyy-MM-dd')
  const filename = formatMarkdownTitle(title)

  const template = `\
---
title: "${title}"
description: "${description}"
categories: []
tags: []
image: "${image}"
publishedAt: ${publishAt}
---

Fugiat dolor irure aliquip ut nisi et tempor mollit deserunt nostrud cupidatat nostrud. Est dolore commodo consectetur dolor sint. Aute veniam duis nostrud duis non commodo est fugiat. Officia fugiat sunt proident do cupidatat ad.
`

  const file = resolve(config.blog.dir, `${filename}.mdoc`)
  if (fse.existsSync(file)) {
    logger.error(`File ${file} already exists`)
  }

  fse.outputFileSync(file, template)
  logger.success(`Created ${file}`)
}