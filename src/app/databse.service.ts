import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { v4 } from 'uuid';
import * as firebase from 'firebase/app';
@Injectable({
  providedIn: 'root',
})
export class DatabseService {
  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  async removeLiked(data) {
    const uid = (await this.afAuth.currentUser).uid;
    const identifier = btoa(data['media']['low']);
    this.db
      .collection('users')
      .doc(uid)
      .collection('liked')
      .doc(identifier)
      .delete();
  }
  async addRecent(data) {
    const uid = (await this.afAuth.currentUser).uid;
    const identifier = btoa(data['media']['low']);
    this.db
      .collection('users')
      .doc(uid)
      .collection('recents')
      .doc(identifier)
      .set(
        {
          lastStream: firebase.default.firestore.FieldValue.serverTimestamp(),
          stream: firebase.default.firestore.FieldValue.arrayUnion(new Date()),
          ...data,
          count: firebase.default.firestore.FieldValue.increment(1),
        },
        { merge: true }
      );
  }
  async getLiked() {
    const uid = (await this.afAuth.currentUser).uid;
    return this.db
      .collection('users')
      .doc(uid)
      .collection('liked')
      .valueChanges();
  }
  async getRecent() {
    const uid = (await this.afAuth.currentUser).uid;
    return this.db
      .collection('users')
      .doc(uid)
      .collection('recents', (ref) => ref.orderBy('lastStream', 'desc'))
      .valueChanges();
  }
  async isLiked(data) {
    const uid = (await this.afAuth.currentUser).uid;
    const identifier = btoa(data?.media?.low);
    return this.db
      .collection('users')
      .doc(uid)
      .collection('liked')
      .doc(identifier)
      .get();
  }
  async addLiked(data) {
    const uid = (await this.afAuth.currentUser).uid;
    const identifier = btoa(data['media']['low']);
    this.db
      .collection('users')
      .doc(uid)
      .collection('liked')
      .doc(identifier)
      .set(data, { merge: true });
  }
  async cached(data, mediaQuality?) {
    const uid = (await this.afAuth.currentUser).uid;
    const identifier = btoa(data['media']['low']);
    const uuidL = localStorage.getItem('uuid');
    if (!uuidL) {
      localStorage.setItem('uuid', v4());
    }
    const uuid = localStorage.getItem('uuid');
    this.db
      .collection('users')
      .doc(uid)
      .collection('cache')
      .doc(uuid)
      .collection('0')
      .doc(identifier)
      .set({ mediaQuality: mediaQuality, ...data }, { merge: true });
  }
  async getQueue() {
    const uid = (await this.afAuth.currentUser).uid;
    return this.db
      .collection('users')
      .doc(uid)
      .collection('nowPlaying')
      .doc('queue')
      .valueChanges();
  }
  async addToPL(plID, value) {
    const uid = (await this.afAuth.currentUser).uid;
    this.db
      .collection(`users`)
      .doc(uid)
      .collection('playlist')
      .doc(plID)
      .collection('list')
      .doc()
      .set({
        added: firebase.default.firestore.FieldValue.serverTimestamp(),
        ...value,
      });
  }
  async getPlaylist() {
    const uid = (await this.afAuth.currentUser).uid;
    return this.db
      .collection(`users`)
      .doc(uid)
      .collection('playlist')
      .snapshotChanges();
  }
  async nextSong(value) {
    const uid = (await this.afAuth.currentUser).uid;
    this.db
      .collection('users')
      .doc(uid)
      .collection('nowPlaying')
      .doc('queue')
      .get()
      .subscribe((data) => {
        const dataT = data.data();
        const index = dataT['index'];

        if (index + value >= 0 && index + value < dataT['list'].length) {
          this.db
            .collection('users')
            .doc(uid)
            .collection('nowPlaying')
            .doc('queue')
            .update({ index: index + value });
          this.setNowPlayingfrmQueue(dataT['list'][dataT['index'] + value]);
        }
      });
  }
  private async getNextSong() {
    const uid = (await this.afAuth.currentUser).uid;
    this.db
      .collection('users')
      .doc(uid)
      .collection('nowPlaying')
      .doc('queue')
      .get()
      .subscribe((data) => {
        const dataT = data.data();
        this.setNowPlayingfrmQueue(dataT['list'][dataT['index']]);
      });
  }
  async getUser() {
    return (await this.afAuth.currentUser).uid;
  }
  async nowPlaying() {
    const uid = (await this.afAuth.currentUser).uid;
    return this.db
      .collection('users')
      .doc(uid)
      .collection('nowPlaying')
      .doc('playing')
      .valueChanges();
  }
  async setNowPlaying(data) {
    const uid = (await this.afAuth.currentUser).uid;
    return this.db
      .collection('users')
      .doc(uid)
      .collection('nowPlaying')
      .doc('playing')
      .set(data);
  }
  private setNowPlayingfrmQueue(data) {
    const { title, album, album_url, explicit } = data as any;
    let artist = [];
    data?.artists.forEach((element) => {
      if (artist.length < 2)
        artist.push({
          name: element?.name,
          url: element?.url.split('/')[1],
        });
    });
    let temp = [];
    artist.forEach((el) => temp.push(JSON.stringify(el)));
    temp = [...new Set(temp)];
    artist = [];
    temp.forEach((el) => artist.push(JSON.parse(el)));
    let media = {};
    Object.keys(data?.media).forEach((element) => {
      media[element] = `https://cdn.jammin.workers.dev/${data?.media[element]}`;
    });
    const url = `https://cdn.jammin.workers.dev/${
      data?.image['50x50'].split('50x50.jpg')[0]
    }`;
    this.setNowPlaying({
      title,
      album,
      album_url,
      artist,
      media,
      explicit,
      url,
    });
  }

  async newQueue(items) {
    const uid = (await this.afAuth.currentUser).uid;
    this.db
      .collection('users')
      .doc(uid)
      .collection('nowPlaying')
      .doc('queue')
      .set({
        list: items,
        index: 0,
      });
    this.setNowPlayingfrmQueue(items[0]);
  }
  async addToQueue(value) {
    const uid = (await this.afAuth.currentUser).uid;
    this.db
      .collection('users')
      .doc(uid)
      .collection('nowPlaying')
      .doc('queue')
      .get()
      .subscribe((data) => {
        const dataT = data.data();

        this.db
          .collection('users')
          .doc(uid)
          .collection('nowPlaying')
          .doc('queue')
          .set({ list: [...dataT.list, value] }, { merge: true });
      });
  }
  async getSearch() {
    const uid = (await this.afAuth.currentUser).uid;
    return this.db
      .collection('users')
      .doc(uid)
      .collection('search', (ref) => ref.orderBy('updated', 'desc'))
      .valueChanges();
  }
  async setSearch(value) {
    const uid = (await this.afAuth.currentUser).uid;
    this.db
      .collection('users')
      .doc(uid)
      .collection('search')
      .doc(btoa(value['image']))
      .set(
        {
          updated: firebase.default.firestore.FieldValue.serverTimestamp(),
          ...value,
        },
        { merge: true }
      );
  }
  async playNext(value) {
    const uid = (await this.afAuth.currentUser).uid;
    this.db
      .collection('users')
      .doc(uid)
      .collection('nowPlaying')
      .doc('queue')
      .get()
      .subscribe((data) => {
        const dataT = data.data();
        let l: Array<any> = dataT['list'];
        l.splice(dataT['index'] + 1, 0, value);
        this.db
          .collection('users')
          .doc(uid)
          .collection('nowPlaying')
          .doc('queue')
          .set({ list: l }, { merge: true });
      });
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
            created: firebase.default.firestore.FieldValue.serverTimestamp(),
          });
      });
  }
}
