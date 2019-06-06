import wapTop from '@/components/wap/layout/top'

const components={
	install(Vue){
		Vue.component('v-wapTop',wapTop);
	}
}
//判断
if(typeof window !=='undefined' && window.Vue){
	install(window.Vue);
}

export default components;