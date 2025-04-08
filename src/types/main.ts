export namespace AppTypes {
	export interface ICooldownUser {
		id: string;
		time: number;
	}

	export interface IUtils {
		genId(): string;
		generateHash<T = string>(data: T): string;
	}
}

export interface ITestData
	{
		id: string;
		keywords: string[];
		response: string;
		emiton: number;
		onresolve?: <T>(...args: any | T) => void;
		onerror?: <T>(...args: any | T) => void;
	}

export const testData: Array<ITestData> = [
	{
		id: 'course_remarkup',
		keywords: ['поддержка', 'переназначение', 'курс'],
		emiton: 3,
		response: "Добрый день. Обращаетесь к руководителю для переназначения ТПР. Мы не переназначаем"
	},
	{
		id: 'vebinar',
		keywords: ['запись', 'вебинар', 'слетает'],
		emiton: 3,
		response: "Ссылка на почте. Сохраняйте ссылки при записи на мероприятие."
	},
	{
		id: 'mail',
		keywords: ['попасть', 'рабочая', 'почта'],
		emiton: 2,
		response: "Если вы не из Москвы, \n" +
			"\n" +
			"‼️При установке корпоративной почты, если вы не из Москвы, в домене прописываем: REGIONS"
	},
	{
		id: 'stud_finished',
		keywords: ['действия','завершил', 'дальнейшие','дальше',  'прошел', 'обучение'],
		emiton: 3,
		response: "связаться с вашим руководителем."
	}
]