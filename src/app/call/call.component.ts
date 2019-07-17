import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  setInteraction,
  IInteraction,
  InteractionDirectionTypes,
  ChannelTypes,
  InteractionStates,
  RecordItem,
  registerClickToDial,
  registerScreenpop,
  SearchRecords
} from '@amc-technology/davinci-api';
import { timer } from 'rxjs';
import { clearResolutionOfComponentResourcesQueue } from '@angular/core/src/metadata/resource_loading';

/**
 * This component handles calls and their interactions.
 *
 * @export
 * @class CallComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-call',
  templateUrl: './call.component.html',
  styleUrls: ['./call.component.scss']
})
export class CallComponent implements OnInit {
  @Input() id: number;
  @Input() number: string;
  @Output() callEnd = new EventEmitter();
  interaction: IInteraction;
  callTimer = timer(0, 1000); // timer for call time that starts when a call is initiated
  currentTime = 0; // value of the timer in seconds
  holdTimes = []; //
  holdStart = 0;
  holdEnd = 0;
  totalHoldTime = 0;
  currentHoldTime = 0;
  subscription;

  constructor() {
    this.callTimer.subscribe(val => (this.currentTime = val));
  }

  /**
   * This method formats the timer.
   *
   * @param {number} seconds
   * @returns a string of the format "00m00s"
   * @memberof CallComponent
   */
  formatTimer(seconds: number) {
    const minutes: number = Math.floor(seconds / 60);
    const minuteString =
      minutes < 10 ? '0' + minutes.toFixed(0) : minutes.toFixed(0);
    const remainingSeconds: number = seconds % 60;
    const secondString =
      remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds;
    return `${minuteString}m${secondString}s`;
  }

  /**
   * This function creates an interaction based on the call being made.
   *
   * @memberof CallComponent
   */
  ngOnInit() {
    const interactionDetails = new RecordItem('', '', '');
    interactionDetails.setPhone('phoneNumber', 'phoneNumber', this.number);
    this.interaction = {
      interactionId: this.id.toString(),
      direction: InteractionDirectionTypes.Inbound,
      state: InteractionStates.Alerting,
      channelType: ChannelTypes.Telephony,
      details: interactionDetails
    };

    setInteraction(this.interaction);
  }

  /**
   * This function changes the state of the interaction to Connected
   *
   *
   * @memberof CallComponent
   */
  answerCall() {
    this.interaction.state = InteractionStates.Connected;
    setInteraction(this.interaction);
  }

  /**
   * This function ends the call when the "End Call" button is hit.
   *
   * @memberof CallComponent
   */
  endCall() {
    this.interaction.state = InteractionStates.Disconnected;
    setInteraction(this.interaction);
    this.removeCall();
  }

  /**
   * This method drops the call when called by the endCall method call it.
   *
   * @memberof CallComponent
   */
  removeCall() {
    this.callEnd.emit();
  }

  /**
   * This method puts the call on hold when the "Hold Call" button is hit
   *
   * @memberof CallComponent
   */
  holdCall() {
    console.log(`On hold at ${this.currentTime}`);
    this.holdStart = this.currentTime;
    this.interaction.state = InteractionStates.OnHold;
    const holdTimer = timer(0, 1000);
    this.subscription = holdTimer.subscribe(
      val => (this.currentHoldTime = val + this.totalHoldTime)
    );
    setInteraction(this.interaction);
  }

  /**
   * This method takes the call off of hold when the "Unhold Call" nutton is hit.
   *
   * @memberof CallComponent
   */
  unholdCall() {
    console.log(`Off hold at ${this.currentTime}`);
    this.holdEnd = this.currentTime;
    this.holdTimes = [...this.holdTimes, this.holdEnd - this.holdStart];
    console.log(`Hold Times: ${this.holdTimes}`);
    this.subscription.unsubscribe();
    this.totalHoldTime = this.calculateHold();
    this.interaction.state = InteractionStates.Connected;
    setInteraction(this.interaction);
  }

  /**
   * This method calculates the total time on hold from the hold times array.
   *
   * @returns the value hold
   * @memberof CallComponent
   */
  calculateHold() {
    let hold = 0;
    for (let i = 0; i < this.holdTimes.length; i++) {
      hold += this.holdTimes[i];
    }
    console.log(`Total Hold Time: ${hold}`);
    return hold;
  }

  getInteractionStateAsString(state: InteractionStates) {
    return InteractionStates[state];
  }
}
