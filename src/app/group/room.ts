export class Room {
    public constructor(init?: Partial<Room>) {
      Object.assign(this, init);
    }
  
    roomName: string;
  }
  