import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from '@koa/router'
import axios from 'axios';
const app = new Koa();
const router = new Router();
router.get('/', ctx => {
    ctx.body = `Nodejs koa demo project`;
}).get('/api/get_open_id', async (ctx) => {
    const value = ctx.request.header['x-tt-openid'] as string;
    if (value) {
        ctx.body = {
            success: true,
            data: value,
        }
    } else {
        ctx.body = {
            success: false,
            message: `dyc-open-id not exist`,
        }
    }
}).post('/api/text/antidirt', async (ctx) => {
    const body: any = ctx.request.body;
    const content = body.content;
    const res = await axios.post('http://developer.toutiao.com/api/v2/tags/text/antidirt', {
        "tasks": [
          {
            "content": content
          }
        ]
      });
    ctx.body = {
        "result": res.data,
        "success": true,
    }
});

app.use(bodyParser());
app.use(router.routes());

const PORT = 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
