import { NgModule, PipeTransform } from '@angular/core';

import { TruncatePipe } from './truncate.pipe';
import { MomentPipe } from './moment.pipe';

@NgModule({
    declarations: [
        TruncatePipe,
        MomentPipe
    ],
    exports: [
        TruncatePipe,
        MomentPipe
    ]
})

export class PipeModule { }
