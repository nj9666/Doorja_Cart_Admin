import { Component, OnInit, Input } from '@angular/core';

import { Alert, AlertType } from './CommonModel';
import { SystemService } from './SystemService';

@Component({
    selector: 'alert',
    //template: `<div *ngFor="let alert of alerts" [ngClass]="alert.cssClass"  class="alert-dismissable">
    //                 {{alert.message}}
    //                 <a class="close" (click)="removeAlert(alert)">&times;</a>
    //            </div>
    //          `
    template: `<ng-container *ngFor="let alert of alerts">
                <div *ngIf="alert.message" class="notification alert-dismissible animated" [class.bounceInRight]="!visibleOut" [class.bounceOutRight]="visibleOut" 
                      [ngClass]="alert.cssClass" (click)="removeAlert(alert)">
                    <a class="close" data-dismiss="alert">×</a>
                    <i *ngIf="alert.type == 0" class="fa fa-check-circle icon"></i>
                    <i *ngIf="alert.type == 1" class="fa fa-times-circle icon"></i>
                    <i *ngIf="alert.type == 2" class="fa fa-info-circle icon"></i>
                    <i *ngIf="alert.type == 3" class="fa fa-exclamation-circle icon"></i>
                    <div class="mr-4">
                        {{alert.message}}
                    </div>
                </div>
               </ng-container>
              `
})

export class AlertComponent {
    @Input() id: string; visibleOut: boolean = false;
    alerts: Alert[] = []; msgClass: string = "";
    constructor(public service: SystemService) { }

    ngOnInit() {
        this.service.getAlert(this.id).subscribe((alert: Alert) => {
            if (!alert.message) {
                // clear alerts when an empty alert is received
                this.alerts = [];
                return;
            }
            // add alert to array            
            this.alerts = [];//for only display one message
            this.visibleOut = false;
            this.alerts.push(alert);
            window.setTimeout(() => { this.removeAlert(alert); }, 10000);
        });
    }

    removeAlert(alert: Alert) {
        this.visibleOut = true;
        setTimeout(() => {
            this.alerts = this.alerts.filter(x => x !== alert);
        }, 250);
    }
}