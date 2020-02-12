import * as REPL from 'repl';
import Types from './config/types';
import { container } from './config/inversify';

export default class ReplServer {
  public server: REPL.REPLServer;

  constructor() {
    const server = REPL.start({
      // Set the REPL prompt.
      prompt: 'boiler> ',
      // Allow the REPL to use the same global space as the Sails app, giving it access
      // to things like globalized models.
      useGlobal: true,
      // Specify the custom output stream we created above.
      output: process.stdout,
      // When an output stream is specified, an input stream must be specified as well
      // or else the REPL crashes.
      input: process.stdin,
      // Set `terminal` to true to allow arrow keys to work correctly,
      // even when we're using a custom output stream.  Otherwise pressing
      // the up arrow just outputs ^[[A instead of accessing history.
      terminal: true,
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
      // FUTURE: Potentially use custom `eval` as stopgap for `await` support in Node <v9
      // https://nodejs.org/api/repl.html#repl_repl_start_options
      // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
    });
    this.server = server;
    const repositories = container.getAll(Types.Repl);
    console.log('available models/n');
    repositories.forEach(repository => {
      const name = repository.constructor.name;
      console.log(name, '/n');
      this.server.context[name] = repository;
    });
  }
}