import fs from "fs";

class Cart {
    constructor() {
      this.id = Date.now();
      this.products = [];
    }
  }
  const cart = new Cart()

class CartManager {

  constructor(filename) {
    (this.products = []),
      (this.path = "./files"),
      (this.filename = this.path + filename);
  }


  // funcion para validar la existencia del archivo
  validateFileExistance = (ruta) => {
    try {
      if (!fs.existsSync(ruta)) fs.writeFileSync(ruta, "[]");
    } catch (err) {
      console.error(`ERROR no se pudo crear el archivo del Carrito: ${err}`);
    }
  };

  addCart = async () => {
    try {
        this.validateFileExistance(this.filename);

      this.products.push(cart);
      console.log(`Se cargo el carrito`);
      await fs.promises.writeFile(this.ruta, JSON.stringify(this.arrayCarts));
    } catch (err) {
      console.error(`ERROR agregando Carrito: ${err}`);
    }
  };


  addProductCar = async (cid, pid) => {
    try {
      let flag = 0;
      this.validateFileExistance(this.filename);
      let arrayC = JSON.parse(await fs.promises.readFile(this.filename, "utf-8"));
      for (const obj of arrayC) {
        /** Encuentra el carrito con el id indicado */
        if (obj.id === cid) {
          for (const ob of obj.products) {
            /* Encuentra el producto en el carrito => suma cantidad */
            if (ob.id === pid) {
              ob.quantity++;
              flag = 1;
            }
          }

          /* No encuentra el producto en el carrito => lo agrega */
          if (flag === 0) {
            let newP = {
              id: pid,
              quantity: 1,
            };
            obj.products.push(newP);
          }
        }
      }
      await fs.promises.writeFile(this.filename, JSON.stringify(arrayC));
    } catch (err) {
      console.error(`ERROR no se pudo agregar el producto al carrito ${err}`);
    }
  };


  getCartById = async (id) => {
    try {
      let prod = {};
      this.validateFileExistance(this.filename);
      let arrayP = JSON.parse(await fs.promises.readFile(this.filename, "utf-8"));
      for (const obj of arrayP) if (obj.id === id) prod = { ...obj };

      return prod;
    } catch (err) {
      console.error(`ERROR obteniendo el Carrito por ID: ${err}`);
    }
  };


}

export default CartManager;
