import {UtilsTypes} from './types/redis.ts';

export default class Utils implements UtilsTypes.IUtils {
	genId(): string {
		return crypto.randomUUID();
	}

	generateKey(): string {
		return "";
	}

	generateSHASum(): string {
		return "";
	}
}