import * as fs from 'fs';

export class System {
  /**
   * This handles extend logging info to log file
   * @param args
   * @returns void
   */
  static log(...args: any) {
    const [message] = args;

    if (!message) {
      return;
    }

    const data = `<${new Date().toLocaleString()}>\n${args?.join('\n')} \n\n\n`;
    fs.appendFileSync('./nestjs.log', data);
  }
}
