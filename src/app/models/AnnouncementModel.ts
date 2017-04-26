
export class AnnouncementModel {
  constructor(
    public content: string,
    public ownerId: string,
    public createdAt: Date,
    public status: boolean,
    public clubId: string
  ) {}
}
