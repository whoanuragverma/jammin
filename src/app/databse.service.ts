import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class DatabseService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {
    // Check if doc with collection uid exists otherwise create it.
    // this.checkNewUser();
  }
  // async checkNewUser() {
  //   const uid = (await this.afAuth.currentUser).uid;
  //   this.db
  //     .collection('users')
  //     .doc(uid)
  //     .get()
  //     .subscribe((doc) => {
  //       if(!doc.exists){
  //         doc.ref.
  //       }
  //     });
  // }
  async getPlaylist() {
    const uid = (await this.afAuth.currentUser).uid;
    return this.db
      .collection(`users`)
      .doc(uid)
      .collection('playlist')
      .snapshotChanges();
  }
  async createPlaylist() {
    const uid = (await this.afAuth.currentUser).uid;
    return this.db
      .collection('users')
      .doc(uid)
      .collection('playlist')
      .get()
      .subscribe((data) => {
        const num = data.size;
        this.db
          .collection('users')
          .doc(uid)
          .collection('playlist')
          .add({
            title: `My Playlist #${num + 1}`,
            public: false,
          });
      });
  }
}
