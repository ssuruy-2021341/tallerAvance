const express = require('express');
const cors = require('cors');
const {dbConection} = require('../database/config');

class Server{
    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.categoriaPath = '/api/categorias'
        this.productoPath = '/api/productos'
        this.usuarioPath = '/api/usuarios'

        this.conectarDB();
        this.middlewares();
        this.routes();
    }
    async conectarDB(){
        await dbConection();
    }
    middlewares(){
        this.app.use(cors());
        this.app.use(express.static('public'));
         this.app.use( express.json() );
    }
    routes(){
        this.app.use(this.categoriaPath, require('../routes/categoria'));
        this.app.use(this.productoPath, require('../routes/producto'));
        this.app.use(this.usuarioPath, require('../routes/usuario'));
    }
    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        })
    }
}
module.exports = Server;