import express from "express";
import cors from "cors";
import {prisma} from "../src/lib/prisma.ts";
import bcrypt from "bcryptjs";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.get("/alunos", async (req, res) =>{
    const procurarAlunos = await prisma.alunos.findMany({
        select: {
            id: true,
            nome: true,
            email: true
        }
    })
    res.json(procurarAlunos)
});

app.post("/registrar", async (req, res) =>{
    const {nome, email, senha} = req.body
    const salt = await bcrypt.genSalt(10);
    const senhaHash = await bcrypt.hash(senha, salt);
    const criarAlunos = await prisma.alunos.create({
        data: {
            nome,
            email,
            senha: senhaHash
        }
    })
    res.json(criarAlunos)
});

app.post("/login", async (req, res) =>{
    try{
    const {email, senha} = req.body
    
    const loginAlunos = await prisma.alunos.findUnique({
        where: {email}
    })

    if(!loginAlunos){
        return res.status(401).json({error: "Credenciais Inválidas"})
    }

    const senhaValida = await bcrypt.compare(senha, loginAlunos.senha)
    if(!senhaValida){
        return res.status(401).json({error: "Credenciais Inválidas"})
    }
        res.status(200).json({ message: "Login realizado com sucesso"})
        }catch(err){
            res.status(500).json({error: "Erro interno no server"})
        }
});


app.put("/alunos/:id", async (req, res) => {
    const { id } = req.params;
    const { nome, email, senha } = req.body;

    const dados = {
        nome,
        email
    };

    if (senha) {
        dados.senha = await bcrypt.hash(senha, 10);
    }

    const atualizarAlunos = await prisma.alunos.update({
        where: { id: Number(id) },
        data: dados,
        select: {
            id: true,
            nome: true,
            email: true
        }
    });

    res.json(atualizarAlunos);
});

app.delete("/alunos/:id", async (req, res) => {
    const {id} = req.params
    const deletarAlunos = await prisma.alunos.delete({
        where: {id: Number(id)}
    })
    res.json(deletarAlunos)
});

app.listen(PORT ,() => {
    console.log("API rodando na porta 3000")
});