import {DatabaseSync, StatementSync} from "node:sqlite";
import path from "node:path";

export default class SqliteApplicationHandler {
	protected database: DatabaseSync;

	constructor() {
		this.database = new DatabaseSync(path.join(process.cwd(),`src/data/app`), {
			open: true,
		});
	}

	query = (sqlQuery: string, returnValue?: boolean): StatementSync | void => {
		if (returnValue) {
			return this.database.prepare(sqlQuery);
		} else {
			this.database.exec(sqlQuery);
		}
	}
}

new SqliteApplicationHandler();