const db = require('../../database');

class ProductsRepository {
  async findAll() {
    const rows = await db.query(`
      SELECT products.*, farms.name AS farm_name
      FROM products
      LEFT JOIN farms ON farms.id = products.farm_id
    `);
    return rows;
    // users.name AS user_ui neste contexto apenas na query o users (proprietario)
    // passa a ser user_name, renomeio a a propriedade apenas aqui sem alterar na tabela
    // LEFT para retornar os dados da tabela a esquerda mesmo que nao tenha user cadastrado na farm
  }

  async findById(id) {
    const [row] = await db.query(`
      SELECT products.*, farms.name AS farm_name
      FROM products
      LEFT JOIN products ON farms.id = products.farm_id
      WHERE products.id = $1
    `, [id]);
    return row;
  }

  async create({
    name, description, quantity, aplication_area, unit_value, farm_id,
  }) {
    const total_value = quantity * unit_value;
    const [row] = await db.query(`
      INSERT INTO products(name, description, quantity, aplication_area, unit_value, total_value, farm_id)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [name, description, quantity, aplication_area, unit_value, total_value, farm_id]);
    return row;
  }
}

module.exports = new ProductsRepository();
