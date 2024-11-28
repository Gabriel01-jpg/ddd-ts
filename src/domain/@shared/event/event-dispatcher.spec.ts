import SendEmailWhenProductIsCreatedHandler from "../../product/event/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events test", () => {

    it("should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent")).toBeDefined();

        expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent").size).toBe(1);

        expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent").has(eventHandler)).toBeTruthy();
    });

    it("should unregister an event handler", () => {
            
            const eventDispatcher = new EventDispatcher();
    
            const eventHandler = new SendEmailWhenProductIsCreatedHandler();
    
            eventDispatcher.register("ProductCreatedEvent", eventHandler);

            expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent").has(eventHandler)).toBeTruthy();
    
            eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
    
            expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent").size).toBe(0);
    
            expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent").has(eventHandler)).toBeFalsy();
    });

    it("should unregister all event handlers", () => {
                
        const eventDispatcher = new EventDispatcher();

        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers.get("ProductCreatedEvent").size).toBe(1);

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        eventDispatcher.unregisterAll();

        expect(eventDispatcher.getEventHandlers.size).toBe(0);
    });

    it("should notify all event handlers", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const spyEventHandler = jest.spyOn(eventHandler, "handle");

        eventDispatcher.register("ProductCreatedEvent", eventHandler);

        const productCreatedEvent = new ProductCreatedEvent({
            name: "Product Name",
            description: "Product Description",
            price: 100,
            email: "gabriellima01.js@gmail.com"
        })

        // when notify is called, the event handler should be called
        eventDispatcher.notify(productCreatedEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
})