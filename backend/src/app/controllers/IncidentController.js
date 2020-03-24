import * as Yup from 'yup';

import connection from '../../database';

class IncidentController {
  async create(req, res) {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      value: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Formulario inválido, verifique os dados' });
    }

    const { title, description, value } = req.body;
    const ong_id = req.headers.authorization;

    const valueFormatted = value.replace(/[^0-9,]*/g, '').replace(',', '.');

    const ongExists = await connection('ongs').where('id', ong_id);

    if (!ongExists.length) {
      return res.status(400).json({ error: 'ONG inexistente' });
    }

    const [id] = await connection('incidents').insert({
      title,
      description,
      value: valueFormatted,
      ong_id,
    });

    return res.json({ id });
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const incidents = await connection('incidents')
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
      .orderBy('created_at', 'desc')
      .select(
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      )
      .paginate(10, page, true);

    return res.json(incidents);
  }

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const ongExists = await connection('ongs').where('id', ong_id);

    if (!ongExists.length) {
      return res.status(400).json({ error: 'ONG inexistente' });
    }

    const incidentExists = await connection('incidents').where('id', id);

    if (!incidentExists.length) {
      return res.status(400).json({ error: 'Incidente inexistente' });
    }

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operação não autorizada' });
    }

    await connection('incidents').where('id', id).delete();

    return res.status(204).send();
  }
}

export default new IncidentController();
