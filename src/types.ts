export enum GeneratorMode {
 Random = 'RANDOM',
 Pin = 'PIN',
 Memorize = 'MEMORIZE'
}

export enum Note {
 Info = 'info',
 Error = 'error'
}

export interface RandomSettings {
 [key: string]: [boolean, () => string];
}

export interface RandomPasswordSettings {
 uppercaseSetting: HTMLInputElement;
 lowercaseSetting: HTMLInputElement;
 numbersSetting: HTMLInputElement;
 symbolsSetting: HTMLInputElement;
}

export interface MemorizePasswordSettings {
 upperStartSetting: HTMLInputElement;
 wholeWordSetting: HTMLInputElement;
}

export interface LengthRelatedElements {
 lengthLabel: HTMLSpanElement;
 lengthType: HTMLSpanElement;
 lengthSlider: HTMLInputElement;
}