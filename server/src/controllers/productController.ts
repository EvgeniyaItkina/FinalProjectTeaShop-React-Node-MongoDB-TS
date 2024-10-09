import { Response, Request } from "express";
import Joi from "joi";

const schemaJoi = Joi.object({
  name: Joi.string().required(),
  category: Joi.string().required(),
  subCategory: Joi.string(),
  ingredients: Joi.array().items(Joi.string()),
  price: Joi.number().required(),
  weight: Joi.number().required(),
  image: Joi.string(),
});

async function createProduct(req: Request, res: Response) {
  try {
    const { name, price, stock } = req.body;
    const { error, value } = schemaJoi.validate({
      name,
      price,
      stock,
    });

    if (error) {
      throw Error(error.message);
    }

    const product = new Product(value);

    await product.save();
    res.send({ error: 0, message: "Product created" });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
}

// export async function getUserData(req: Request, res: Response) {
//     try {

//       const user = await User.findOne({ _id: decoded.userId });
//       if (!user) {
//         res.status(404).send();
//         return;
//       }
//       res.send({ data: user });
//     } catch (error: any) {
//       res.status(400).send({ error: error.message });
//     }
//   }
