import { Command } from 'commander'
import { blog } from './commands/blog'
import { document } from './commands/document'

export function run() {
  const program = new Command()

  program.command('blog').action(blog)

  program.command('document').action(document)

  program.parse()
}
