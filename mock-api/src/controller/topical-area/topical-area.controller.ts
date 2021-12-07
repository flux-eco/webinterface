import { event } from "../../eventHandler";
import TopicalArea from '../../models/topical-area.model';
import Action from '../../entities/action';
import { TopicalAreaEvents } from "./topical-area.events";
import loggerService from "../../services/logger.service";

const logger = loggerService.child({ component: 'UserController' });

event(TopicalAreaEvents.READ, ['start', async function() {
        const self: Action<any> = this;

        try {
            self.status(200)
                .msg(await TopicalArea.find(this.payload.query))
                .next();
        } catch (err) {
            self.status(500).msg(500).complete();
            throw Error(err);
        }
    }]
)

event(TopicalAreaEvents.CREATE, ['start', async function() {
    const self: Action<any> = this;
    try {
        console.log(self.payload.body)
        const seq = (await TopicalArea
            .find()
            .sort({seq : -1})
            .limit(1))[0]?.seq;

        const area = new TopicalArea(
            Object.assign(self.payload.body, {
                _id: self.payload.body['topical-area_name'].trim().replace(new RegExp(' ', 'g'), '_'),
                seq: seq ? seq + 1 : 1
            }));
    
        await area.save();

        self.status(201).msg(area).next();
    } catch (err) {
        self.status(500).msg(500).complete();
        throw Error(err);
    }
}])

event(TopicalAreaEvents.UPDATE, ['start', async function() {
    const self: Action<any> = this;
    try {
        console.log(self.payload.body);
        await TopicalArea.findByIdAndUpdate(self.payload.body._id, self.payload.body);

        self.status(200).next();
    }  catch (err) {
        self.status(500).msg(500).complete();
        throw Error(err);
    }
}])

event(TopicalAreaEvents.DELETE, ['start', async function() {
    const self: Action<any> = this;
    try {
        self.status(200)
            .msg(await TopicalArea.deleteMany(self.payload.query))
            .next();
    } catch (err) {
        self.status(500).msg(500).complete();
        throw Error(err);
    }
}])