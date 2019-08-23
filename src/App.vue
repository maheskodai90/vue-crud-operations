<template>
  <div id="app">
    <div class="container">
      <img alt="Vue logo" src="./assets/logo.png">
      <RegisterForm :currentItem="currentItem" @refreshList="refreshList" />
      <ListDatas @currentData = "currentData" :ListRefresh="ListRefresh" />
    </div>
  </div>
</template>

<script>
import RegisterForm from './components/RegisterForm.vue'
import ListDatas from './components/ListDatas.vue'

export default {
  name: 'app',
  components: {
    RegisterForm,
    ListDatas
  },
  data(){
    return{
      currentItem : {},
      ListRefresh: false
    }
  },
  methods:{
    currentData(data){
      this.currentItem = data
    },
    refreshList(){
      this.ListRefresh = true
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
