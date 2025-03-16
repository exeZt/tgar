declare global {
	namespace NodeJS{
		interface ProcessEnv {
			TELEGRAM_TOKEN: string;
			PWD: string;
		}
	}
}

export {}