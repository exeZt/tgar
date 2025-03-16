"use strict";

import dotenv from 'dotenv';
import TelegramBot from "node-telegram-bot-api";
import type {Message} from "node-telegram-bot-api";
import {AppEngine} from "./lib/engine.ts";

dotenv.config();

const client: TelegramBot = new TelegramBot(process.env.TELEGRAM_TOKEN as string, {
	polling: true,
});

client.on("text", async (message: Message): Promise<void> => {
	if (!new AppEngine.MessageResolver(client).resolve(message)){
		await client.sendMessage(message.chat.id, `Не действуете по шаблону, негодяй!`, {
			reply_to_message_id: message.message_id,
			parse_mode: "HTML",
			allow_sending_without_reply: true,
			disable_notification: true
		});
	}
	console.log(message);
})