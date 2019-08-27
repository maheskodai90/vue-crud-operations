<template>
  <div class="hello">
      <section class="testimonial py-5" id="testimonial">
          <div class="container">
            <div class="row">
              <div class="col-sm-6"></div>
              <div class="col-sm-6">
                <div class="form-group">
                   <input type="text" class="form-control" placeholder="Search">
                </div>
              </div>
            </div>
            <table class="table">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Mobile</th>
                  <th scope="col">Choose Options</th>
                  <th scope="col">Comments</th>
                  <th scope="col">Terms</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for ="(u,index) in users">
                  <th scope="row">{{index+1}}</th>
                  <td>{{u.fullname}}</td>
                  <td>{{u.email}}</td>
                  <td>{{u.mobileno}}</td>
                  <td>{{u.chooseoption}}</td>
                  <td>{{u.comments}}</td>
                  <td><span v-if="u.aggreeterms == 't'">True</span></td>
                  <td>
                    <a href="javascript:void()" @click="editMethod(u)">Edit</a> | 
                    <a href="javascript:void()" @click="deleteMethod(u)">Delete</a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
      </section>

   
  </div>
</template>

<script>
import Swal from 'sweetalert2'

export default {
  props: ['ListRefresh'],
  components:{ Swal },
  data(){
    return{
      users:[]
    }
  },
  watch:{
    ListRefresh(){
      if(this.ListRefresh){
        this.getLists()
        setTimeout(function(){
          this.ListRefresh = false
        }, 3000)
    
      }
    }
  },
  created(){
    this.getLists()
  },
  methods:{
    getLists(){
      this.$http.get('')
      .then(response => {
         return response.json()
      }).then(data => {
        const resultArray = []; 
         for(let key in data){
           resultArray.push(data[key]);
         }
         this.users = resultArray;
      })
    },
    editMethod(data){
      this.$emit('currentData', data)
    },
    deleteMethod(data){
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$http.delete(`${data.id}`, data)
          this.ListRefresh = true
          Swal.fire(
            'Deleted!',
            'Your file has been deleted.',
            'success'
          )
        }
      })

      // this.$http.delete(`${data.id}`, data)
      // .then(response => {


      //    console.log(response)
      //   this.$notify({
      //     group: 'foo',
      //     type: 'success',
      //     title: 'Important message',
      //     text: 'One record has deleted'
      //   });
      // })
    }
  }

}
</script>


<style>
 .field-text.is-danger{color:red;} 
 table tr td,  table tr th{text-align:left;}
</style>