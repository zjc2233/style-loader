<template>
  <div id="nav">
    <router-link to="/home" class="home">Home</router-link> 
    <router-link to="/about" style="font-size: 16px; color: #666;">About</router-link>
    <!-- <router-link to="/about" :style="{'font-size': num + 'px'}">aaaaa</router-link> -->
  </div>
  <div class="router--view">
    <router-view/>
  </div>
</template>
<script>
  import {ref} from 'vue'
	export default {
		setup(props,context){
      let num = ref(16)
      return {
        num
      }
    }
  }
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  font-size: 16px;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
  .home {
    font-size: 40px;
  }
}
.router--view{
  font-size: 16px;
}
</style>
