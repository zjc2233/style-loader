<template>
  <div class="home">
    <Demo1></Demo1>
    <Demo2></Demo2>
    <Demo3></Demo3>
    <Demo4></Demo4>
    <Demo5></Demo5>
    <Demo6></Demo6>
    <Demo7></Demo7>
    <Demo8></Demo8>
    <Demo9></Demo9>
    <Demo10></Demo10>
    <Demo11></Demo11>
    <Demo12></Demo12>
    <Demo13></Demo13>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import Demo1 from './Demo1.vue'
import Demo2 from './Demo2.vue'
import Demo3 from './Demo3.vue'
import Demo4 from './Demo4.vue'
import Demo5 from './Demo5.vue'
import Demo6 from './Demo6.vue'
import Demo7 from './Demo7.vue'
import Demo8 from './Demo8.vue'
import Demo9 from './Demo9.vue'
import Demo10 from './Demo10.vue'
import Demo11 from './Demo11.vue'
import Demo12 from './Demo12.vue'
import Demo13 from './Demo13.vue'

@Options({
  components: {
    HelloWorld,
    Demo1,
    Demo2,
    Demo3,
    Demo4,
    Demo5,
    Demo6,
    Demo7,
    Demo8,
    Demo9,
    Demo10,
    Demo11,
    Demo12,
    Demo13,
  },
})
export default class Home extends Vue {}
</script>
