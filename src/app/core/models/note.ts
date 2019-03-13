import { Label } from './label';

export interface Note {
    noteId: string;
    title: string;
    description: string;
    archive: boolean;
    pinned: boolean;
    inTrash: boolean;
    userId: string;
    labels:Label[];
}