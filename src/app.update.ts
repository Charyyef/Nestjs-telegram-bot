import { AppService } from './app.service';
import { Ctx, Hears, InjectBot, Message, On, Start, Update } from 'nestjs-telegraf';
import { Telegraf } from 'telegraf';
import { actionButtons } from './buttons';
import { Context } from './app.interface';
import { showList } from './app.utils';

@Update()
export class AppController {
  constructor(@InjectBot() private readonly bot: Telegraf<Context>, 
  private readonly appService: AppService) {}

  @Start()
  async startCommand(ctx: Context) {
   await ctx.reply('Hi Kerem✋')
   await ctx.reply('Name edesiniz gelyar?', actionButtons())
  }
  
  @Hears('📆Etmeli Isler')
  async listTask(ctx: Context) {
    const todos = await this.appService.getAll()
    await ctx.reply(showList('bots'))
  }

  @Hears('✅Gutarmak')
  async doneTask(ctx: Context) {
    await ctx.reply( 'Isin ID-syny yazayyn:')
    ctx.session.type = 'done'
  }
  
  @Hears('🖋Uytgetmek')
  async editTask (ctx: Context) {

    await ctx.replyWithHTML( 'Isin ID-syny we taze adyny yazayyn: \n\n' + 
      ' Formaty - <b>1 | Taze ady</b>')
    ctx.session.type = 'edit'
  }

  @Hears('❌Pozmak')
  async deleteTast(ctx: Context) {
    await ctx.deleteMessage()
    await ctx.reply( 'Isin ID-syny yazayyn:')
    ctx.session.type = 'delete'
  }

  @On('text') 
  async getMessage (@Message('text') message: string, @Ctx () ctx: Context){
       if(!ctx.session.type) return 
       if(ctx.session.type === 'done'){

        const todos = await this.appService.doneTask(Number(message))


      if(!todos) {
        await ctx.deleteMessage()
        await ctx.reply('Bular yaly ID is tapylmady!')
        return
      }
      await ctx.reply(showList(todos))
    }

    if (ctx.session.type === 'edit') {
      const [taskId, taskName] = message.split(' | ')

      const todos = await this.appService.editTask(Number(taskId), taskName)

        if(!todos) {
          await ctx.deleteMessage()
          await ctx.reply('Bular yaly ID is tapylmady!')
          return
        }


        await ctx.reply(showList(todos))
    }

    if (ctx.session.type === 'delete') {
      const todos = this.appService.deleteTask(Number(message))

      if(!todos) {
        await ctx.deleteMessage()
        await ctx.reply('Bular yaly ID is tapylmady!')
        return
      }
      
      await ctx.reply(showList(todos))
    }
  }
}
