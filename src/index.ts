"use strict";

import dotenv from 'dotenv';
import TelegramBot from "node-telegram-bot-api";
import type {Message} from "node-telegram-bot-api";
import {AppEngine} from "./lib/engine";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "node:path";
import router from "./api/application";

dotenv.config();

if (!process.env.TELEGRAM_TOKEN)
	throw new Error("Telegram token doesn't exist");

const client: TelegramBot = new TelegramBot(process.env.TELEGRAM_TOKEN as string, {
	polling: true,
});

client.on("text", async (message: Message): Promise<void> => {
	const response = (new AppEngine.MessageResolver(client).resolve(message))

	if (response) {
		await client.sendMessage(message.chat.id, response.response, {
			reply_to_message_id: message.message_id,
			parse_mode: "HTML",
			allow_sending_without_reply: true,
			disable_notification: true
		});
	}
});

const app = express();
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: "*"}));
app.use(express.static(path.join(__dirname, "public")));
app.use('/api/', router);

app.get('/', (req,res): void => {
	res.status(200).sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(4554, (error: Error|undefined): void => {
	if (error)
		console.error(error);

	console.log('app is running on port:4554 ');
});