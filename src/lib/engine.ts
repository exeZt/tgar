import TelegramBot from "node-telegram-bot-api";
import type {Message} from "node-telegram-bot-api";

export namespace AppEngine {
	export class MessageResolver {
		protected client!: TelegramBot | undefined;
		protected options!: object | undefined;

		constructor(client?: TelegramBot) {
			this.client = client;
		}

		resolve(message: Message): void | boolean {

		}

		isCorrectFirstMessageType (message: Message): void | boolean {
			let isCorrectPhrase: number = 0;

			if (!message?.text || !message?.from){
				console.log('no text');
				return;
			}

			let exit: (() => number) = (): number => {
				return 0
			};

			let parsedFirstIteration: string[] = message.text.split(/\n/);

			parsedFirstIteration.map((v: string) => {
				if (new RegExp(/([свкмбрСВКМБР]){3}/).test(v)) {
					console.log('Название должности имеется');
					isCorrectPhrase += 1;
				}
				else if (v.split(' ').length >= 3 && v.split(' ').length <= 4) {
					console.log('ФИО (ориентировачное имеется)');
					v.split(' ').map((v) => {
						if (v.length < 2)
							exit()
					});
					isCorrectPhrase += 1;
				}
			});
			return isCorrectPhrase === 2;
		}
	}
}