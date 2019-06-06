<template>
  <div id="app">
  	<!--wap头部-->
	  <v-wapHeader v-if="deviceFlag && isRouterAlive"></v-wapHeader>
	  <!--路由-->
    <router-view :screenHeight='screenHeight' v-if="isRouterAlive"/>
    	 
   	<!--右侧-->
   	<v-right v-show="rightShowFlag" :screenHeight='screenHeight'></v-right>
	  <!--底部-->
	  <v-bottom v-if="!deviceFlag"></v-bottom>
	  <!--wap底部-->
	  <v-wapBottom v-if="deviceFlag"></v-wapBottom>
  </div>
</template>

<script>	
//引入底部子组件
import Bottom from './components/layout/bottom'
import wapBottom from './components/wap/layout/bottom'
//引入wap端公共头部
import wapHeader from './components/wap/layout/header'
//引入右侧浮动子组件
import Flex from './components/layout/customerService'

export default {
  name: 'App',
  data(){
		return{
	      screenWidth:document.body.clientWidth,//获取屏幕宽度
	      isRouterAlive:true,//刷新当前页面
	      rightShowFlag:false,//右侧浮动
	      deviceFlag:document.body.clientWidth <1024 ?true : false,//false PC  true:移动
	      screenHeight:document.body.clientHeight//获取屏幕高度
		}
	},
	created(){
		//判断pc移动
		let width=document.documentElement.clientWidth;
		//console.log(this.$route.fullPath)
		let router=this.$route.fullPath;
		if(width>=1024){
			if(router.indexOf('wap')>-1){
				this.$router.push({path:router.replace('/wap','/')});
			}
		}else{
			if(router.indexOf('wap')==-1){
				this.$router.push({path:'/wap'+router});
			}
		}
		getLocation(this)		
	},
	provide(){
    return{
        reload:this.reload,
        hideRight:this.hideRight,
        showRight:this.showRight
    }
  },
	mounted(){
		const that = this;
		setHtmlFontSize (this);
	  //监听窗口变化自适应
		window.onresize = () => {
		  that.screenWidth = document.body.clientWidth;
		  that.screenHeight=document.body.clientHeight;
		  setHtmlFontSize (this);
		}
	},
	methods:{
		reload(){
      this.isRouterAlive = false;
      this.$nextTick(function () {
          this.isRouterAlive = true;
      })
   	},
   	hideRight(){
      this.rightShowFlag=false;
   	},
   	showRight(){
   		this.rightShowFlag=true;
   	}
	},
	watch: {
  	'$route' (to, from) {
  		$('html,body').animate({scrollTop: 0},0)
    	this.$router.go(0);
  	}
	},
  components:{ 'v-bottom':Bottom,'v-right':Flex,'v-wapBottom':wapBottom,'v-wapHeader':wapHeader}
}
	//重置根节点字体大小
function setHtmlFontSize (obj) {
  // 1366(750)是设计稿的宽度，当大于1366时采用1366宽度，比例也是除以13.66
  	let width=document.documentElement.clientWidth;
  	let router=obj.$route.fullPath;
  	if(width>=1024){
  		var deviceWidth = width>1920 ? 1920 : width < 1024 ? 1024 : width
   	 	document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 13.66 + 'px !important'
  		if(obj.deviceFlag){  			
  			obj.deviceFlag=false;
  			if(router.indexOf('wap')>-1){
					obj.$router.push({path:router.replace('/wap','')});
				}
  		}
  	}else{
  		var deviceWidth =width < 320 ? 320 : width
   	 	document.getElementsByTagName('html')[0].style.cssText = 'font-size:' + deviceWidth / 7.5 + 'px !important'
  		if(!obj.deviceFlag){
  			obj.deviceFlag=true;
  			if(router.indexOf('wap')==-1){
					obj.$router.push({path:'/wap'+router});
				}
  		}
  	}
}
//获取城市信息
function getLocation(obj){ 
	new Promise((resolve, reject) => {
		obj.$ajax('https://restapi.amap.com/v3/ip','get',{key:obj.$store.state.mapKey},function(res){
			//console.log(res)
			if(res.city){
				console.log(res);
				resolve(res.city);	
			}else{
				obj.$message.error("获取定位信息错误!");
			}
		})
	})	
	.then(function(data){
		//获取当前城市列表
		obj.$ajax(obj.$store.state.localIP+'queryCityList','post',{},function(res){
			data=data.replace('市','');
			if(!sessionStorage.getItem('city')){			
				let list=res.cityList;
				let flag=false;
				for(let i=0;i<list.length;i++){
					if(list[i].cityName==data){
						flag=true;
						break;
					}
				}
				if(flag){			
					sessionStorage.setItem('city',data);
				}else{
					sessionStorage.setItem('city','杭州');
				}
				obj.$store.commit('changeCity');
			}
		})
	})
}
</script>

<style>
	#app{
		width: 100%;
		min-height: 100%;
	}
</style>
