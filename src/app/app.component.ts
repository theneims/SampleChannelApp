import { Component, OnInit } from '@angular/core';
import {
  initializeComplete,
  InteractionStates,
  setAppHeight,
  registerClickToDial,
  registerOnPresenceChanged,
  setPresence
} from '@amc-technology/davinci-api';

/**
 * Here the service that will simulate the functionality of a channel API is imported.
 */
import { SimulatorService } from './simulator.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'SampleChannelApp'; // Make sure this title matches the title you gave this app in Creators Studio
  presence = 'Not Ready'; // presence defaults to Not Ready, when Ready you can make or recieve a call
  calls: { id: string; number: string; state?: InteractionStates }[] = [];

  constructor(private simulatorService: SimulatorService) {
    // Make sure to bind all functions used as callbacks so that any changes made to variables are in the correct context
    this.executeClickToDial = this.executeClickToDial.bind(this);
    this.presenceChange = this.presenceChange.bind(this);
  }

  ngOnInit() {
    // registerClickToDial() lets the DaVinci api know that you are listening for a click to dial event.
    registerClickToDial(this.executeClickToDial);

    // registerOnPresenceChanged() lets the DaVinci api know that you are listening for a change in presence.
    registerOnPresenceChanged(this.presenceChange);

    // setAppHeight() controls the height of your app and whether or not your app is visible in the toolbar.
    // If it is not set your app will not show up in the toolbar.
    setAppHeight(250);

    // initializeComplete() lets the DaVinci api know that you are done registering for events.
    initializeComplete();
  }

  /**
   * This function is used as the callback for the registerClickToDial() api call.
   *
   * @param {string} phone
   * @memberof AppComponent
   */
  async executeClickToDial(phone: string) {
    if (this.presence === 'Ready') {
      console.log(`Calling ${phone}`);
      // setPresence() is used to send a new presence to the global presence through the DaVinci api.
      setPresence('Not Ready', 'Making a Call');
      console.log('New Call');
      this.calls = [
        ...this.calls,
        this.simulatorService.newOutboundCall(phone)
      ];
    } else {
      console.log(
        `The presence is ${this.presence}, agent is not accepting calls.`
      );
    }
  }

  /**
   * This function is used as the callback for the registerOnPresenceChanged() api call.
   *
   * @param {string} presence
   * @param {string} [reason]
   * @returns promise
   * @memberof AppComponent
   */
  async presenceChange(presence: string, reason?: string) {
    return new Promise<void>((resolve, reject) => {
      if (reason === null) {
        console.log(`Presence Changed: ${presence}`);
      } else {
        console.log(`Presence Changed: ${presence} for this reason: ${reason}`);
      }
      this.presence = presence;
    });
  }

  /**
   * This function is used to receive a call from the simulator or api.
   *
   * @memberof AppComponent
   */
  newCall() {
    if (this.presence === 'Ready') {
      // setPresence() is used to send a new presence to the global presence through the DaVinci api.
      setPresence('Not Ready', 'Receiving a Call');
      console.log('New Call');
      this.calls = [...this.calls, this.simulatorService.newCall()];
    } else {
      console.log(
        `The presence is ${this.presence}, agent is not accepting calls.`
      );
    }
  }

  /**
   * This function increments the index for the array of phone numbers.
   *
   * @memberof AppComponent
   */
  getNextPhoneNumber() {
    console.log('Next Phone Number');
    this.simulatorService.getNextPhoneNumber();
  }

  /**
   * This function is called when the call is dropped by any party.
   *
   * @param {string} id
   * @memberof AppComponent
   */
  dropCall(id: string) {
    console.log(`Dropped Call id = ${id}`);
    this.calls = this.calls.filter(call => call.id !== id);
    // setPresence() is used to send a new presence to the global presence through the DaVinci api.
    setPresence('Ready', 'Call Dropped');
  }
}
