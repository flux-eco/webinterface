import { filter, ReplaySubject } from 'rxjs';
import Action from './entities/action';
import loggerService from './services/logger.service';

const logger = loggerService.child({ component: 'EventHandler' });

const eventRegister: Map<string, Action<any>[]> = new Map<string, Action<any>[]>();
export const newEvent: ReplaySubject<string> = new ReplaySubject<string>();


export const createEvent = async (key: string, payload?: any, eventKeys: {pre: string[], post: string[]} = {pre: [], post: []}): Promise<Action<any>> => {
    const eventList: Array<any> = eventRegister.get(key)
    let event: Action<any>;
    if (eventList) {
        event = new Action(key, eventList.length, payload, eventKeys);
        eventRegister.set(key, [...eventList, event]);
    } else {
        event = new Action(key, 0, payload, eventKeys);
        eventRegister.set(key, [event])
    }
    
    newEvent.next(key);
    eventRegister.get(key)[eventRegister.get(key).length - 1].next()

    return event;
}

export const unregisterEvent = (key: string, id: number) => {
    eventRegister.set(key, eventRegister.get(key).splice(id, 1));
}

export const event = (key: string, ...hooks: [string, () => Promise<void>][]): void => {
    hooks.forEach(([eventKey, cb]) => {
        logger.debug(`listening ${key} -> ${eventKey}`);
        newEvent.pipe(
            filter(val => val == key)
        ).subscribe(k => {
            const events = eventRegister.get(k);
    
            events[events.length - 1].watch(eventKey, cb);
        });
    })
}

export const allEvents = (key: string, cb: (e: Action<any>) => void) => {
    newEvent.pipe(
        filter(val => val == key)
    ).subscribe(k => {
        const events = eventRegister.get(k);

        cb(events[events.length - 1]);
    })
}