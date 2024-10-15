import { Markup } from "telegraf";

export function actionButtons() {
    return Markup.keyboard(
        [
    Markup.button.callback('📆Is doretmek', 'create'),
    Markup.button.callback('📆Etmeli Isler', 'list'),
    Markup.button.callback('✅Gutarmak', 'done'),
    Markup.button.callback('🖋Uytgetmek', 'edit'),
    Markup.button.callback('❌Pozmak', 'delete'),
        ], 
        {
            columns: 2
        }
    )
}