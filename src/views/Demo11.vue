<template>
	<h4>当前求和为：{{sum}}</h4>
	<button @click="sum++">点我++</button>
	<hr>
	<h2>姓名：{{name}}</h2>
	<h2>年龄：{{age}}</h2>
	<h2>薪资：{{job.j1.salary}}K</h2>
	<button @click="name+='~'">修改姓名</button>
	<button @click="age++">增长年龄</button>
	<button @click="job.j1.salary++">涨薪</button>
</template>

<script>
// 使用 readonly 函数包装过的对象，内部是深层次只读的
// 使用 shallowReadonly 函数包装过的对象，只有最外层属性是只读的，内层仍然可以改写
	import {ref,reactive,toRefs,readonly,shallowReadonly} from 'vue'
	export default {
		name: 'readonly 和 shallowReadonly',
		setup(){
			//数据
			let sum = ref(0)
			let person = reactive({
				name:'张三',
				age:18,
				job:{
					j1:{
						salary:20
					}
				}
			})

			person = readonly(person)
			// person = shallowReadonly(person)
			// sum = readonly(sum)
			// sum = shallowReadonly(sum)

			//返回一个对象（常用）
			return {
				sum,
				...toRefs(person)
			}
		}
	}
</script>

