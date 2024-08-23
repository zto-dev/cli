import { Command } from 'commander'
import { blog } from './commands/blog'
import { docs } from './commands/docs'

export function run() {
  const program = new Command()

  program.command('blog').action(blog)
  program.command('docs').action(docs)
  
  program.parse()
}
