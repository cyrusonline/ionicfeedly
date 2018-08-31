import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  
  text:string = "";
  posts:any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.getPosts();
  }

  getPosts(){
    this.posts = []
    firebase.firestore().collection('posts').get()
    .then(docs=>{
      docs.forEach(doc=>{
        this.posts.push(doc);
      })
      console.log(this.posts)
    }).catch(err=>{
      console.log(err)
    })
  }

  post(){
    console.log('post')
    firebase.firestore().collection('posts').add({
      text:this.text,
      created:firebase.firestore.FieldValue.serverTimestamp(),
      owner:firebase.auth().currentUser.uid,
      owner_name:firebase.auth().currentUser.displayName

    }).then((doc)=>{
      console.log(doc)
      this.getPosts()
    }).catch((err)=>{
      console.log(err)
    })
  }

}
