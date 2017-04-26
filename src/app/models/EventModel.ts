/**
 * Created by Tesfay on 4/23/2017.
 */

export class EventModel {
  constructor(
  public eventName: string,
  public eventStartCity: string,
  public eventStartState: string,
  public eventStartPostCode: number,
  public eventEndCity: string,
  public eventEndState: string,
  public eventEndPostCode: number,
  public eventStartDateTime: Date,
  public eventOwnerId: number,
  public eventStatus: string,
  public eventUsers: [any],
  public eventDesc: string,
  public clubId: string,
  public eventStartLoc: any,
  public eventEndLoc: any
  ) {}
}
