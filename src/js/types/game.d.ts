import { Tune } from './tune';

export type HexType = 'normal' | 'buffer' | 'pattern';

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
        delay?: number;
        interval?: number;
        pattern?: string;
    };
    type?: HexType;
    dir?: number[] | number;
    frozen?: boolean;
    note?: string;
}

export type winType = 'all' | 'buffers' | 'sources' | 'frozen' | 'unfrozen' | 'buffers+patterns' | 'patterns' | 'normals';

export interface MapDef {
    winType: winType;
    title: string;
    message?: string;
    hexes: HexDef[];
    tune: Tune;
}

export type HexCoordinateSpace = HexLocation[][];