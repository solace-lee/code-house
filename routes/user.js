import {
    Controller,
    Post,
    Required,
    Get,
    Delete,
    Put,
    Log,
    Auth
} from '../decorator/router'

import {
  checkPassword,
  addNewUser,
  getAllUsers,
  changeRole,
  delUser
} from '../services/user'
import { returnBody } from '../services/common'

@Controller('/user')
export default class UserRouter {
    @Post('/login')
    @Required({
      body: ['username', 'password']
    })
    async userLogin (ctx, next) {
      const { username, password } = ctx.request.body
      const data = await checkPassword(username, password)
      const { user, match } = data
      if (match) return(ctx.body = returnBody(200, {id: user._id}, '登陆成功'))
      return ctx.body = returnBody(400, '', '账号或密码错误')
    }

    @Post('/sign')
    @Required({
      body: ['username', 'password']
    })
    async userSign (ctx, next) {
      const { username, password } = ctx.request.body
      const x = await addNewUser(username, password)
      ctx.body = x
    }

    @Get('/userinfo')
    @Auth(1)
    async userInfo (ctx, next) {
      ctx.body = returnBody(200, ctx.request.body.userinfo, '查询成功')
    }

    @Get('/getalluser')
    @Auth(2)
    async allUser (ctx, next) {
      ctx.body = await getAllUsers(ctx.query.hotkey, ctx.query.page)
    }

    @Put('/changerole')
    @Auth(2)
    @Required({
      body: ['newRole', 'userId']
    })
    async setRole (ctx, next) {
      return ctx.body = await changeRole(ctx.request.body.userId, ctx.request.body.newRole)
    }

    @Delete('/deleteuser')
    @Auth(2)
    async adminDelUser (ctx, next) {
      if (ctx.query.userid && (ctx.query.userid !== ctx.request.header.authorization)) {
        return ctx.body = await delUser(ctx.query.userid)
      } else {
        ctx.body = returnBody(400, '', '用户ID有误')
      }
    }
}