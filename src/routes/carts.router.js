import { Router } from "express";
import CartManager from "../service/cartManager.js";

const router = Router();
// let products = [];
const car  = new CartManager("/carts.json");

// Cargar el Carrito
router.post("/", async (req, res) => {
    await car.addCart();
    res.status(200).send({
      status: "Success",
      message: `Se cargo el carrito`,
    });
  });

//   Obtengo carrito por ID
router.get("/:cid", async (req, res) => {
  carts = await car.getCartById(parseInt(req.params.cid));

  if (Object.keys(carts).length === 0) {
    res.status(202).send({
      status: "info",
      error: `No se encontró el carrito con ID: ${req.params.cid}`,
    });
  } else {
    res.status(200).send({ status: "Success", message: carts });
  }
});



export default router;