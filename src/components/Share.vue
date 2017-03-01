<template>


  <form class="share-form">

    <h2 class="form-title">Share Your Magic</h2>

    <h3 class="form-header">Part 1: About the Teacher</h3>

    <div class="form-group">
      <label for="user-name">Name<span class="required">*</span></label>
      <input type="text" class="form-control" id="user-name" placeholder="How do you want your name to appear?" v-model="bit.custom_user.name">
    </div>

    <div class="form-group">
      <label for="user-title">Title<span class="required">*</span></label>
      <input type="text" class="form-control" id="user-title" placeholder="12th Grade Humanities Teacher" v-model="bit.custom_user.title">
    </div>

    <div class="form-group">
      <label for="user-school">School<span class="required">*</span></label>
      <input type="text" class="form-control" id="user-school" placeholder="High Tech High Chula Vista" v-model="bit.custom_user.school">
    </div>

    <h3 class="form-header">Part 2: About the Magic</h3>

    <div class="form-group">
      <label for="bit-name">Name Your Magic<span class="required">*</span></label>
      <input type="text" class="form-control" id="bit-name" placeholder="Name your magic" v-model="bit.name">
    </div>

    <div class="form-group">
      <label for="bit-categories">Category<span class="required">*</span></label>
      <small id="categoriesHelp" class="form-text text-muted">Select all that apply.</small>
      <select multiple class="form-control" id="bit-categories" v-model="categoriesSelected">
        <option v-for="(option, key) in categories" :value="key" v-if="option !== 'categories'">
          {{ option }}
        </option>
      </select>
      <div class="categories"><span class="badge badge-pill badge-default" v-for="key in categoriesSelected" :class="categories[key]">{{ categories[key] }}</span></div>

<!--       <div class="form-check" v-for="(option, key) in categories" >
        <label class="form-check-label">
          <input class="form-check-input" type="checkbox" v-model="categoriesSelected" :value="key">
            {{ option }}
        </label>
      </div>
      <span>Selected: {{ categoriesSelected }}</span> -->

    </div>

    <div class="form-group">
      <label for="bit-purpose">Purpose<span class="required">*</span></label>
      <textarea  rows="3" type="bit-purpose" class="form-control" id="bit-purpose" placeholder="What is the PURPOSE of your magic?" v-model="bit.body.purpose"></textarea>
    </div>

    <div class="form-group">
      <label for="bit-purpose">Materials</label>
      <textarea  rows="3" type="bit-materials" class="form-control" id="bit-materials" placeholder="What MATERIALS does one need to make this magic happen?" v-model="bit.body.materials"></textarea>
    </div>

    <div class="form-group">
      <label for="bit-purpose">Procedure</label>
      <textarea  rows="3" type="bit-procedure" class="form-control" id="bit-procedure" placeholder="What is the PROCEDURE for this magic to be successful?" v-model="bit.body.procedure"></textarea>
    </div>

    <div class="form-group">
      <label for="bit-purpose">Variations</label>
      <textarea  rows="3" type="bit-variations" class="form-control" id="bit-variations" placeholder="Are there VARIATIONS to this magic that one could use to keep it spicy?" v-model="bit.body.variations"></textarea>
    </div>

    <div class="form-group">
      <label for="bit-purpose">References</label>
      <textarea  rows="1" type="bit-references" class="form-control" id="bit-references" placeholder="Did you adapt this from someone else's magic?" v-model="bit.body.references"></textarea>
    </div>

    <div class="form-group">
      <label for="exampleInputFile">Attach an image</label>
      <div v-if="!bit.image">
        <input type="file" @change="onImgFileChange" accept="image/*">
      </div>
      <div v-else>
        <div v-if="!imgUploadTask">
          <img class="attached-image" :src="bit.image" />
        </div>
        <div>
          <button type="button" class="btn btn-link" @click="removeImage">{{ imgMessage }}</button>
        </div>
      </div>
    </div>

    <div class="form-group">
      <label for="exampleInputFile">Add additional resources</label>
      <div>
        <input type="file" @change="onResourceFileChange" accept="pdf,audio/mp3,image/*">
      </div>
      <div class="attached-files">
        <br>
        <ul>
          <li v-for="resource in bit.files" v-if="resource.uploadStatus">
            <span v-if="resource.url">
              <a target="_blank" :href="resource.url">{{ resource.name }}</a>
              (<a class="remove-link" href="#" @click="removeResource" :id="resource.id">Remove</a>)
            </span>
            <span v-else>{{ resource.uploadStatus }}</span>
          </li>
        </ul>
      </div>
    </div>

    <br>

    <button type="submit" @click="submit" class="btn btn-primary">Submit Magic</button>

  </form>

</template>

<script>

import main from 'main'
export default {
  name: 'share',
  data () {
    return {
      bit: {
        name: null,
        body: {
          materials: null,
          procedure: null,
          purpose: null,
          references: null,
          variations: null
        },
        custom_user: {
          name: null,
          title: null,
          school: null
        },
        image: null,
        files: {},
        links: [],
        categories: {}
      },
      selected: 'A',
      imgMessage: 'Remove image',
      imgUploadTask: null,
      // options: [
      //   { text: 'One', value: 'A' },
      //   { text: 'Two', value: 'B' },
      //   { text: 'Three', value: 'C' }
      // ],
      categoriesSelected: []
    }
  },
  computed: {
    // a computed getter
    categoriesObject: function () {
      // `this` points to the vm instance
      var catObj = {}
      for (var key in this.categoriesSelected) {
        catObj.key = this.categories[key]
      }
      return catObj
    }
  },
  firebase: function () {
    return {
      bits: main.db.ref('bits'),
      users: {
        source: main.db.ref('users/'),
        // optionally bind as an object
        asObject: true,
        // optionally provide the cancelCallback
        cancelCallback: function () {}
      },
      categories: {
        source: main.db.ref('categories/'),
        // optionally bind as an object
        asObject: true,
        // optionally provide the cancelCallback
        cancelCallback: function () {}
      }
    }
  },
  methods: {
    submit () {
      var c = this.categoriesSelected
      for (var i = 0; i < c.length; i++) {
        var catId = c[i]
        var categoryName = this.categories[catId]
        this.bit.categories[categoryName] = true
      }
      console.log(this.bit)
      this.$firebaseRefs.bits.push(this.bit)
    },

    // IMAGE

    onImgFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createImage(files[0])
    },
    createImage (file) {
      // var image = new Image()
      var vm = this
      vm.bit.image = true

      // Firebase Storage

      let storageRef = main.storage.ref()
      var imageRef = storageRef.child(file.name)
      var uploadTask = imageRef.put(file)
      vm.imgUploadTask = uploadTask

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed', // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log('Upload is ' + progress + '% done')
          vm.imgMessage = 'Upload is ' + Math.round(progress) + '% done (Cancel)'
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        }, function (error) {
          vm.imgUploadTask = null
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break
            case 'storage/canceled':
              // User canceled the upload
              break
            // ...
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        }, function () {
        // Upload completed successfully, now we can get the download URL
          var downloadURL = uploadTask.snapshot.downloadURL
          vm.bit.image = downloadURL
          vm.imgMessage = 'Remove Image'
          vm.imgUploadTask = null
          console.log(downloadURL)
        }
      )
    },
    removeImage: function (e) {
      if (this.imgUploadTask) {
        this.imgUploadTask.cancel()
      }
      this.bit.image = null
    },

    // FILES

    onResourceFileChange (e) {
      var files = e.target.files || e.dataTransfer.files
      if (!files.length) {
        return
      }
      this.createResource(files[0])
    },
    createResource (file) {
      // var image = new Image()
      var vm = this

      // Firebase Storage

      let storageRef = main.storage.ref()
      var resourceRef = storageRef.child(file.name)
      var uploadTask = resourceRef.put(file)

      var resource = {}
      resource['name'] = file.name
      resource['id'] = Object.keys(vm.bit.files).length + 1
      resource['uploadTask'] = uploadTask
      resource['uploadStatus'] = 'started'
      vm.$set(vm.bit.files, resource['id'], resource)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed', // or 'state_changed'
        function (snapshot) {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          console.log(file.name + ' is ' + progress + '% uploaded')
          vm.$set(resource, 'uploadStatus', file.name + ' is ' + Math.round(progress) + '% uploaded')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        }, function (error) {
          resource['uploadStatus'] = null
          alert('Upload failed :(')
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break
            case 'storage/canceled':
              // User canceled the upload
              break
            // ...
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        }, function () {
        // Upload completed successfully, now we can get the download URL
          var downloadURL = uploadTask.snapshot.downloadURL
          console.log(resource)
          vm.$set(resource, 'url', downloadURL)
          vm.$set(resource, 'uploadStatus', 'done')
          vm.$set(resource, 'uploadTask', null)
          console.log(vm.bit)
        }
      )
    },
    removeResource: function (e) {
      e.preventDefault()
      var id = e.target.id
      this.$set(this.bit.files[id], 'uploadStatus', null)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .share-form {
    max-width: 800px;
    margin: 25px auto;
    padding-bottom: 25px;
  }

  .form-title {
    text-align: center;
  }

  .form-header {
    margin-bottom: 30px;
    margin-top: 30px;
  }

  .btn-link {
    padding-left: 0;

  }

  ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
    color: gray;
    opacity: 0.5;
  }
  ::-moz-placeholder { /* Firefox 19+ */
    color: gray;
    opacity: 0.5;
  }
  :-ms-input-placeholder { /* IE 10+ */
    color: gray;
    opacity: 0.5;
  }
  :-moz-placeholder { /* Firefox 18- */
    color: gray;
    opacity: 0.5;
  }

  .categories {
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .required {
    color: red;
  }

  .attached-image {
    max-width: 50%;
  }

</style>
