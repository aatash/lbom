<template>
  <div class="magic">

    <div class="row images">
      <div class="col">
        <img class="featured-img" src="../assets/home1.jpg">
      </div>
      <div class="col">
        <img class="featured-img" src="../assets/home2.jpg">
      </div>
      <div class="col">
        <img class="featured-img" src="../assets/home3.jpg">
      </div>
    </div>

    <div class="row description">
      <p>Little Bits of Magic is a way for teachers to share what works with other teachers. You can submit anything from a lesson plan to a method of scaffolding to a fun activity. No matter how in depth or simple, your magic can help other teachers! Please submit so we can share our craft by going to the "Share Your Magic" page. Also, please take a look at the various pieces of magic that have already been shared below!</p>
    </div>

    <h3 class="magic-heading">The Magic</h3>

    <div class="loading" v-if="!bits.length">
      <img src="../assets/loading.gif">
    </div>

    <div class="card-columns">

      <template v-for="(magic, index) in bits">
          <div class="card">
            <div class="card-block">
              <h4 class="card-title">{{ magic.name }}</h4>
              <div class="categories"><span class="badge badge-pill badge-default" v-for="(value, category) in magic.categories" v-bind:class="category">{{ category }}</span></div>
              <p class="card-text" v-if="magic.body" >{{ magic.body.purpose }}</p>
              <router-link :to="'/magic/' + magic['.key']">Read more</router-link>
              <!-- <a :href="'/magic/' + magic['.key']">Read more</a> -->
            </div>
            <div class="card-footer">
              <small class="text-muted" v-if="users[magic.uid]"> Contributed by {{ users[magic.uid].displayName }}</small>
              <small class="text-muted" v-else-if="magic.custom_user"> Contributed by {{ magic.custom_user.name }}</small>
            </div>
          </div>
      </template>

    </div>
  </div>
</template>

<script>
import main from 'main'
// let config = {
//   apiKey: 'AIzaSyAYR8GtLbo6x0JgPLR9JBR208PT6FL71gc',
//   authDomain: 'lbom-5655a.firebaseapp.com',
//   databaseURL: 'https://lbom-5655a.firebaseio.com',
//   storageBucket: 'lbom-5655a.appspot.com',
//   messagingSenderId: '446202607746'
// }

// let app = Firebase.initializeApp(config)
// let db = app.database()
// let bitsRef = db.ref('bits/')

export default {
  name: 'magic',
  props: ['bitsList'],
  // data () {
  //   return {
  //     msg: 'hi'
  //   }
  // },
  firebase: function () {
    return {
      bits: main.bitsRef,
      users: {
        source: main.db.ref('users/'),
        // optionally bind as an object
        asObject: true,
        // optionally provide the cancelCallback
        cancelCallback: function () {}
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  /*color: #42b983;*/
}

.loading {
  /*width: 100%;*/
  text-align: center;
}

.loading img {
  width: 120px;
}

.magic-heading {
  text-align: center;
  margin-bottom: 15px;
}

img.featured-img {
  width: 100%;
}

.images {
  text-align: center;
}

.description {
  padding: 10px 15px;
}

.description p {
  margin-bottom: 5px;
}

.card {
  margin-bottom: 20px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
}

.magic {
/*  margin-top: 20px;
*/}

.categories {
  margin-bottom: 10px;
}

</style>
