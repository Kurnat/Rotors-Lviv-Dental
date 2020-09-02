import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, map, mergeAll, mergeMap, delay } from 'rxjs/operators';
import { Subscription, of, from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription$: Subscription;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.subscription$ = this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe((event: NavigationStart) => {
        window.scrollTo(0, 0);
      });

    const getData = (param) => {
      return of(`retrieved new data with param ${param}`).pipe(delay(1000));
    };

    // // используем  map
    // from([1, 2, 3, 4])
    //   .pipe(map((param) => getData(param)))
    //   .subscribe((val) => val.subscribe((data) => console.log(data)));

    // // используем map и mergeAll
    // from([1, 2, 3, 4])
    //   .pipe(
    //     map((param) => getData(param)),
    //     mergeAll()
    //   )
    //   .subscribe((val) => console.log(val));

    // используем mergeMap
    from([1, 2, 3, 4])
      .pipe(mergeMap((param) => getData(param)))
      .subscribe((val) => console.log(val));
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
