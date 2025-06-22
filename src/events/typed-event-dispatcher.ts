import { EventEmitter } from "events";


export class TypedEventEmitter<Events extends Record<string, any>> {
    private emitter = new EventEmitter();

    emit<K extends keyof Events>(event: K, payload: Events[K]): boolean {
        return this.emitter.emit(event as string, payload);
    }


    on<K extends keyof Events>(event: K, listener: (payload: Events[K]) => void): void {
        this.emitter.on(event as string, listener)
    }

    
    off<K extends keyof Events>(
    event: K,
    listener: (payload: Events[K]) => void
     ): void {
    this.emitter.off(event as string, listener);
    }

    
    once<K extends keyof Events>(
        event: K,
        listener: (payload: Events[K]) => void
      ): void {
        this.emitter.once(event as string, listener);
        }
}