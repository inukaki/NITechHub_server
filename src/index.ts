import { createExpressServer } from 'routing-controllers';
import { SimpleController } from './controllers/simpleController';
import { AuthController } from './controllers/authController';
import 'reflect-metadata';
import passport from 'passport';
import { createBearerStrategy } from './passport-config';

const app = createExpressServer({
  controllers: [
    SimpleController,
    AuthController
]
});
const port = 3000;

app.use(passport.initialize());
const bearerStrategy = createBearerStrategy();
passport.use(bearerStrategy);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});