import { Label } from './label';
import { Collaborator } from './collaborator';

export interface Note {
    noteId: string;
    title: string;
    description: string;
    archive: boolean;
    pinned: boolean;
    inTrash: boolean;
    userId: string;
    color:string;
    labels:Label[];
    collaborators:Collaborator[];
}