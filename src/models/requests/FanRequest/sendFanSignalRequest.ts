import { FANSPEEDFORFAN, STATUS, FANLIGHT, FANSWING} from "@/constants/enum";

interface SendFanSignalRequest {
    userId: string;
    fanId: string;
    //name: string;
    status: STATUS;
    fanSpeed: FANSPEEDFORFAN;
    swing: FANSWING;
    light: FANLIGHT;
}

export default SendFanSignalRequest