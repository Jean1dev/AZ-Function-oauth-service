import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as mongoose from 'mongoose'
import { MONGO_CONNECTION } from '../shared/contants'
import { hash } from 'bcryptjs'
import UsuarioModel from '../shared/model/usuario'

mongoose.connect(MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('conectado com o mongo')
})

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { login, password } = req.body

    if (!login || !password) {
        context.res = {
            status: 404,
            body: {
                message: 'login ou password nao fornecido'
            }
        }

        return
    }

    const passwordHash = await hash(password, 8)
    const usuario = new UsuarioModel({ login, password: passwordHash })
    const usuarioSave = await usuario.save()
    context.res = {
        body: usuarioSave
    }
};

export default httpTrigger;
