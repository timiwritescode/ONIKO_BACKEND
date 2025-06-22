import { EventEmitter } from "events";
import { TypedEventEmitter } from "./typed-event-dispatcher";
import { CustomAppEvents } from "./events.types";


export const eventDispatch = new TypedEventEmitter<CustomAppEvents>();