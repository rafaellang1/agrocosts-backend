const ProductRepository = require('../repositories/productsRepository');

class ProductController {
  // Show all
  async index(request, response) {
    const farms = await ProductRepository.findAll();

    response.json(farms);
  }

  // Create
  async store(request, response) {
    const {
      name, description, quantity, aplication_area, unit_value, total_value, farm_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Preenchimento do nome é obrigatório' });
    }

    const product = await ProductRepository.create({
      name, description, quantity, aplication_area, unit_value, total_value, farm_id,
    });

    response.json(product);
  }

  show(request, response) {
    response.send('ok - show');
  }

  update(request, response) {
    response.send('ok - update');
  }

  delete(request, response) {
    response.send('ok - delete');
  }
}

module.exports = new ProductController();
