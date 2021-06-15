import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { verify } from 'jsonwebtoken'
import { SECRET } from '../shared/contants';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    const { authorization } = req.body
    const [, token] = authorization.split(' ')
    try {
        const decoded = verify(token, SECRET)
        const { sub } = decoded
        context.res = {
            body: sub
        }
    } catch (error) {
        context.log(error.message)
        context.res = {
            status: 400,
            body: { message: 'Token invalido'}
        }
    }
};

export default httpTrigger;
