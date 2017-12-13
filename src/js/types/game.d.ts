
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

export type winType = 'all' | 'buffers' | 'sources';

export interface MapDef {
    winType: winType;
    hint?: string;
    hexes: HexDef[];
}

export type HexCoordinateSpace = HexLocation[][];