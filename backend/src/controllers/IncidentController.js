const connection = require('../database/connection');

module.exports = {
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();
    response.header('X-Total-Count', count['count(*)']);

    const incidents = await connection('incidents')
      .select([
        'incidents.*',
        'ongs.name',
        'ongs.email',
        'ongs.whatsapp',
        'ongs.city',
        'ongs.uf'
      ])
      .limit(5)
      .offset((page - 1) * 5)
      .join('ongs', 'ongs.id', '=', 'incidents.ong_id');
    return response.json(incidents);
  },

  async create(request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('incidents').insert({
      ong_id,
      title,
      description,
      value
    });

    return response.json({ id });
  },

  async delete(request, response) {
    const { id } = request.params;
    const ongs_id = request.headers.authorization;

    const incident = await connection('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if (incident.ong_id !== ongs_id) {
      return response.status(401).json({ error: 'Operation not permitted.' });
    }

    await connection('incidents')
      .where('id', id)
      .delete();

    return response.status('204').send();
  }
};