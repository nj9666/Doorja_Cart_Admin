import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';


import { SystemService } from './SystemService'

import { FilterArrayPipe, FilterArrayObjectPipe, SumPipe, SafeHtmlPipe, fileTypePipe, GroupByPipe } from './array.pipe'; // convert object to array pipe
import { NumberOnly } from './app.directive';

//common page


//import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { AlertComponent } from './alert';

//Perfect Scrollbar
import { PerfectScrollbarModule, PERFECT_SCROLLBAR_CONFIG, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
};


@NgModule({
    imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule,  PerfectScrollbarModule],
    declarations: [ AlertComponent, FilterArrayPipe, FilterArrayObjectPipe, SumPipe, SafeHtmlPipe, fileTypePipe, GroupByPipe, NumberOnly, 
        
    ],
    exports: [FormsModule, ReactiveFormsModule,  AlertComponent, FilterArrayPipe, FilterArrayObjectPipe, SumPipe, SafeHtmlPipe, fileTypePipe, GroupByPipe,
         PerfectScrollbarModule, NumberOnly, 
    ],
})

export class SharedModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: SharedModule,
            providers: [SystemService                //,{ provide: ToastOptions, useClass: CustomOption },                
                ,{ provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
            ]
        };
    }
}