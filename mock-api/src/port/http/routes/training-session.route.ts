import { Router } from "express";
import { TrainingSessionEvents } from "../../../controller/training-session/training-session.events";
import { createEvent } from "../../../eventHandler";

const router = Router();

router.get('/list', (req, res) => {
    console.log('/list')
    createEvent(TrainingSessionEvents.READ, req).then(e => e.watch('end', async () => {e.respond(res)}));
})

router.get('/item/:id', (req, res) => {
    req.query._id = {_id: req.params.id}
    createEvent(TrainingSessionEvents.READ, req).then(e => e.watch('end', async () => {e.respond(res)}));
})

// create
router.post('/item/create', (req, res) => {
    createEvent(TrainingSessionEvents.CREATE, req).then(e => e.watch('end', async () => {e.respond(res)}));
})

router.post('/item/:id/update', (req, res) => {
    console.log(req.body)
    createEvent(TrainingSessionEvents.UPDATE, req).then(e => e.watch('end', async () => {e.respond(res)}));
})

router.delete('/item/:id/delete', (req, res) => {
    req.query._id = {_id: req.params.id}
    createEvent(TrainingSessionEvents.DELETE, req).then(e => e.watch('end', async () => {e.respond(res)}));
})

export default router;