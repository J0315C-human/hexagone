
export type HexType = 'normal' | 'buffer';

export interface HexLocation {
    i: number;
    j: number;
}

export interface HexPosition {
    x: number;
    y: number;
}

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

export type HexCoordinateSpace = HexLocation[][];