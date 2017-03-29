import { AppService } from './../app.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-piece',
  templateUrl: './choose-piece.component.html',
  styleUrls: ['./choose-piece.component.css']
})
export class ChoosePieceComponent implements OnInit {

  optionsForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router
    , private service: AppService) { }

  ngOnInit() {

    this.optionsForm = new FormGroup({
      marker: new FormControl('', Validators.required),
      players: new FormControl('', Validators.required)
    });

  }

  toggleMarker(value: string) {
    this.optionsForm.controls['marker'].setValue(value);
  }

  togglePlayers(value: string) {
    this.optionsForm.controls['players'].setValue(value);
  }

  submitOptions(form: any) {
    // this.service.setOptions(form);
    this.router.navigate(['game/' + form.marker + '/' + form.players]);
  }

}
