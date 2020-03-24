import * as Yup from 'yup';

import connection from '../../database';

class SessionController {
  async create(req, res) {
    const schema = Yup.object().shape({
      id: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Formulario inválido, verifique os dados' });
    }

    const ong = await connection('ongs').where('id', req.body.id).first();

    if (!ong) {
      return res.status(400).json({ error: 'ONG inexistente' });
    }

    return res.json(ong);
  }
}

export default new SessionController();
