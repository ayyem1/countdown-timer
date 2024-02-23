import { of, interval, fromEvent } from "rxjs";
import { mapTo, scan, takeWhile, takeUntil } from "rxjs/operators";

/*
 * Any code samples you want to play with can go in this file.
 * Updates will trigger a live reload on http://localhost:1234/
 * after running npm start.
 */
of("Hello", "RxJS").subscribe(console.log);

const countdown = document.getElementById("countdown");
const liftoffMessage = document.getElementById("message");
const abortButton = document.getElementById("abort");

const counter = interval(1000);
const abort = fromEvent(abortButton, "click");

counter
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 10),
    takeWhile((value) => value > 0, true),
    takeUntil(abort)
  )
  .subscribe({
    next: (val) => {
      console.log(val);
      countdown.innerHTML = val;
      if (!val) {
        liftoffMessage.innerHTML = "Liftoff!";
      }
    },
  });
