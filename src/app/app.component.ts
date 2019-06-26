import { Component, OnInit, AfterViewChecked } from '@angular/core';
import {
  initializeComplete,
  InteractionStates,
  setAppHeight,
  SearchRecords,
  registerClickToDial
} from '@amc-technology/davinci-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SampleChannelApp'; // Make sure this title matches the title you gave this app in Creators Studio

  calls: { id: string; number: string; state?: InteractionStates }[] = [];
  phoneNumbers = [
    '555-123-4567',
    '555-867-5309',
    '555-000-0001',
    '555-999-9999'
  ];
  nextPhoneNumberIndex = 0;
  constructor() {
    this.callSpecific = this.callSpecific.bind(this);
  }
  ngOnInit() {
    initializeComplete();
    registerClickToDial(this.callSpecific);
    setAppHeight(200); // This fixes the issue with ngAfterViewChecked()
  }

  // ngAfterViewChecked() {
  //   setAppHeight(document.body.clientHeight);
  // } // This breaks the entire page

  newCall() {
    this.calls = [
      ...this.calls,
      {
        id: `Call-${Math.random()}`,
        number: this.getNextPhoneNumber()
      }
    ];
  }

  private getNextPhoneNumber() {
    const result = this.phoneNumbers[this.nextPhoneNumberIndex];
    this.nextPhoneNumberIndex =
      (this.nextPhoneNumberIndex + 1) % this.phoneNumbers.length;
    return result;
  }

  removeCall(id: string) {
    this.calls = this.calls.filter(call => call.id !== id);
  }
  async callSpecific(phone: string) {
    this.calls = [
      ...this.calls,
      {
        id: `Call-${Math.random()}`,
        number: phone,
        state: InteractionStates.Connected
      }
    ];
  }
}
