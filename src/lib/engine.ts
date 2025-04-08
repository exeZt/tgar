import TelegramBot from "node-telegram-bot-api";
import type {Message} from "node-telegram-bot-api";
import Redis from "../data/redis.ts";
import Utils from "../utils.ts";
import {ITestData, testData} from "../types/main.ts";
import {JaroWinklerDistance, PorterStemmer, Stemmer, Tokenizer} from "natural";

export namespace AppEngine {
	export class MessageResolver {
		protected client!: TelegramBot | undefined;
		protected options!: object | undefined;

		constructor(client?: TelegramBot) {
			this.client = client;
		}

		resolve(message: Message): ITestData {
			let msg = message.text;
			let author = message.from;
			let isBot = message.from?.is_bot;
			let words: string[] | undefined = msg?.split(/(\s)/gm); // message
			let parsingData = testData;
			let keywords: string[] | undefined = []; // filter
			let stem: Stemmer = PorterStemmer;
			let compareResult: number = 0;
			let comparisonResult: { [key: string] : number } = {};

			parsingData.map((testd: ITestData): void => {
				words?.forEach((word: string): void => {
					word = word.toLowerCase();
					for (let v of testd.keywords) {
						v = v.toLowerCase();
						if (JaroWinklerDistance(v, word) > 0.799999) {
							compareResult++;
							isNaN(comparisonResult[testd.id])
								? comparisonResult[testd.id] = 0x1
								: comparisonResult[testd.id]++;
						}
					}
				});
			});

			let returnValue!: ITestData;

			Object.entries(comparisonResult).forEach((key: [string, number], val) => {
				parsingData.forEach((k,v) => {
					if (k.emiton > key[1] && key[0] === k.id) {
						console.log('Not emmitting')
					} else if (k.emiton <= key[1] && key[0] === k.id) {
						returnValue = k;
					}
				})
			})

			return returnValue;
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

		checkNeedStrict = () => {

		}
	}

	export class RedisAppCommunication {
		addCooldown = (userId: string): void => {
			new Redis().useRedisClientData('set',
				new Utils().generateHash(userId),
				new Utils().generateHash(userId));
		};
	}
}