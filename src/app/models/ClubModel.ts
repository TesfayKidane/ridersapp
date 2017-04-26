
export class ClubModel {
  constructor(
  public clubName: string,
  public clubCity: string,
  public clubState: string,
  public clubPostCode: number,
  public clubImage: string,
  public clubOwnerId: number,
  public eventIds: any,
  public userIds: any,
  public announceIds: any
  ) {}
}
