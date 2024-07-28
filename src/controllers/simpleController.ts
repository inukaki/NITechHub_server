import passport from 'passport';
import { Controller, Get, UseBefore } from 'routing-controllers';

@Controller()
export class SimpleController {

  @Get('/')
  @UseBefore(passport.authenticate('oauth-bearer', { session: false }))
  helloWorld() {
    return 'Hello World!';
  }
}