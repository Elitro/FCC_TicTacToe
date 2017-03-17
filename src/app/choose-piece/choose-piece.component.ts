import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-choose-piece',
  templateUrl: './choose-piece.component.html',
  styleUrls: ['./choose-piece.component.css']
})
export class ChoosePieceComponent implements OnInit {

  optionsForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.optionsForm = new FormGroup({
      marker: new FormControl('', Validators.required),
      players: new FormControl('', Validators.required)
    });

  }

  submitOptions(form: FormGroup) {
    console.log('submit!', form);
  }

}
