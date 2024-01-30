import { Controller, MessageEvent, Sse } from "@nestjs/common";
import { Observable, interval, map } from "rxjs";

@Controller()
export class CounterController {
  constructor() {}

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(map((_) => ({ data: { hello: 'world' } })));
  }
}