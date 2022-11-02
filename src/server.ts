import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'
import Redis from 'ioredis';
import mongoose from 'mongoose';
import assert from "assert";

// 初始化各服务的连接 redis, mongo
async function initService() {
    const {REDIS_ADDRESS, REDIS_USERNAME, REDIS_PASSWORD, MONGO_ADDRESS, MONGO_USERNAME, MONGO_PASSWORD} = process.env;
    const [ REDIS_HOST, REDIS_PORT] = REDIS_ADDRESS.split(':');
    const redis = new Redis({
        port: parseInt(REDIS_PORT, 10),
        host: REDIS_HOST,
        username: REDIS_USERNAME,
        password: REDIS_PASSWORD,
        db: 0,
    });

    assert(await redis.echo('echo') === 'echo', `redis echo error`);

    const mongoUrl = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_ADDRESS}`;
    await mongoose.connect(mongoUrl);    

    return {
        redis,
        mongoose,
    }
}

initService().then(async ({ redis, mongoose}) => {
    const kittySchema = new mongoose.Schema({
        name: String
    });

    const Kitten = mongoose.model('Kitten', kittySchema);

    const app = new Koa();

    const router = new Router();
    router.get('/', ctx => {
        ctx.body = `Nodejs koa demo project`;
    }).get('/api/get_data_from_redis', async(ctx) => {
        const key = ctx.query.key as string;
        assert(key?.trim(), `key is required`);
        const value = await redis.get(key);
        if (value) {
            ctx.body = {
                success: true,
                data: value,
            }
        } else {
            ctx.status = 404;
            ctx.body = {
                success: false,
                message: `${key} not exist`,
            }
        }
    }).post('/api/set_data_to_redis', async(ctx) => {
        const key = ctx.query.key as string;
        const value = ctx.request.body.value as string;
        assert(key?.trim(), `key is required`);
        assert(value?.trim(), `value is required`);
        await redis.set(key, value);
        ctx.body = {
            success: true,
        }
    }).get('/api/get_data_from_mongodb', async(ctx) => {
        const name = ctx.query.name as string;
        assert(name?.trim(), `name is required`);
        const data = await Kitten.findOne({ name});
        
        if (data) {
            ctx.body = {
                success: true,
                data: data.toJSON(),
            }
        } else {
            ctx.status = 404;
            ctx.body = {
                success: false,
                message: `${name} not exist`,
            }
        }
    }).post('/api/set_data_to_mongodb', async(ctx) => {
        const name = ctx.query.name as string;
        assert(name?.trim(), `name is required`);

        const kit = new Kitten({ name });
        await kit.save();

        ctx.body = {
            success: true,
        }
    });

    app.use(bodyParser());
    app.use(router.routes());

    const PORT = 8000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

}).catch((error: string) => console.log("Init service  error: ", error));