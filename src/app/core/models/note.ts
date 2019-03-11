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
    // setArchive(archive : boolean){
    //     this.archive=archive;
    // }

    //  getArchive():boolean{
    //     return this.archive;
    // }

    // get archiveNote(): boolean {
    //     return this.archive;
    // }

    // set archiveNote(myarchive: boolean) {
    //     this.archive = myarchive;
    // }
}