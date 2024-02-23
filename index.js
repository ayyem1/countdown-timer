import { of, interval } from "rxjs";
import { mapTo, scan, filter, takeWhile } from "rxjs/operators";

/*
 * Any code samples you want to play with can go in this file.
 * Updates will trigger a live reload on http://localhost:1234/
 * after running npm start.
 */
of("Hello", "RxJS").subscribe(console.log);

const countdown = document.getElementById("countdown");
const message = document.getElementById("message");
const counter = interval(1000);

counter
  .pipe(
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, 10),
    takeWhile((value) => value > 0, true)
  )
  .subscribe({
    next: (val) => {
      console.log(val);
      countdown.innerHTML = val;
      if (!val) {
        message.innerHTML = "Liftoff!";
      }
    },
  });
