import {Component, OnDestroy, OnInit} from '@angular/core';
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private popupObservable: Observable<HTMLElement | null>;
  private popupSubscription: Subscription | null = null;
  private popup: HTMLElement | null = null;


  constructor() {
    this.popupObservable = new Observable<HTMLElement | null>(observer => {
      const timeout = setTimeout(() => {
        observer.next();
      }, 10000)
      return {
        unsubscribe() {
          clearTimeout(timeout);
        }
      }
    })
  }

  ngOnInit(): void {
    this.popup = document.getElementById('popupModal');
    this.popupSubscription = this.popupObservable.subscribe({
      next: () => {
        if (this.popup) {
          document.getElementById('popupButton')?.click();
        }
      }
    })
  }

  ngOnDestroy() {
    this.popupSubscription?.unsubscribe();
  }
}
