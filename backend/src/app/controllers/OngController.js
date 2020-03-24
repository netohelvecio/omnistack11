import axios from 'axios';
import crypto from 'crypto';
import * as Yup from 'yup';

import connection from '../../database';

class OngController {
  async create(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      whatsapp: Yup.string().required(),
      cep: Yup.string().min(9).max(9).required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res
        .status(400)
        .json({ error: 'Formulario inválido, verifique os dados' });
    }

    const { name, email, whatsapp, cep } = req.body;

    const cepFormatted = cep.replace(/[^\d]+/g, '');
    const whatsappFormatted = whatsapp.replace(/[^\d]+/g, '');

    const id = crypto.randomBytes(4).toString('HEX');

    try {
      const { data } = await axios.get(
        `https://viacep.com.br/ws/${cepFormatted}/json/`
      );

      if (data.erro) {
        return res.status(400).json({ error: 'CEP inválido' });
      }

      await connection('ongs').insert({
        id,
        name,
        email,
        whatsapp: whatsappFormatted,
        cep: cepFormatted,
        city: data.localidade,
        neighborhood: data.bairro,
        uf: data.uf,
      });

      return res.json({ id });
    } catch (err) {
      return res.status(400).json({ error: 'CEP inválido' });
    }
  }

  async index(req, res) {
    const ongs = await connection('ongs').select('*');

    return res.json(ongs);
  }
}

export default new OngController();
