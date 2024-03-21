import { of, interval, fromEvent, merge, EMPTY } from "rxjs";
import {
  mapTo,
  scan,
  takeWhile,
  switchMap,
  startWith,
  map,
} from "rxjs/operators";

/*
 * Any code samples you want to play with can go in this file.
 * Updates will trigger a live reload on http://localhost:1234/
 * after running npm start.
 */
of("Hello", "RxJS").subscribe(console.log);

const COUNTDOWN_FROM = 10;
const countdown = document.getElementById("countdown");
const liftoffMessage = document.getElementById("message");
const pauseButton = document.getElementById("pause");
const startButton = document.getElementById("start");

const counter = interval(1000);
const pauseClick = fromEvent(pauseButton, "click");
const startClick = fromEvent(startButton, "click");

merge(startClick.pipe(mapTo(true)), pauseClick.pipe(mapTo(false)))
  .pipe(
    switchMap((shouldStart) => {
      return shouldStart ? counter : EMPTY;
    }),
    mapTo(-1),
    scan((accumulator, current) => {
      return accumulator + current;
    }, COUNTDOWN_FROM),
    takeWhile((value) => value > 0),
    startWith(COUNTDOWN_FROM)
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
