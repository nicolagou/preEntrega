import { Router } from "express";
import ProductManager from "../service/productManager.js";

const router = Router();
// let products = [];
const pm = new ProductManager("/products.json");

// Obtengo todos los productos
router.get("/", async (req, res) => {
  let products = await pm.getProducts();
  let limit = req.query.limit;
  res.status(200).send({
    status: "Success",
    msg: !limit ? products : products.slice(0, limit),
  });
});

// Obtengo el producto por ID
router.get("/:id", async (req, res) => {
  const productId = await pm.getProductById(req.params.id);
  productId ? res.send(productId) : res.send({ error: "not found" });
});

router.get("/:pid", async (req, res) => {
  products = await pm.getProductById(parseInt(req.params.pid));

  if (Object.keys(products).length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el producto con ID: ${req.params.pid}`,
    });
  } else {
    res.status(200).send({ status: "Success", msg: products });
  }
});

//Cargo el producto
router.post("/", async (req, res) => {
  let user = req.body;
  let validateProductDataEntry = pm.validateProductDataEntry(user);

  if (validateProductDataEntry[0] === 1) {
    res.status(400).send({ status: "Error", message: validateProductDataEntry[1] });
  } else {
  await pm.addProduct(user);
  res.status(200).send({
    status: "Success",
    msg: `Se cargo el producto Cod: ${user.code}`,
  });
}
});

//Actualizo producto por Id
router.put("/:pid", async (req, res) => {
  let user = req.body;
  let pid = parseInt(req.params.pid);
  let validateProductDataEntry = pm.validateProductDataEntry(user);
  if (validateProductDataEntry[0] === 1) {
    res.status(400).send({ status: "Error", message: validateProductDataEntry[1] });
  } else {
  await pm.updateProductById(pid, user);
  res.status(200).send({
    status: "Success",
    msg: `Se actualizó el producto Id: ${pid}`,
  });
}
});

// Elimino producto por Id
router.delete("/:pid", async (req, res) => {
    let pid = parseInt(req.params.pid);
    await pm.deleteProductById(pid);
    res.status(200).send({
      status: "Success",
      msg: `Se eliminó el producto ID: ${req.params.pid}`,
    });
  });

export default router;
