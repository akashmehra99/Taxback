import { CommonServiceService } from './../common-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-failure',
  templateUrl: './success-failure.component.html',
  styleUrls: ['./success-failure.component.css']
})
export class SuccessFailureComponent implements OnInit {

  constructor(public commServ: CommonServiceService) { }

  ngOnInit() {
  }

}
