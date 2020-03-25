import connection from '../database/connection';

export default {
  async store(req, res) {
    const { ongId } = req.body;

    const ong = await connection('ongs')
      .where('id', ongId)
      .select('name')
      .first();

      if (!ong) {
        return res.status(400).json({ error : 'No ONG founf with this ID'});
      }

      return res.json(ong);
  }
}