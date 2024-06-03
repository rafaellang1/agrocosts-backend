const FarmsRepository = require('../repositories/farmsRepository');

class FarmController {
  // Show all
  async index(request, response) {
    const farms = await FarmsRepository.findAll();

    response.json(farms);
  }

  // Create
  async store(request, response) {
    const {
      name, ie, size, location, user_id,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Preenchimento do nome é obrigatório' });
    }

    const farmExists = await FarmsRepository.findByIe(ie);
    if (farmExists) {
      return response.status(400).json({ error: 'Esta fazenda ja esta cadastrada' });
    }

    const farm = await FarmsRepository.create({
      name, ie, size, location, user_id,
    });

    response.json(farm);
  }

  // Show by Id
  async show(request, response) {
    const { id } = request.params;

    const farm = await FarmsRepository.findById(id);

    if (!farm) {
      // fazenda nao encontrada
      return response.status(404).json({ error: 'Fazenda nao encontrada' });
    }

    response.json(farm);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, ie, size, location, user_id,
    } = request.body;

    const farmExists = await FarmsRepository.findById(id);
    if (!farmExists) {
      return response.status(400).json({ error: 'Fazenda nao encontrada' });
    }

    if (!name) {
      return response.status(400).json({ error: 'Preenchimento do nome é obrigatório' });
    }

    const farmByIe = await FarmsRepository.findByIe(ie);
    // Se for uma ie que ja possua no DB, retorna erro.
    if (farmByIe && farmByIe.id !== id) {
      return response.status(400).json({ error: 'Essa IE ja possui cadastro' });
    }

    const farm = await FarmsRepository.update(id, {
      name, ie, size, location, user_id,
    });

    response.json(farm);
  }

  async delete(request, response) {
    const { id } = request.params;

    const farm = await FarmsRepository.findById(id);

    if (!farm) {
      // usuario nao encontrado
      return response.status(404).json({ error: 'Fazenda não encontrada' });
    }

    await FarmsRepository.delete(id);

    response.sendStatus(204); // 204 retorno sem body
  }
}

module.exports = new FarmController();
