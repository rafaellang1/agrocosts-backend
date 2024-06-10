const HarvestsRepository = require('../repositories/harvestsRepository');

class HarvestController {
  async index(request, response) {
    const harvests = await HarvestsRepository.findAll();

    response.json(harvests);
  }

  async show(request, response) {
    const { id } = request.params;

    const harvest = await HarvestsRepository.findById(id);

    if (!harvest) {
      // usuario nao encontrado
      return response.status(404).json({ error: 'Safra nao encontrada' });
    }

    response.json(harvest);
  }

  async store(request, response) {
    const {
      name, start_date, end_date,
    } = request.body;

    if (!name) {
      return response.status(400).json({ error: 'Preenchimento do nome da safra é obrigatório' });
    }

    const harvest = await HarvestsRepository.create({
      name, start_date, end_date,
    });

    response.json(harvest);
  }

  async update(request, response) {
    const { id } = request.params;
    const {
      name, start_date, end_date,
    } = request.body;

    const harvestExists = await HarvestsRepository.findById(id);
    if (!harvestExists) {
      return response.status(404).json({ error: 'Safra nao encontrada' });
    }

    const harvest = await HarvestsRepository.update(id, {
      name, start_date, end_date,
    });

    response.json(harvest);
  }

  async delete(request, response) {
    const { id } = request.params;

    const harvest = await HarvestsRepository.findById(id);

    if (!harvest) {
      // usuario nao encontrado
      return response.status(404).json({ error: 'Safra não encontrada' });
    }

    await HarvestsRepository.delete(id);

    response.sendStatus(204); // 204 retorno sem body
  }
}

module.exports = new HarvestController();
