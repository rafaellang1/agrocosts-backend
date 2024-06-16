const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
const UsersRepository = require('../repositories/usersRepository');

class UserController {
  // Request de login
  async login(request, response) {
    const { email, senha } = request.body;

    const user = await UsersRepository.findByEmail(email);

    if (!user || user.senha !== senha) {
      return response.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id }, 'your_jwt_secret', { expiresIn: '1H' });

    response.json({ token });
  }

  async index(request, response) {
    // utilizamos o methodo async await pq a consulta ao DB é uma op bloqueante, nao simultanea
    const users = await UsersRepository.findAll();

    response.json(users);
  }

  async show(request, response) {
    const { id } = request.params;

    const user = await UsersRepository.findById(id);

    if (!user) {
      // usuario nao encontrado
      return response.status(404).json({ error: 'User not found' });
    }

    response.json(user);
  }

  // Criar novo usuario
  async store(request, response) {
    const {
      name, cpf, email, senha, ie,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Preenchimento do nome é obrigatório' });
    }

    const userExists = await UsersRepository.findByEmail(email);
    if (userExists) {
      return response.status(400).json({ error: 'Este email ja esta cadastrado' });
    }

    const user = await UsersRepository.create({
      name, cpf, email, senha, ie,
    });

    response.json(user);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, cpf, email, senha, ie,
    } = request.body;

    const userExists = await UsersRepository.findById(id);
    if (!userExists) {
      return response.status(404).json({ error: 'Usuario nao encontrado' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Preenchimento do nome é obrigatório' });
    }

    const userByEmail = await UsersRepository.findByEmail(email);
    if (userByEmail && userByEmail.id !== id) {
      return response.status(400).json({ error: 'Este email ja esta cadastrado!!' });
    }

    const user = await UsersRepository.update(id, {
      name, cpf, email, senha, ie,
    });

    response.json(user);
  }

  // Deletar um usuario
  async delete(request, response) {
    const { id } = request.params;

    const user = await UsersRepository.findById(id);

    if (!user) {
      // usuario nao encontrado
      return response.status(404).json({ error: 'User not found' });
    }

    await UsersRepository.delete(id);

    response.sendStatus(204); // 204 retorno sem body
  }
}

module.exports = new UserController();
