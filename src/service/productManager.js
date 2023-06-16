import fs from "fs";

class ProductManager {
  static id = 0;

  constructor(filename) {
    (this.products = []),
      (this.path = "./files"),
      (this.filename = this.path + filename);
  }
  //en el test llamare a const product = new ProductManager("/products.json");

  // funcion para validar la existencia del archivo
  validateFileExistance = (ruta) => {
    try {
      if (!fs.existsSync(ruta)) fs.writeFileSync(ruta, "[]");
    } catch (err) {
      console.error(`ERROR no se pudo crear el archivo del Producto: ${err}`);
    }
  };

  //Metodos
  addProduct = async (product) => {
    // crear el Directorio this.path="./files"
    try {
      await fs.promises.mkdir(this.path, { recursive: true });
    } catch (err) {
      console.error(`ERROR al crear directorio del producto: ${err}`);
    }

    try {
      this.validateFileExistance(this.filename);
      if (this.validateProductDataEntry(product)[0] == 0) {
        
        product.id = ++ProductManager.id;
        this.products.push(product);

        // Escribo el archivo (writeFile)
        await fs.promises.writeFile(this.filename, JSON.stringify(this.products));
        console.log(`Producto con id ${product.id} agregado correctamente`);
      } else{
        console.log(this.validateProductDataEntry(product)[1]);
      }

    } catch (err) {
      console.error(`ERROR agregando Productos: ${err}`);
    }
  };

  getProducts = async () => {
    try {
      this.validateFileExistance(this.filename);
      // lectura de archivo y convertir a Objeto (ya que el objeto agregado es un string)
      let resultado = await fs.promises.readFile(this.filename, "utf-8");
      let parsedRes = await JSON.parse(resultado);
      console.log("Lectura de archivo");
      console.log(parsedRes);
      return parsedRes;
    } catch (err) {
      console.error(`ERROR obteniendo Productos: ${err}`);
    }
  };

  getProductById = async (id) => {
    try {
      this.validateFileExistance(this.filename);
      let resultado = await fs.promises.readFile(this.filename, "utf-8");
      let parsedRes = await JSON.parse(resultado);

      const filteredArr = parsedRes.find(
        // compare id param vs id from products array
        (product) => product.id == id
      );
      if (filteredArr) {
        console.log(filteredArr);
        return filteredArr;
      } else {
        console.log(`El producto con id: ${id} no existe`);
        return "";
      }
    } catch (err) {
      console.error(`ERROR obteniendo Producto por ID: ${err}`);
    }
  };

  updateProductById = async (id, updatedData) => {
    try {
      this.validateFileExistance(this.filename);
      let resultado = await fs.promises.readFile(this.filename, "utf-8");
      let parsedRes = await JSON.parse(resultado);

      if (await this.getProductById(id)) {
        const newArr = parsedRes.map((item) => {
          return id == item.id ? { ...item, ...updatedData } : item;
        });

        // sobreescribo el contenido de lo almacenado en la ruta this.filename
        await fs.promises.writeFile(this.filename, JSON.stringify(newArr));
        console.log("Producto actualizado correctamente");
      } else {
        console.log(`El producto con id: ${id} no existe`);
      }
    } catch (err) {
      console.error(`ERROR actualizando Producto: ${err}`);
    }
  };

  deleteProductById = async (id) => {
    try {
      this.validateFileExistance(this.filename);
      let resultado = await fs.promises.readFile(this.filename, "utf-8");
      let parsedRes = await JSON.parse(resultado);

      if (await this.getProductById(id)) {
        const newArr = parsedRes.filter((item) => item.id !== id);
        await fs.promises.writeFile(this.filename, JSON.stringify(newArr));
        console.log("Producto eliminado");
      } else {
        console.log(`El producto con id: ${id} no existe`);
      }
    } catch (err) {
      console.log(`ERROR borrando Producto por ID: ${err}`);
    }
  };


  getProductByCode = (code) => {
    for (const obj of this.products) if (obj.code === code) return obj;
  };

  validateProductDataEntry = (product) => {
    if (
      product.title == "" ||
      product.description == "" ||
      product.price == "" ||
      product.thumbnail == "" ||
      product.code == "" ||
      product.stock == "" ||
      product.status == "" ||
      product.category == ""
    ) {
      return [1, "Existen parámetros de ingreso en blanco"];
    }
    if (
      product.title == undefined ||
      product.description == undefined ||
      product.price == undefined ||
      product.thumbnail == undefined ||
      product.code == undefined ||
      product.stock == undefined ||
      product.status == undefined ||
      product.category == undefined
    ) {
      return [1, "Faltan parámetros de ingreso"];
    }

    if (this.getProductByCode(product.code) != undefined) {
      return [1, `El código ${product.code} ya existe para otro producto`];
    }

    return [0, "Validaciones OK"];
  };
  
}

export default ProductManager;
