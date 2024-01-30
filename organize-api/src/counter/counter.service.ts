import { Injectable } from "@nestjs/common";
import { Counter } from "./entities/counter.entity";

const COUNTER: {[key: string]: Counter[]} = {};
@Injectable()
export class CounterService {
  constructor() {}

  async increaseCounter(uuid: string, info: Counter) {
    if(typeof COUNTER[uuid] === 'undefined') COUNTER[uuid] = [];
    COUNTER[uuid].push(info);
    return COUNTER[uuid];
  }

  async decreaseCounter(uuid: string, info: Counter) {
    if(typeof COUNTER[uuid] === 'undefined') COUNTER[uuid] = [];
    const find = COUNTER[uuid].find((item) => item.id === info.id);
    if(!find) return COUNTER[uuid];
    const index = COUNTER[uuid].indexOf(find);
    COUNTER[uuid][index] = null;
    COUNTER[uuid] = COUNTER[uuid].filter((item) => item !== null);
    return COUNTER[uuid];
  }

  async clearCounter(uuid?: string) {
    if(uuid) {
      COUNTER[uuid] = [];
      return true;
    }
    for (const key of Object.keys(COUNTER)) COUNTER[key] = [];
    return true;
  }
}