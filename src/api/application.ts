import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import SqliteApplicationHandler from "../data/sqlite";
import {IKeywordType} from "../shared/types";

const router = express.Router();
const dataHandler = new SqliteApplicationHandler()

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));
router.use(cors({origin: "*"}));

router.get('/keywords/:token', (req,res) => {
	res.status(200).send(JSON.stringify(dataHandler.query(`SELECT * FROM \`keywd\`;`, true)?.all()));
});

router.post('/keywords/update', (req,res) => {
	try {
		let data = req.body;
		data.forEach((item: IKeywordType) => {
			dataHandler.query(`UPDATE \`keywd\` SET 
                     \`id\`='${item.id}',
                     \`name\`='${item.name}',
                     \`keywords\`='${item.keywords}',
                     \`emiton\`='${item.emiton}',
                     \`response\`='${item.response}'
                 WHERE \`id\`='${item.id}';`)
		});
	} catch (e) {
		console.error(e);
	}

	res.status(200).send({ status: 200 });
});

router.post('/keywords/delete', (req,res) => {
	try {
		let data = req.body;
		data.forEach((item: string | number) => {
			dataHandler.query(`DELETE FROM \`keywd\` WHERE \`id\`='${item}';`);
		});
	} catch (e) {
		console.error(e);
	}
	res.status(200).send({ status: 200 });
});

router.post('/keywords/add', (req,res) => {
	try {
		let item = req.body;
		dataHandler.query(`INSERT INTO \`keywd\` (
			\`id\`,
			\`name\`,
			\`keywords\`,
			\`emiton\`,
			\`response\`
		) VALUES (
			'${item.id}',
			'${item.name}',
			'${item.keywords}',
			'${item.emiton}',
			'${item.response}'
		)`);
	} catch (e) {
		console.error(e);
	}

	res.status(200).send({ status: 200 });
});

export default router;