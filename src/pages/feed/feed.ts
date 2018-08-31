import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import moment from 'moment';
@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
  
  text:string = "";
  posts:any[] = [];
  pageSize: number = 10;
  cursor:any;
  infiniteEvent:any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
   this.getPosts()
  }

  

  getPosts(){
    this.posts = []
    let query = firebase.firestore().collection('posts').orderBy("created","desc").limit(this.pageSize);
    // query.onSnapshot((snapshot)=>{
    //  let changedDocs = snapshot.docChanges();
    //  changedDocs.forEach(change=>{
    //     if (change.type == "added") {
          
    //     }
    //     if (change.type == "modified") {
    //       console.log("Document with id"+change.doc.id + "has been modified");
    //     }
    //     if (change.type == "removed") {
          
    //     }
    //  })

    // })
    query.get()
    .then(docs=>{
      docs.forEach(doc=>{
        this.posts.push(doc);
      })

      this.cursor = this.posts[this.posts.length - 1];
      console.log('the cursor from LOAD POSTS is ',this.posts.length - 1);
      console.log(this.posts)
    }).catch(err=>{
      console.log(err)
    })
  }

  
  loadMorePosts(event){
   
    firebase.firestore().collection('posts').orderBy("created","desc").startAfter(this.cursor).limit(this.pageSize).get()
    .then(docs=>{
      docs.forEach(doc=>{
        this.posts.push(doc);
      })
      console.log(this.posts)
      if (docs.size < this.pageSize) {
        event.enable(false)
        this.infiniteEvent = event;
      }else{
        //tell the loading is complete
        event.complete()
        this.cursor = this.posts[this.posts.length-1]
        console.log('the cursor from load more post is ',this.posts.length - 1);
      }


    }).catch(err=>{
      console.log(err)
    })
  }

  refresh(event){
    this.posts = [];
    this.getPosts();
    if (this.infiniteEvent) {
      this.infiniteEvent.enable(true);
    }
    
    event.complete();
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

  ago(time){
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize();

  }
  // ago(time) {
  //   let difference = moment(time).diff(moment());
  //   return moment.duration(difference).humanize();
  // }

}
