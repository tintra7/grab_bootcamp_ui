// import { FANLIGHT, FANSWING, STATUS, FANSPEEDFORFAN } from '@/constants/enum'

export interface LinkFanRequest {
    userId: string;
    name: string;
    // status: STATUS;
    // fanSpeed: FANSPEEDFORFAN;
    // swing: FANSWING;
    // light: FANLIGHT;
}

export const initialLinkFanRequest: LinkFanRequest = {
    userId: 'empty',
    name: '',
    // status: STATUS.INACTIVE,
    // fanSpeed: FANSPEEDFORFAN.NONE,
    // swing: FANSWING.OFF, 
    // light: FANLIGHT.OFF
}