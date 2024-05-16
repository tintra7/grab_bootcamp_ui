export enum BRAND {
  TOSHIBA = 'TOSHIBA',
  MITSUBISHI = 'MITSUBISHI',
  DAIKIN = 'DAIKIN',
  LG = 'LG',
  SHARP = 'SHARP',
  SAMSUNG = 'SAMSUNG',
  PANASONIC = 'PANASONIC'
  // NEC = 'NEC'
}

export enum STATUS {
  ON = 'ON',
  OFF = 'OFF',
  INACTIVE = 'INACTIVE'
}

export enum MODE {
  COOLING = 'COOLING',
  DEFAULT = 'DEFAULT',
  MOISTURING = 'MOISTURING'
}

export enum FANSPEED {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

// Additional Enums for Fan-specific features
export enum FANSWING {
  ON = 'ON',
  OFF = 'OFF'
}

export enum FANLIGHT {
  ON = 'ON',
  OFF = 'OFF'
}

export enum FANSPEEDFORFAN {
  INCREASE = 'INCREASE',
  DECREASE = 'DECREASE',
  NONE = 'NONE'
}
