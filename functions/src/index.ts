import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
admin.initializeApp(functions.config().firebase);
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
export const helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello from Firebase!");
});

export const updateLikesCount = functions.https.onRequest((request,response)=>{
    console.log(request.body)
    const postId = request.body.postId;
    const userId = request.body.userId;
    const action = request.body.action;

    admin.firestore().collection("posts").doc(postId).get().then((data)=>{
        let likesCount = data.data().likesCount || 0;
        let likes = data.data().likes || [];


    })
})
