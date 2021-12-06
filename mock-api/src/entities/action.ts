import { BehaviorSubject, first } from "rxjs";
import winston from "winston";
import loggerService from "../services/logger.service";

export default class Action<T> {
    readonly key: string;
    readonly id: number;
    readonly logger: winston.Logger;
    readonly states: string[] = ['start'];
    payload: T;
    response: {
        status: number,
        msg: any
    } = {
        status: 500,
        msg: 'Responded to early'
    };

    private hasPreAuth: boolean = false;
    private hasPostAuth: boolean = false;
    private currentKey: BehaviorSubject<number> = new BehaviorSubject<number>(0);
    private responeded: boolean = false;

    constructor(key: string, id: number, payload?: T, states?: {pre: string[], post: string[]}) {
        this.key = key;
        this.id = id;
        this.payload = payload;
        this.logger = loggerService.child({component: 'Event', event: key, eventId: id});
        this.states = [
            'init',
            'pre-auth',
            ...states.pre,
            'start',
            ...states.post,
            'post-auth',
            'end'];

        this.init()
    }

    private init() {
        this.logger.debug(`new Action ${this.key}`)

        this.currentKey.subscribe(i => {
            if ((this.states[i] === 'pre-auth' && !this.hasPreAuth) || (this.states[i] === 'post-auth' && !this.hasPostAuth)) {
                this.next();
                return;
            }

            if (i >= this.states.length) {
                this.complete();
            }

            this.logger.debug(`state: ${this.states[i]}`);
        });
    }

    watch(keys: string | string[], cb: () => Promise<void>): Action<T> {
        if (!Array.isArray(keys)) {
            keys = [keys];
        }

        if (!this.hasPreAuth)
            this.hasPreAuth = keys.includes('pre-auth');
        if (!this.hasPostAuth)
            this.hasPostAuth = keys.includes('post-auth')

        this.currentKey.subscribe(i => {
            for (let key of keys) {
                if (i == this.states.indexOf(key)) {
                    cb.bind(this)()
                }
            }
        });

        return this;
    }

    next(): void {
        this.currentKey.pipe(first()).subscribe(i => {
            this.currentKey.next(i + 1);
        });
    }

    complete(): void {
        this.currentKey.next(this.states.length - 1);
    }

    respond(res): void {
        if (!this.responeded) {
            res.status(this.response.status).json(this.response.msg);
            return
        }

        this.logger.warn(`${this.id} ${this.key} responeded twice`)
    }

    status(code: number): Action<any> {
        this.response.status = code;
        return this;
    }

    msg(msg: any): Action<any> {
        this.response.msg = msg;
        return this;
    }
}