import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();

    return res.status(200).json(recipients);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string()
        .required()
        .min(3),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string()
        .required()
        .min(2),
      city: Yup.string().required(),
      zipcode: Yup.number().min(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation is fails' });
    }

    const recipient = await Recipient.create(req.body);

    return res.status(201).json(recipient);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string()
        .required()
        .min(3),
      number: Yup.number().required(),
      complement: Yup.string(),
      state: Yup.string()
        .required()
        .min(2),
      city: Yup.string().required(),
      zipcode: Yup.number().min(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation is fails' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    await recipient.update(req.body);

    return res.status(200).json({ recipient });
  }

  async delete(req, res) {
    const recipient = await Recipient.findByPk(req.params.id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    recipient.destroy();

    return res.status(200).json({ message: 'Recipient deleted with success' });
  }
}

export default new RecipientController();
