///<reference path="../../utils/utils.ts" />
///<reference path="../../reflect-metadata.ts" />
namespace decorators {
    // import Test = components.Test;
    export function onStage() {
        return Listen(egret.Event.ADDED_TO_STAGE)
    }
    export function Listen(event: string) {
        return function (clazz: any, propertyKey: string, descriptor: PropertyDescriptor) {
            let eventMap: Map<string, Function> = Reflect.getMetadata("eventMap", clazz);
            if (utils.isExist(eventMap)) {
                eventMap = new Map();
            }
            eventMap.set(event, clazz[propertyKey]); 
            Reflect.defineMetadata("eventMap", eventMap, clazz);
        }
    }
    export function test() {
        return function (clazz: any, propertyKey: string, descriptor: PropertyDescriptor) {
            Reflect.defineMetadata("eventMap", [{
                type: egret.Event.ADDED_TO_STAGE,
                func: clazz[propertyKey],
            }], clazz)
        }
    }

    /**
     * 旧方法
     */
    export let component = () => clazz => {
        let instance;
        let handler = {
            construct(target, args) {
                // if (!instance) {
                instance = Reflect.construct(target, args);
                let result = Reflect.getMetadata("eventMap", instance)
                instance.addEventListener(result[0].type, result[0].func, instance)
                // console.log(result)
                // }
                return instance;
            }
        };
        return new Proxy(clazz, handler);
    }
    export function Component<T extends { new (...args: any[]): {}; }>(constructor: T) {
        return class extends constructor {
            constructor(...args) {
                super();
                let eventMap: Map<string, Function> = Reflect.getMetadata("eventMap", this);
                // this["addEventListener"](result[0].type, result[0].func, this)
                eventMap.forEach((func, eventName) => {
                    this["addEventListener"](eventName, func, this)
                })
            }
        }
    }
    export function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
        return class extends constructor {
            newProperty = "new property";
            hello = "override";
        }
    }
}