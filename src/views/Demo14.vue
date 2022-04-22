<template>
	<div class="demo13">
		<h3>我是App组件（祖），{{name}}--{{price}}</h3>
		<button @click="changezu">修改祖名</button>
		<Child/>
	</div>
</template>

<script>
	import { reactive,toRefs,provide } from 'vue'
	import Child from './components/Child.vue'
	export default {
		name:'provide 和 inject',
		components:{Child},
		setup(){
			let car = reactive({name:'奔驰',price:'40W'})
			provide('car',car) //给自己的后代组件传递数据
			function changezu(){
				car.name = '宝马'
			}
			return {...toRefs(car), changezu}
		}
	}
</script>

<style>
	.demo13{
		background-color: gray;
		padding: 10px;
	}
</style>