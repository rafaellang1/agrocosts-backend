const db = require('../../database');

class ProductsRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT products.*,
      farms.name AS farm_name,
      harvests.name AS current_harvest
      FROM products
      LEFT JOIN farms ON farms.id = products.farm_id
      LEFT JOIN harvests ON harvests.id = products.harvest_id
    `);
    return rows;
    // users.name AS user_ui neste contexto apenas na query o users (proprietario)
    // passa a ser user_name, renomeio a a propriedade apenas aqui sem alterar na tabela
    // LEFT para retornar os dados da tabela a esquerda mesmo que nao tenha user cadastrado na farm
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT products.*,
      farms.name AS farm_name,
      harvests.name AS current_harvest
      FROM products
      LEFT JOIN farms ON farms.id = products.farm_id
      LEFT JOIN harvests ON harvests.id = products.harvest_id
      WHERE products.id = $1
    `, [id]);
    return row;
  }

  async create({
    name, description, quantity, aplication_area, unit_value, farm_id, harvest_id,
  }) {
    const total_value = quantity * unit_value;
    const [row] = await db.query(`
      INSERT INTO products(name, description, quantity, aplication_area, unit_value, total_value, farm_id, harvest_id)
      VALUES($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *
    `, [name, description, quantity, aplication_area, unit_value, total_value, farm_id, harvest_id]);
    return row;
  }

  async update(id, {
    name, description, quantity, aplication_area, unit_value, farm_id, harvest_id,
  }) {
    const total_value = quantity * unit_value;
    const [row] = await db.query(`
      UPDATE products
      SET name = $1, description = $2, quantity = $3, aplication_area = $4, unit_value = $5, total_value = $6, farm_id = $7, harvest_id = $8
      WHERE id = $9
      RETURNING *
    `, [name, description, quantity, aplication_area, unit_value, total_value, farm_id, harvest_id, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM products WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new ProductsRepository();
