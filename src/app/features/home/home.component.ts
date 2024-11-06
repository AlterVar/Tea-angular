import {Component, OnDestroy, OnInit, TemplateRef} from '@angular/core';
import {Observable, Subscription} from "rxjs";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private popupObservable: Observable<HTMLElement | null>;
  private popupSubscription: Subscription | null = null;


  constructor(private modalService: NgbModal) {
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

  openPopup(content: TemplateRef<any>) {
    this.modalService.open(content, {ariaLabelledBy: 'popupModalTitle'});
  }

  ngOnInit(): void {
    this.popupSubscription = this.popupObservable.subscribe({
      next: () => {
        document.getElementById('popupButton')?.click();
      }
    })
  }
  ngOnDestroy() {
    this.popupSubscription?.unsubscribe();
  }
}
