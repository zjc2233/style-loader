let stylePxtorem = require('./style-pxtorem')

stylePxtorem(`<template>
<div id="nav">
  <router-link to="/" class="home">Home</router-link> |
  <router-link to="/about" style="font-size: 1px; color: #666;">About</router-link>
  <router-link to="/about" style='font-size: 2px'>aaaaa</router-link>
</div>
<router-view/>
</template>`)