import * as fs from "fs";
import { parse } from "yaml";
import * as path from "path";

export const getEnv = () => {
	return process.env.RUNNING_ENV
}

export const getConfig = () => {
	const env = getEnv()
	let yamlPath = path.join(process.cwd(), `./.config/.${env}.yaml`);
	const yamlFile = fs.readFileSync(yamlPath, 'utf8')
	return parse(yamlFile)
}
