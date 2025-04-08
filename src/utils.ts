import {createHash} from "node:crypto";

export default class Utils {
	genId(): string {
		return crypto.randomUUID();
	}

	generateHash<T = string>(data: T): string {
		return createHash('sha256').update(data as string).digest('hex');
	}

	generateSHASum(): string {
		return "";
	}

	calculateDate = (startDate: number, param1?: string): number => {
		// function adds current date seconds && sec/day to calculate end date of cooldown
		return startDate + 0x337f9800;
	}
}