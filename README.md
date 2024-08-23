# ZTO CLI

### Install

```
pnpm i @zto/cli -g
```

### Generate Blog Post

A quick command to generate blog posts.

```
zto blog
```

### Generate Document

A quick command to generate blog posts.

```
zto docs
```

### Configuration

Create `zto.config.ts` and configure it. The following configurations are not all required and are only explained as options.

```ts
import { defineConfig } from '@zto/cli'

export default defineConfig({
  blog: {
    /**
     * blog post markdown output dir
     * @default 'apps/web/content/posts'
     */
    dir: ''
  }, 

  docs: {
    /**
     * document markdown output dir
     * @default 'apps/web/content/documentation'
     */
    dir: ''
  }
})
```