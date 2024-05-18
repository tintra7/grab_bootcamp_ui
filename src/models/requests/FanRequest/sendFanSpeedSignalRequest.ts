import { FANSPEEDFORFAN, STATUS, FANLIGHT, FANSWING} from "@/constants/enum";

interface SendFanSpeedSignalRequest {
    userId: string;
    fanId: string;
    //name: string;
    fanSpeed: FANSPEEDFORFAN;

}

export default SendFanSpeedSignalRequest