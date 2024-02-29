import { v4 as uuidv4 } from 'uuid';

class State {
    value: any;
    event: string;
    event_obj: Event;

    constructor(value: any) {
        this.value = value;
        this.event = uuidv4();
        this.event_obj = new Event(this.event);
    }
    setValue(value: any) {
        this.value = value;
        dispatchEvent(this.event_obj);
    }
}

export default State

