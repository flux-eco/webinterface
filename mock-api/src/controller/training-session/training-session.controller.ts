import { event } from "../../eventHandler";
import TrainingSession from '../../models/training-session.model';
import Action from '../../entities/action';
import { TrainingSessionEvents } from "./training-session.events";
import loggerService from "../../services/logger.service";

const logger = loggerService.child({ component: 'UserController' });

event(TrainingSessionEvents.READ, ['start', async function() {
        const self: Action<any> = this;

        try {
            self.status(200)
                .msg(await TrainingSession.find(this.payload.query))
                .next();
        } catch (err) {
            self.status(500).msg(500).complete();
            throw Error(err);
        }
    }]
)

event(TrainingSessionEvents.CREATE, ['start', async function() {
    const self: Action<any> = this;
    try {
        console.log(self.payload.body)
        const seq = (await TrainingSession
            .find()
            .sort({seq : -1})
            .limit(1))[0]?.seq;
        
        const id = `${self.payload.body['training-session_areaId']}_${self.payload.body['training-session_name']}`.trim().replace(new RegExp(' ', 'g'), '_');

        if ((await TrainingSession.findById(id))?._id !== undefined) {
            self.status(409).msg('Duplicate name').complete();
            return;
        }

        const area = new TrainingSession(
            Object.assign(self.payload.body, {
                _id: id,
                seq: seq ? seq + 1 : 1
            }));
    
        await area.save();

        self.status(201).msg(area).next();
    } catch (err) {
        self.status(500).msg(500).complete();
        throw Error(err);
    }
}])

event(TrainingSessionEvents.UPDATE, ['start', async function() {
    const self: Action<any> = this;
    try {
        console.log(self.payload.body);
        await TrainingSession.findByIdAndUpdate(self.payload.body._id, self.payload.body);

        self.status(200).next();
    }  catch (err) {
        self.status(500).msg(500).complete();
        throw Error(err);
    }
}])

event(TrainingSessionEvents.DELETE, ['start', async function() {
    const self: Action<any> = this;
    try {
        self.status(200)
            .msg(await TrainingSession.deleteMany(self.payload.query))
            .next();
    } catch (err) {
        self.status(500).msg(500).complete();
        throw Error(err);
    }
}])