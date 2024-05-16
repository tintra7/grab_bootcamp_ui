import { FANLIGHT, FANSWING, STATUS, FANSPEEDFORFAN } from '@/constants/enum'

// Fan interface to incorporate all features
export interface IFan {
    _id: string;
    userId: string;
    name: string;
    status: STATUS;
    fanSpeed: FANSPEEDFORFAN;
    swing: FANSWING;
    light: FANLIGHT;
    envTemp: number;
    humidity: number;
}