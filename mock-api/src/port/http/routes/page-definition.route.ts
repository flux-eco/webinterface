import { Router } from "express";
import { PageDefinitionEvents } from "../../../controller/page-definition/page-definition.events";
import { TopicalAreaEvents } from "../../../controller/topical-area/topical-area.events";
import { createEvent } from "../../../eventHandler";

const router = Router();


router.get('/:definition', (req, res) => {
    createEvent(PageDefinitionEvents.READ, req).then(e => e.watch('end', async () => {e.respond(res)}));
})

export default router;