<template>

  <div class="loading" v-if="loading">
    Loading...
  </div>

  <div v-else-if="error" class="error">
    {{ error }}
  </div>

  <div v-else-if="bit" class="bit">

    <div class='bit-header'>
      <h2 class='bit-title'>{{ bit.name }}</h2>
      <i class='author' v-if="users[bit.uid]">{{ users[bit.uid].displayName }}</i>
      <i class='author' v-else-if="bit.custom_user">{{ bit.custom_user.name }}</i>
      <div class="categories"><span class="badge badge-pill badge-default" v-for="(value, category) in bit.categories" v-bind:class="category">{{ category }}</span></div>
      <br>
      <div v-if="bit.image">
        <img :src="bit.image">
      </div>
    </div>

    <div v-if="bit.body">

      <div v-if="bit.body.purpose">
        <h4>Purpose</h4>
        <p>{{ bit.body.purpose }}</p>
      </div>

      <div v-if="bit.body.materials">
        <h4>Materials</h4>
        <p>{{ bit.body.materials }}</p>
      </div>

      <div v-if="bit.body.procedure">
        <h4>Procedure</h4>
        <p>{{ bit.body.procedure }}</p>
      </div>

      <div v-if="bit.body.references">
        <h4>References</h4>
        <p>{{ bit.body.references }}</p>
      </div>

      <div v-if="bit.body.variations">
        <h4>Variations</h4>
        <p>{{ bit.body.variations }}</p>
      </div>

    </div>

    <div v-if="bit.files" class="attached-files">
      <h4>Resources</h4>
      <ul>
        <li v-for="resource in bit.files" v-if="resource">
          <span v-if="resource.url">
            <a target="_blank" :href="resource.url">{{ resource.name }}</a>
          </span>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>

import main from 'main'
export default {
  name: 'bit',
  data () {
    return {
      loading: false,
      bit: null,
      error: null
    }
  },
  created () {
    // fetch the data when the view is created and the data is
    // already being observed
    this.fetchData()
  },
  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },
  methods: {
    fetchData () {
      this.error = this.bit = null
      this.loading = true
      // replace getPost with your data fetching util / API wrapper

      return main.db.ref('/bits/' + this.$route.params.bit).once('value').then(function (snapshot) {
        this.$data.loading = false
        if (!snapshot.val()) {
          this.$data.error = "Couldn't find the magic!"
        } else {
          this.$data.bit = snapshot.val()
        }
      }.bind(this))
    }
  },
  firebase: function () {
    return {
      users: {
        source: main.db.ref('users/'),
        // optionally bind as an object
        asObject: true,
        // optionally provide the cancelCallback
        cancelCallback: function () {}
      }
    }
  },
  mounted: function () {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.bit {
  padding: 50px;
/*  border: 1px solid gray;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);*/
}

.bit-title {
}

i.author {
}

h4 {
  margin-top: 30px;
}

.bit-header {
  text-align: center;
}

.bit-header img {
  max-width: 50%;
}

.categories {
  margin-bottom: 10px;
  margin-top: 10px;
}

p {
  white-space: pre-wrap;
}

</style>
