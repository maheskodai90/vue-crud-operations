<template>
  <div class="hello">
    <notifications group="foo" />
      <section class="testimonial py-5" id="testimonial">
          <div class="container">
              <div class="row ">
                  <div class="col-md-4 py-5 bg-primary text-white text-center ">
                      <div class=" ">
                          <div class="card-body">
                              <img src="http://www.ansonika.com/mavia/img/registration_bg.svg" style="width:30%">
                              <h2 class="py-3">Registration</h2>
                          </div>
                      </div>
                  </div>
                  <div class="col-md-8 py-5 border">
                      <h4 class="pb-4">Please fill with your details</h4>
                      <form>
                          <div class="form-row">
                              <div class="form-group col-md-6">
                                <input 
                                  id="Full Name" 
                                  name="name" 
                                  v-model="user.fullname" 
                                  v-validate="'required|alpha'" 
                                  :class="{'input': true, 'is-danger': errors.has('name') }" 
                                  placeholder="Full Name" 
                                  class="form-control" 
                                  type="text">
                                 <small v-show="errors.has('name')" class="field-text is-danger">{{ errors.first('name') }}</small>
                              </div>
                              <div class="form-group col-md-6">
                                <input 
                                  type="email" 
                                  name="emailvalid"
                                  class="form-control" 
                                  v-model="user.email" 
                                  :class="{'input': true, 'is-danger': errors.has('emailvalid') }" 
                                  id="inputEmail4" 
                                  v-validate="'required|email'"
                                  placeholder="Email">
                                  <small v-show="errors.has('emailvalid')" class="field-text is-danger">{{ errors.first('emailvalid') }}</small>
                              </div>
                            </div>
                          <div class="form-row">
                              <div class="form-group col-md-6">
                                  <input 
                                    id="Mobile No." 
                                    name="mobileno" 
                                    v-model="user.mobileno" 
                                    v-validate="'required|numeric'" 
                                    :class="{'input': true, 'is-danger': errors.has('mobileno') }" 
                                    placeholder="Mobile No." 
                                    class="form-control" 
                                    required="required" 
                                    type="text">
                                    <small v-show="errors.has('mobileno')" class="field-text is-danger" >{{ errors.first('mobileno') }}</small>
                                    
                              </div>
                              <div class="form-group col-md-6">
                                    <select id="inputState" 
                                      class="form-control" 
                                      name="chooseoption"
                                      v-model="user.chooseoption"
                                      v-validate="'required'" 
                                      :class="{'is-danger': errors.has('chooseoption') }" >
                                        <option selected>Choose ...</option>
                                        <option> New Buyer</option>
                                        <option> Auction</option>
                                        <option> Complaint</option>
                                        <option> Feedback</option>
                                    </select>
                                    <small v-show="errors.has('chooseoption')" class="field-text is-danger">{{ errors.first('chooseoption') }}</small>
                              </div>
                              <div class="form-group col-md-12">
                                  <textarea 
                                    id="comment" 
                                    v-model="user.comments" 
                                    name="comment" 
                                    v-validate="'required'" 
                                    :class="{'is-danger': errors.has('comment') }"
                                    cols="40" 
                                    rows="5" 
                                    class="form-control">
                                  </textarea>
                                  <small v-show="errors.has('comment')" class="field-text is-danger">{{errors.first('comment')}}</small>
                              </div>

                              <div class="form-group col-md-12">
                                <div style="float: left;width: 100%;text-align: left;">
                                  <input 
                                    type="file" 
                                    id="attach_picture" 
                                    name="image" 
                                    v-validate="'image'" 
                                    data-vv-as="image|size:10000" 
                                    @input="IconChange" 
                                    accept="image/*" 
                                    ref="form" multiple>
                                    <ul v-if="user.images.length>0">
                                      <li class="dataimg" v-for="img in user.images"> 
                                        <img 
                                          :src="`http://192.168.1.40:8000`+img.url" 
                                          :width="50" 
                                          :height="50"/> 
                                          <span @click="removeAttachment">&times;</span>
                                      </li>
                                    </ul> 

                                    <ul v-if="imgs_urls.length > 0">
                                      <li v-for="img in imgs_urls"> 
                                        <img 
                                          :src="img" 
                                          width="50" 
                                          height="50" />
                                      </li>
                                    </ul> 
                                  <span style="color:red;display: block;clear: both" v-if="image_alert">{{image_alert}}</span>
                                </div>
                              </div>
                          </div>
                          <div class="form-row">
                              <div class="form-group">
                                  <div class="form-group">
                                      <div class="form-check">
                                        <input 
                                        class="form-check-input" 
                                        v-model="user.aggreeterms" 
                                        name="aggree"
                                        v-validate="'required'"
                                        type="checkbox" 
                                        value="" 
                                        id="invalidCheck2">
                                        <label class="form-check-label" for="invalidCheck2">
                                          <small>By clicking Submit, you agree to our Terms & Conditions, Visitor Agreement and Privacy Policy.</small>
                                        </label>
                                      </div>
                                       <small v-show="errors.has('aggree')" class="field-text is-danger"> Please, agree the terms and conditions</small>
                                    </div>
                          
                                </div>
                          </div>
                          
                          <div class="form-row" v-if="submitButton">
                              <button type="button" class="btn btn-danger" @click.prevent="submitForm">Submit</button>
                          </div>

                          <div class="form-row" v-else>
                              <button type="button" class="btn btn-danger" @click="updateForm(user)">Update</button>
                          </div>
                      </form>
                  </div>
              </div>
          </div>
      </section>

   
  </div>
</template>

<script>
export default {
  props: ['currentItem'],
  data(){
    return{
      user : {
        fullname: '',
        email: '',
        mobileno: '',
        chooseoption:'',
        comments: '',
        aggreeterms: '',
        images:[]
    },
    users : [],
    submitButton: true,
    image_alert:'',
    files: [],
    imgs_urls: []
    }
  },
  watch:{
    currentItem(){
      this.user = this.currentItem
      this.submitButton = false
    },
    files(){
      this.imgs_urls = []
      this.files.forEach(file =>{
          let image = {}
          if('id' in file){
              this.imgs_urls.push(file.url)
          }
          else{
            image['url'] = this.fileUrl(file)
            image['thumbnail'] = this.fileUrl(file)
            image['width'] = 50
            image['height'] = 50
            //this.user.images.push(image)
            this.imgs_urls.push(image.url)
          }
      })
    },
  },
  methods:{
    fileUrl(file){
      let url = URL.createObjectURL(file);
      return url
    },    
    submitForm(){
      this.$validator.validateAll().then(result => {
      if (result) {
        this.$http.post('', this.user)
        .then(response => {
          console.log(response);
          this.$emit('refreshList')
          this.formReset()
          this.appendImages(response.body.id)
          this.$notify({
            group: 'foo',
            title: 'Important message',
            type: 'success',
            text: 'Hello user! This is a notification!'
          });

        }, error => {
           console.log(error);
        })
        }
    })
    },
    updateForm(){
      this.$validator.validateAll().then(result => {
      if (result) {
        this.$http.patch(`${this.user.id}`, this.user)
        .then(response => {
          console.log(response);
          this.$emit('refreshList')
          this.formReset()
          this.appendImages(response.body.id)
          this.$notify({
            group: 'foo',
            title: 'Important message',
            type: 'success',
            text: 'The user details has updated'
          });
        }, error => {
           console.log(error);
        })
        }
    })
    },    
    formReset(){
      this.user.fullname=''
      this.user.email=''
      this.user.mobileno=''
      this.user.chooseoption=''  
      this.user.comments=''
      this.user.aggreeterms= ''
      this.user.images =[]
      this.imgs_urls = []
      this.$nextTick(() => this.$validator.reset())
    },
    // appendData(){
    //   this.user['fullname'] = this.user.fullname
    //   this.user['email'] = this.user.email
    //   this.user['mobileno'] = this.user.mobileno
    //   this.user['chooseoption'] = this.user.chooseoption
    //   this.user['comments'] = this.user.comments
    //   this.user['aggreeterms'] = this.user.aggreeterms
    // },
    IconChange() {
      let input = this.$refs.form
      let files = input.files
      for(let i= 0; i < files.length; i++){
        if(files[i].size > 1e+7){
          this.image_alert = "Image size should be 10 MB or lesser"
          return;
        }
        else{
          this.image_alert = ""
          this.files.push(files[i])
        }
      }
      input.type = 'text'
      input.type = 'file'
    },    
    appendImages(userid){
      let formData = new FormData()
      let images = this.files.filter(file => file.id == undefined)
      images.forEach(file => {
        //console.log(file)
        formData.append("user[images][]", file)
      })
      if(images.length > 0){
        this.$http.patch(`${userid}`, formData)
        .then(res =>{
          setTimeout(() =>{
            this.$emit('refreshList')
          },600)
        })
      }
      else{
        this.$emit('refreshList')
      }
    },    
    removeAttachment(){
      alert()
    }
},

}
</script>


<style>
.field-text.is-danger{color:red;} 
.form-group ul{ clear: both;width: 100%; margin:20px 0 0;padding:0;float: left;}
.form-group ul li{list-style: none;float: left; border: 1px solid #ddd;margin: 5px;position: relative; }
.dataimg span{position: absolute;background: red;width: 20px;height: 20px;text-align: center;right: 0;font-size: 17px;line-height: 20px}

</style>
