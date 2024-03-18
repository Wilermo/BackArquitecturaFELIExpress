const express = require('express')
const {mongoose} = require("mongoose");
const app = express()
const cors = require("cors")
const Usuario = require('./models/usuarioModel')

app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send("Hello from Node API Server!!")
})

app.get('/usuario',async (req,res) => {
    try{
        const usuario_1 = await Usuario.find({})
        res.status(200).json(usuario_1)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
})

app.get('/usuario/:id',async (req,res) => {
    try{
        const {id} = req.params
        const usuario_1 = await Usuario.findById(id)
        res.status(200).json(usuario_1)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
})

app.post('/usuario',async (req,res) => {
    try{
        const usuario_1 = await Usuario.create(req.body)
        res.status(200).json(usuario_1)
    }catch(error){
        console.log(error)
        res.status(500).json({message: error.message})
    }
})

// En Express
app.put('/usuario/:documento', async (req, res) => {
    try {
        const { documento } = req.params;
        const { nombre } = req.body;

        // Actualizar el usuario por documento
        const usuarioActualizado = await Usuario.findOneAndUpdate(
            { documento: documento },
            { nombre: nombre },
            { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(404).json({ message: `No se encontró ningún usuario con documento ${documento}` });
        }

        res.status(200).json(usuarioActualizado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

app.delete('/usuario/:documento', async (req, res) => {
    try {
        const { documento } = req.params;

        // Eliminar el usuario por documento
        const usuarioEliminado = await Usuario.findOneAndDelete({ documento: documento });

        if (!usuarioEliminado) {
            return res.status(404).json({ message: `No se encontró ningún usuario con documento ${documento}` });
        }

        res.status(200).json(usuarioEliminado);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

mongoose.connect("mongodb://pipearias0902:pipe123@ac-hxnldce-shard-00-00.jtvk00y.mongodb.net:27017,ac-hxnldce-shard-00-01.jtvk00y.mongodb.net:27017,ac-hxnldce-shard-00-02.jtvk00y.mongodb.net:27017/?ssl=true&replicaSet=atlas-kg2lop-shard-0&authSource=admin&retryWrites=true&w=majority&appName=BackendDB")
    .then(() => {
        app.listen(3000)
        console.log('Connected to MongoDB !!!')
    }).catch((error) => {
        console.log(error);
    })
