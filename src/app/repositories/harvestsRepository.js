const db = require('../../database');

class HarvestController {
  async findAll() {
    const rows = await db.query('SELECT * FROM harvests');
    return rows;
  }

  // TypeError: object is not iterable - verificar se a promise esta com await
  async findById(id) {
    const [row] = await db.query('SELECT * FROM harvests WHERE id = $1', [id]);
    return row;
  }

  async create({
    name, start_date, end_date,
  }) {
    const [row] = await db.query(`
      INSERT INTO harvests(name, start_date, end_date)
      VALUES($1, $2, $3)
      RETURNING *
    `, [name, start_date, end_date]);

    return row;
  }

  async update(id, {
    name, start_date, end_date,
  }) {
    // Para retornar com os dados preenchidos: RETURNING *
    const [row] = await db.query(`
      UPDATE harvests
      SET name = $1, start_date = $2, end_date = $3
      WHERE id = $4
      RETURNING *
    `, [name, start_date, end_date, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM harvests WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new HarvestController();
