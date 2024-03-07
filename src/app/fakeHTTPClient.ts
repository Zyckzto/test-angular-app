import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

// Max delay emulating http request time 1000 ms
const MAX_DELAY_TIME = 1000;

export const get = <T>(response: T) => of(response)
  .pipe(
    delay(Math.ceil(Math.random() * MAX_DELAY_TIME))
  );
