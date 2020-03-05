import * as Yup from 'yup';
import Delivery from '../models/Delivery';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll();

    if (!deliveries) {
      return res.status(400).json({ error: 'Deliveries not exists' });
    }

    return res.status(400).json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.create(req.body);

    return res.status(201).json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    await delivery.update(req.body);

    return res.status(200).json(delivery);
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    await delivery.destroy();

    return res.status(200).json({ message: 'Delivery deleted with success' });
  }
}

export default new DeliveryController();
