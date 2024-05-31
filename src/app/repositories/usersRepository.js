const db = require('../../database');

// const users = [
//   {
//     id: v4(),
//     name: 'Rafael Lang',
//     CPF: '000.000.000-00',
//     email: 'rafael.lang9@gmail.com',
//     senha: '1234',
//     inscricaoEstadual: '283331112',
//   },
//   {
//     id: v4(),
//     name: 'Jose silva',
//     CPF: '111.111.111-11',
//     email: 'jose.silva@gmail.com',
//     senha: '1234',
//     inscricaoEstadual: '283331112',
//   },
// ];

// Responsabilidade do Repository é exclusivamente acessar nossa fonta de dados DataSource
// Quem trata os erros, de conexao ou outro, é o controller
class UsersRepository {
  async findAll() {
    const rows = await db.query('SELECT * FROM users');
    return rows;
  }

  // TypeError: object is not iterable - verificar se a promise esta com await
  async findById(id) {
    const [row] = await db.query('SELECT * FROM users WHERE id = $1', [id]);
    return row;
  }

  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM users WHERE email = $1', [email]);
    return row;
  }

  async create({
    name, cpf, email, senha, ie,
  }) {
    // row sao todos os registros das tabelas de nosso db. row = linha
    // quando inserimos daods, inserimos nas linhas (row), pois as colunas sao nossa TABLES
    const [row] = await db.query(`
      INSERT INTO users(name, cpf, email, senha, ie)
      VALUES($1, $2, $3, $4, $5)
      RETURNING *
    `, [name, cpf, email, senha, ie]);

    return row;
  }

  async update(id, {
    name, cpf, email, senha, ie,
  }) {
    // Para retornar com os dados preenchidos: RETURNING *
    const [row] = await db.query(`
      UPDATE users
      SET name = $1, cpf = $2, email = $3, senha = $4, ie = $5
      WHERE id = $6
      RETURNING *
    `, [name, cpf, email, senha, ie, id]);
    return row;
  }

  async delete(id) {
    const deleteOp = await db.query('DELETE FROM users WHERE id = $1', [id]);
    return deleteOp;
  }
}

module.exports = new UsersRepository();
