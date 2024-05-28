const { v4 } = require('uuid');

let users = [
  {
    id: v4(),
    name: 'Rafael Lang',
    CPF: '000.000.000-00',
    email: 'rafael.lang9@gmail.com',
    senha: '1234',
    inscricaoEstadual: '283331112',
  },
  {
    id: v4(),
    name: 'Jose silva',
    CPF: '111.111.111-11',
    email: 'jose.silva@gmail.com',
    senha: '1234',
    inscricaoEstadual: '283331112',
  },
];

// Responsabilidade do Repository é exclusivamente acessar nossa fonta de dados DataSource
// Quem trata os erros, de conexao ou outro, é o controller
class UsersRepository {
  findAll() {
    return new Promise((resolve) => {
      resolve(users);
    });
  }

  findById(id) {
    return new Promise((resolve) => {
      const foundUser = users.find((user) => user.id === id);
      resolve(foundUser);
    });
  }

  findByEmail(email) {
    return new Promise((resolve) => {
      const foundEmail = users.find((user) => user.email === email);
      resolve(foundEmail);
    });
  }

  delete(id) {
    return new Promise((resolve) => {
      users = users.filter((user) => user.id !== id);
      resolve();
    });
  }

  create({
    name, cpf, email, senha, ie,
  }) {
    return new Promise((resolve) => {
      const newUser = {
        id: v4(),
        name,
        cpf,
        email,
        senha,
        ie,
      };

      users.push(newUser);
      resolve(newUser);
    });
  }

  update(id, {
    name, cpf, email, senha, ie,
  }) {
    return new Promise((resolve) => {
      const updatedUser = {
        id,
        name,
        cpf,
        email,
        senha,
        ie,
      };

      users = users.map((user) => (
        user.id === id ? updatedUser : user
      ));

      resolve(updatedUser);
    });
  }
}

module.exports = new UsersRepository();
