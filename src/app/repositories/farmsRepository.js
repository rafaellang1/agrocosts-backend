const db = require('../../database');

class FarmsRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT farms.*, users.name AS user_name
      FROM farms
      LEFT JOIN users ON users.id = farms.user_id
    `);
    return rows;
    // users.name AS user_ui neste contexto apenas na query o users (proprietario)
    // passa a ser user_name, renomeio a a propriedade apenas aqui sem alterar na tabela
    // LEFT para retornar os dados da tabela a esquerda mesmo que nao tenha user cadastrado na farm
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT farms.*, users.name AS user_name
      FROM farms
      LEFT JOIN users ON users.id = farms.user_id
      WHERE farms.id = $1
    `, [id]);
    return row;
  }

  async findByIe(ie) {
    const [row] = await db.query('SELECT * FROM farms WHERE ie = $1', [ie]);
    return row;
  }

  async create({
    name, ie, size, location, user_id,
  }) {
    const [row] = await db.query(`
      INSERT INTO farms(name, ie, size, location, user_id)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, ie, size, location, user_id]);

    return row;
  }

  async update(id, {
    name, ie, size, location, user_id,
  }) {
    const [row] = await db.query(`
      UPDATE farms
      SET name = $1, ie = $2, size = $3, location = $4, user_id = $5
      WHERE id = $6
      RETURNING *
    `, [name, ie, size, location, user_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM farms WHERE id = $1', [id]);
    return deleteOp;
  }
}
module.exports = new FarmsRepository();
