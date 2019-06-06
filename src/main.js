// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
//引入UI样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "babel-polyfill"
////引入swipper
//import 'swiper/dist/css/swiper.css'
//引入动画
import  '../static/css/animate.css'
//引入通用样式
import '../static/css/comm.css'
//引入axios
import Axios from 'axios'
//移入jq
import $ from 'jquery' ;
//引入状态管理器
import store from './store.js'
//引入封装通用组件库
import comUi from './components/wap/layout'
//使用组件
Vue.use(comUi)
//引入bootstrap
/*import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';*/


//引入通用js
import com from './commJs/com.js';
//绑定原型
Vue.prototype.$com=com;

Vue.use(ElementUI)
Vue.config.productionTip = false




Vue.config.productionTip = false
//修改原型链
Vue.prototype.$ajax = function(url,method,data,callback){
	if(data.hasOwnProperty('city')){
		if(!store.state.city){
			return;
		}
	}
	if(method.toUpperCase()=='POST'){
		Axios.post(url,data)
		.then(res => {
			if(res.data.retCode || res.data.retCode==0){
				if (res.data.retCode == 0) {
			     	callback(res.data);
			    } else {
			      	this.$message.error(res.data.retMsg);
			    }
			}else{
				callback(res.data);
			}
		})
		.catch(error => {
		    console.log(error);
		    //this.$message.error("网络连接错误！");
		})
	}
	if(method.toUpperCase()=='GET'){
		let newData='';
		let newUrl='';
		for(let x in data){
			newData+='&'+x+'='+data[x];
		}
		if(newData){			
			newData=newData.substring(1);
			newUrl=url+'?'+newData;
		}else{
			newUrl=url;
		}
		Axios.get(newUrl)
		.then(res => {
			if(res.data.retCode || res.data.retCode==0){
				if (res.data.retCode == 0) {
			     	callback(res.data);
			    } else {
			      	this.$message.error(res.data.retMsg);
			    }
			}else{
				callback(res.data);
			}
		})
		.catch(error => {
		    console.log(error);
		    //this.$message.error("网络连接错误！");
		})
	}
	
};

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  },
  template: '<App/>'
})
