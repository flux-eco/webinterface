import { Router } from "express";
import { TopicalAreaEvents } from "../../../controller/topical-area/topical-area.events";
import { createEvent } from "../../../eventHandler";

const router = Router();

router.get('/list', (req, res) => {
    console.log('/list')
    createEvent(TopicalAreaEvents.READ, req).then(e => e.watch('end', async () => {e.respond(res)}));
})

router.get('/item/:id', (req, res) => {
    req.query._id = {_id: req.params.id}
    createEvent(TopicalAreaEvents.READ, req).then(e => e.watch('end', async () => {e.respond(res)}));
})

// create
router.post('/item/create', (req, res) => {
    createEvent(TopicalAreaEvents.CREATE, req).then(e => e.watch('end', async () => {e.respond(res)}));
})

router.post('/item/:id/update', (req, res) => {
    console.log(req.body)
    createEvent(TopicalAreaEvents.UPDATE, req).then(e => e.watch('end', async () => {e.respond(res)}));
})

router.delete('/item/:id/delete', (req, res) => {
    createEvent(TopicalAreaEvents.DELETE, req).then(e => e.watch('end', async () => {e.respond(res)}));
})

export default router;