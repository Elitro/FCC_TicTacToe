import { FormGroup } from '@angular/forms';
import { Injectable } from '@angular/core';

export class PlayerOptions {
    marker: number;
    players: number;
}

@Injectable()
export class AppService {

    private optionsFormGroup: PlayerOptions;

    constructor() { }

    setOptions(data: any) {
        this.optionsFormGroup = data;
        console.log(this.optionsFormGroup);
    }

    getOptions(): PlayerOptions {
        return this.optionsFormGroup;
    }

}
