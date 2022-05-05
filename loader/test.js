let stylePxtorem = require('./style-pxtorem')

stylePxtorem(`<template>
<div id="nav">
  <router-link to="/" class="home">Home</router-link> |
  <router-link to="/about" style="font-size: 10px; color: #666;">About</router-link>
  <router-link to="/about" :style="{'font-size': num + 'px'}">aaaaa</router-link>
</div>
<div class="router--view">
  <router-view/>
</div>
</template>`)