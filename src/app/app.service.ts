import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

@Injectable()
export class AppService {

    private optionsFormGroup: { marker: string, players: string };

    constructor() {}

    setOptions(data: any) {
        this.optionsFormGroup = data;
        console.log(this.optionsFormGroup);
    }

    getOptions() {
        return this.optionsFormGroup;
    }
    
}
