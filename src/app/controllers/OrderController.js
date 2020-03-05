import * as Yup from 'yup';
import Order from '../models/Order';

class OrderController {
  async index(req, res) {
    return res.json();
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      signature_id: Yup.number().required(),
      product: Yup.string()
        .required()
        .min(3),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { recipient_id, deliveryman_id } = req.body;

    if (!recipient_id || !deliveryman_id) {
      return res
        .status(400)
        .json({ error: 'Recipient or Delivery Man not found' });
    }

    const order = await Order.create(req.body);

    return res.status(201).json(order);
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    return res.json();
  }
}

export default new OrderController();
