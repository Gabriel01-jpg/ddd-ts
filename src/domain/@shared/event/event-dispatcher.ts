import EventDispatcherInterface from "./event-dispatcher.interface";
import EventHandlerInterface from "./event-handler.interface";
import EventInterface from "./event.interface";

export default class EventDispatcher implements EventDispatcherInterface {

    private eventHandlers: Map<string, Set<EventHandlerInterface>>;

    constructor() {
        this.eventHandlers = new Map();
    }

    /* notify(event) {
        const eventName = event.constructor.name;
        if (this.eventHandlers.has(eventName)) {
            this.eventHandlers.get(eventName).forEach((eventHandler) => {
                eventHandler.handle(event);
            });
        }
    } */

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        if (this.eventHandlers.has(eventName)) {
            this.eventHandlers.get(eventName).forEach((eventHandler) => {
                eventHandler.handle(event);
            });
        }
    }

    register(eventName: string, eventHandler: EventHandlerInterface) {
        if (!this.eventHandlers.has(eventName)) {
            this.eventHandlers.set(eventName, new Set());
        }
        this.eventHandlers.get(eventName).add(eventHandler);
    }

    unregister(eventName: string, eventHandler: EventHandlerInterface) {
        if (this.eventHandlers.has(eventName)) {
            this.eventHandlers.get(eventName).delete(eventHandler);
        }
    }

    unregisterAll() {
        this.eventHandlers.clear();
    }

    get getEventHandlers(): Map<string, Set<EventHandlerInterface>> {
        return this.eventHandlers;
    }
}