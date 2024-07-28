import { Controller, Get } from 'routing-controllers';

@Controller()
export class SimpleController {

  @Get('/')
  helloWorld() {
    return 'Hello World!';
  }
}
