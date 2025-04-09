import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import SqliteApplicationHandler from "../data/sqlite.ts";
import {IKeywordType} from "../shared/types.ts";

const router = express.Router();
const dataHandler = new SqliteApplicationHandler()

router.use(express.json());
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
router.use(express.urlencoded({ extended: false }));
router.use(cors({origin: "*"}));

router.get('/keywords/:token', (req,res) => {
	console.log(req.params?.token);
	res.status(200).send(JSON.stringify(dataHandler.query(`SELECT * FROM \`keywd\``, true)?.all()));
});

router.post('/keywords/update', (req,res) => {
	console.log(req.body);
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

export default router;