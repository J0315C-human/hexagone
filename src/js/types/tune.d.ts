export type NoteCollection = string[];

export interface ChordChange {
  notes: NoteCollection;
  beats: number;
}


export interface Tune {
  scale: NoteCollection;
  changes: ChordChange[];
}