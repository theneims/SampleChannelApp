import { Injectable } from '@angular/core';

/**
 * This service simulates the functonality of a Channel API.
 * You can plug an api straight into this service.
 *
 * @export
 * @class SimulatorService
 */
@Injectable({
  providedIn: 'root'
})
export class SimulatorService {
  phoneNumbers = ['1234567890', '2345678901', '3456789012', '4567890123']; // All phone numbers should be dialstrings
  nextPhoneNumberIndex = 0; // Index for the array of phone numbers

  constructor() {}

  /**
   * This method takes a new call.
   *
   * @returns
   * @memberof SimulatorService
   */
  public newCall() {
    return {
      id: `Call-${(Math.random() * 1000000).toFixed(0)}`,
      number: this.getNextPhoneNumber()
    };
  }

  /**
   * This method makes a new outbound call.
   *
   * @param {string} phone
   * @returns
   * @memberof SimulatorService
   */
  public newOutboundCall(phone: string) {
    return {
      id: `Call-${(Math.random() * 1000000).toFixed(0)}`,
      number: phone
    };
  }

  /**
   * This method is used cycle through the array of phone numbers.
   *
   * @returns
   * @memberof SimulatorService
   */
  public getNextPhoneNumber() {
    const result = this.phoneNumbers[this.nextPhoneNumberIndex];
    this.nextPhoneNumberIndex =
      (this.nextPhoneNumberIndex + 1) % this.phoneNumbers.length;
    return result;
  }
}
