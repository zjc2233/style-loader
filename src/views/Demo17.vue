<template>
	<div class="Demo17">
		<h3>我是App组件</h3>
		<Suspense>
			<template v-slot:default>
				<Child/>
			</template>
			<template v-slot:fallback>
				<h3>稍等，加载中...</h3>
			</template>
		</Suspense>
	</div>
</template>

<script>
	// import Child from './components/Child'//静态引入
	import {defineAsyncComponent} from 'vue' 
	const Child = defineAsyncComponent(()=>import('./components17/Child')) //异步引入
	export default {
		name:'Suspense',
		components:{Child},
	}
</script>

<style>
	.Demo17{
		background-color: gray;
		padding: 10px;
	}
</style>