export class GPSData {  
    public constructor(init?: Partial<GPSData>) {
        Object.assign(this, init);
      }
    
    public lat: string;  
    public lon: string;  
    public speed: string;
    public user: string;  
}