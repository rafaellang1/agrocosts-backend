const db = require('../../database');

class FarmsRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM farms');
    return rows;
  }

  async findById(id) {
    const [row] = await db.query('SELECT * FROM farms WHERE id = $1', [id]);
    return row;
  }

  async findByIe(ie) {
    const [row] = await db.query('SELECT * FROM farms WHERE ie = $1', [ie]);
    return row;
  }

  async create({
    name, ie, size, location,
  }) {
    const [row] = await db.query(`
      INSERT INTO farms(name, ie, size, location)
      VALUES($1, $2, $3, $4)
      RETURNING *
    `, [name, ie, size, location]);

    return row;
  }

  async update(id, {
    name, ie, size, location,
  }) {
    const [row] = await db.query(`
      UPDATE farms
      SET name = $1, ie = $2, size = $3, location = $4
      WHERE id = $5
      RETURNING *
    `, [name, ie, size, location, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM farms WHERE id = $1', [id]);
    return deleteOp;
  }
}
module.exports = new FarmsRepository();
