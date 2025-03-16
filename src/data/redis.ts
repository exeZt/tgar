import {createClient, RedisFunctions, RedisModules, RedisScripts} from "redis";
import type {
	RedisClientType,
	RedisClientOptions,
} from "redis";

export default class Redis {
	protected readonly redisClient!: RedisClientType;

	constructor() {
		this.redisClient = createClient({
			url: '',
			username: '',
			password: '',
			database: 0x1
		});
		this.redisClient
			.on("error", async (err: Error) => console.error(err))
			.connect()
			.catch((err: Error) => console.error(err));
	}

	useRedisClientData = async (typeOfQuery: "set" | "get", key: string, value?: any): Promise<string | null | void> => {
		if (typeOfQuery === "set") {
			await this.redisClient.set(key, value);
		} else {
			return await this.redisClient.get(key)
		}
	}

	get #redisClient(): RedisClientType {
		return this.redisClient;
	}
}