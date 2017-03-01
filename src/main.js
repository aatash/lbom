// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import router from './router'
import App from './App'
Vue.use(VueFire)

import Firebase from 'firebase'
let config = {
  apiKey: 'AIzaSyAYR8GtLbo6x0JgPLR9JBR208PT6FL71gc',
  authDomain: 'lbom-5655a.firebaseapp.com',
  databaseURL: 'https://lbom-5655a.firebaseio.com',
  storageBucket: 'lbom-5655a.appspot.com',
  messagingSenderId: '446202607746'
}

let app = Firebase.initializeApp(config)
let db = app.database()
let storage = app.storage()
let bitsRef = db.ref('bits/')

export default { app, db, storage, bitsRef }

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
  // data () {
  //   return {
  //     bitsList: []
  //   }
  // },
  // firebase: function () {
  //   return {
  //     bits: bitsRef
  //   }
  // },
  // mounted: function () {
  //   this.$firebaseRefs.bits.on('child_added', function (snapshot) {
  //     vm.$data.bitsList.unshift(snapshot.val())
  //     console.log(snapshot.val())
  //   })
  // }
})
