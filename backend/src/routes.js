import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ memsagem: 'Hello World' });
});

export default routes;
