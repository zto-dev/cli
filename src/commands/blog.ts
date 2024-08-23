import { input } from '@inquirer/prompts'
import { getConfig } from '../utils/config'
import { formatMarkdownTitle, logger } from '../utils/shared'
import { format } from 'date-fns'
import { resolve } from 'path'

import fse from 'fs-extra'

export async function blog() {
  const config = await getConfig()
  const title = await input({ message: "Blog post's title", required: true })
  const description = await input({ message: "Blog post's description", default: 'Example description' })
  const image = await input({ message: "Blog post's image" })
  const dir = await input({ message: "Blog post's dir", default: config.blog.dir })
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

  if (!fse.existsSync(dir)) {
    logger.error(`Directory ${dir} does not exist`)
    return
  }

  const file = resolve(dir, `${filename}.mdoc`)
  if (fse.existsSync(file)) {
    logger.error(`File ${file} already exists`)
    return
  }

  fse.outputFileSync(file, template)
  logger.success(`Created ${file}`)
}
