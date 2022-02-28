import { event } from "../../eventHandler";
import Action from '../../entities/action';
import { PageDefinitionEvents } from "./page-definition.events";
import loggerService from "../../services/logger.service";
import fs from 'fs';
import yaml from 'yaml'

const logger = loggerService.child({ component: 'UserController' });


event(PageDefinitionEvents.READ, ['start', async function() {
    console.log(process.cwd())
    const self: Action<any> = this;
    try {

        const def = fs.readFileSync(`./src/controller/page-definition/definitions/${self.payload.params.definition}.yaml`, {encoding: 'utf8'});

        self.status(200).msg(yaml.parse(def)).next();
    } catch (err) {
        self.status(500).msg(500).complete();
        throw Error(err);
    }
}])