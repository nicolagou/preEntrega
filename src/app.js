import express from 'express';
import productRouter from "./routes/products.router.js"
import cartRouter from "./routes/carts.router.js"


const app = express();
const PORT = 8080;

//Preparar la configuracion del servidor para recibir objetos JSON.
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Routers/endpoints
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.get("/", (req,res)=>{
    res.send("Hola mundo");
});

//Escucho al servidor
app.listen(PORT, ()=>{
console.log(`Servidor escuchando en el puerto ${PORT}`);
});
