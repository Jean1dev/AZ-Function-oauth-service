import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { MONGO_CONNECTION, SECRET } from '../shared/contants'
import * as mongoose from 'mongoose'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import UsuarioModel from '../shared/model/usuario'

mongoose.connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('conectado com o mongo')
})

function returnFail(context: Context, status, body) {
    context.res = {
        status,
        body
    }

    context.done()
    throw new Error('Falha na execucao da funcao')
}

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { login, password } = req.body

    const usuario = await UsuarioModel.findOne({ login }).exec()
    if (!usuario)
        returnFail(context, 404, { message: 'Usuario nao encontrado' })

    const passwordMatch = await compare(password, usuario.password)

    if (!passwordMatch)
        returnFail(context, 401, { message: 'Senha não confere' })

    const token = sign({}, SECRET, {
        expiresIn: '7d',
        subject: usuario.login
    })

    context.res = {
        body: {
            token,
            usuario: {
                login: usuario.login
            }
        }
    }
};

export default httpTrigger;
