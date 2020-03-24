import connection from '../../database';

class ProfileController {
  async index(req, res) {
    const { page = 1 } = req.query;
    const ong_id = req.headers.authorization;

    const ongExists = await connection('ongs').where('id', ong_id);

    if (!ongExists.length) {
      return res.status(400).json({ error: 'ONG inexistente' });
    }

    const incidents = await connection('incidents')
      .where('ong_id', ong_id)
      .select('*')
      .orderBy('created_at', 'desc')
      .paginate(10, page, true);

    return res.json(incidents);
  }
}

export default new ProfileController();
