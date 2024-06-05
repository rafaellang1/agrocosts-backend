const ProductsRepository = require('../repositories/productsRepository');

class ProductController {
  // Show all
  async index(request, response) {
    const farms = await ProductsRepository.findAll();

    response.json(farms);
  }

  // Create
  async store(request, response) {
    const {
      name, description, quantity, aplication_area, unit_value, total_value, farm_id, harvest_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Preenchimento do nome é obrigatório' });
    }

    const product = await ProductsRepository.create({
      name, description, quantity, aplication_area, unit_value, total_value, farm_id, harvest_id,
    });

    response.json(product);
  }

  async show(request, response) {
    const { id } = request.params;

    const product = await ProductsRepository.findById(id);

    if (!product) {
      // produto nao encontrada
      return response.status(404).json({ error: 'Produto nao encontrado ou nao cadastrado' });
    }

    response.json(product);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, description, quantity, aplication_area, unit_value, total_value, farm_id, harvest_id,
    } = request.body;

    const productExists = await ProductsRepository.findById(id);
    if (!productExists) {
      // produto nao encontrada
      return response.status(404).json({ error: 'Produto nao encontrado ou nao cadastrado' });
    }

    const product = await ProductsRepository.update(id, {
      name, description, quantity, aplication_area, unit_value, total_value, farm_id, harvest_id,
    });

    response.json(product);
  }

  async delete(request, response) {
    const { id } = request.params;

    const product = await ProductsRepository.findById(id);

    if (!product) {
      // produto nao encontrado
      return response.status(404).json({ error: 'Produto nao encontrado ou nao cadastrado' });
    }

    await ProductsRepository.delete(id);

    response.sendStatus(204); // 204 retorno sem body
  }
}

module.exports = new ProductController();
