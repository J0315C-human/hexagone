
export type HexType = 'normal' | 'buffer';

export interface HexDef {
    i: number;
    j: number;
    timing: {
        delay: number;
        interval?: number;
    };
    type?: HexType;
    dir?: number[] | number;
}


export type MapDef = HexDef[];