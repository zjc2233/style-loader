<template>
	<div class="demo16">
		<h3>我是App组件</h3>
		<Child/>
	</div>
</template>

<script>
	import Child from './components16/Child'
	export default {
		name:'teleport 挂载到某个元素',
		components:{Child},
	}
</script>

<style>
	.app{
		background-color: gray;
		padding: 10px;
	}
</style>