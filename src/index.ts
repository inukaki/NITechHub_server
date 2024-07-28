import { createExpressServer } from 'routing-controllers';
import { SimpleController } from './controllers/simpleController';

const app = createExpressServer({
  controllers: [SimpleController]
});
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});