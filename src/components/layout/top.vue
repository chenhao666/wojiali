<template>
	<div class="top" :style="'height:'+screenHeight+'px;background:url('+introduce.bgImg+') no-repeat center bottom;'">
		<!--logo-->
		<img src="/static/img/logo.png" class="logo" alt="LOGO" />
		<div class="logoBg"></div>
		<!--滚动-->
	<!--	<img src="/static/img/scroll.png" class="scroll"  v-show="showScroll"/>
		<div class="scrollCircle" v-show="showScroll"></div>
		<div class="scrollText" v-show="showScroll">Scroll</div>
		<div class="animationLine" v-show="showScroll"></div>-->
		
		<!--搜索-->
		<div :class="showSearchFlag ? 'search active' : 'search'">
			<img src="/static/img/search.png" @click="showSearchFlag=!showSearchFlag"/>
			<input type="text" v-model="search" placeholder="请输入要搜索的楼盘/方案" class="searchInput" v-show="showSearchFlag" @keyup.enter="searchFun" v-to-focus="showSearchFlag"/>
			<div class="line"></div>
		</div>
		<!--导航-->
		<div class="nav" v-show="!showSearchFlag">
			<ul class="left">
				<router-link to="/"><li :class="$route.name=='/'?'active' : ''">首页</li></router-link>
				<router-link to="/stylePai"><li :class="$route.name.indexOf('stylePai')>-1?'active' : ''">风格派</li></router-link>
				<router-link to="/floor"><li :class="$route.name.indexOf('floor')>-1?'active' : ''">楼盘</li></router-link>
				<router-link to="/goodsThing"><li :class="$route.name.indexOf('goods')>-1?'active' : ''">好物</li></router-link>
				<router-link to="/aboutUs"><li :class="$route.name.indexOf('aboutUs')>-1?'active' : ''">关于我们</li></router-link>
				<div class="clear"></div>
			</ul>
			<ul class="right">
				<router-link to="/storeList"><li :class="$route.name.indexOf('storeList')>-1?'active' : ''">实体店</li></router-link>
				<router-link to="/case"><li :class="$route.name.indexOf('case')>-1?'active' : ''">案例</li></router-link>
				<li @click="changeFlag=!changeFlag" :style="changeFlag?'background:#ffffff;color:#000':'background:none;color:#ffffff'"><img :src="changeFlag?'/static/img/location.png':'/static/img/locationWhite.png'"/>{{ city }}</li>
				<div class="clear"></div>
			</ul>
			<div class="clear"></div>
		</div>
		
		<!--切换定位-->
		<div class="changeLocation" v-show="changeFlag">
			<ul>
				<li v-for="(item,index) in cityList" :key="index" :class="city==item.cityName ? 'active' : ''" @click="changeCityFun(item.cityName)">{{ item.cityName }}</li>
			</ul>
		</div>
		
		<!--文字描述-->
		<div class="introduce">
			<p>{{ introduce.p1 }}</p>
			<p>{{ introduce.p2 }}</p>
			<p>{{ introduce.p3 }}</p>
		</div>
		
		<!---线-->
		<div class="line1"></div>
		<div class="line2"></div>
		<div class="line3"></div>
		<div class="line4"></div>
		<div class="line5"></div>
		<!--浮动导航-->
		<div class="nav flexNav animated fadeInDown" v-show="!flag && showScroll">
			<!--搜索-->
			<div class="search flexSearch" @click="goSearch">
				<img src="/static/img/search.png" />
				<div class="line"></div>
			</div>
			<ul class="left">
				<router-link to="/"><li>首页</li></router-link>
				<router-link to="/stylePai"><li>风格派</li></router-link>
				<router-link to="/floor"><li>楼盘</li></router-link>
				<router-link to="/goodsThing"><li>好物</li></router-link>
				<router-link to="/aboutUs"><li>关于我们</li></router-link>
				<div class="clear"></div>
			</ul>
			<ul class="right">
				<router-link to="/"><li>实体店</li></router-link>
				<router-link to="/about/case"><li>案例</li></router-link>
				<li @click="flexChangeFlag=!flexChangeFlag"><img src="/static/img/locationWhite.png"/>{{ city }}</li>
				<div class="clear"></div>
			</ul>
			<div class="clear"></div>
			<div class="flexLogo">
				<img src="/static/img/logo.png"/>
			</div>
			<!--线-->
			<div class="navLine1"></div>
		</div>
		
		<div class="flexNavCity" v-show="!flag && showScroll && flexChangeFlag">
			<ul>
				<li v-for="(item,index) in cityList" :key="index" :class="city==item.cityName ? 'active' : ''" @click="changeCityFun(item.cityName)">{{ item.cityName }}</li>
			</ul>
		</div>
	</div>
</template>

<script>
//引入底部子组件
import Banner from '../layout/banner'	

export default {
	name: 'stylePai',
	props:['screenHeight','introduce','showScroll'],
	data(){
		return{
			flag:false,
			showSearchFlag:false,
			search:'',
			city:this.$store.state.city,
			scrollFlag:true,
			changeFlag:false,
			flexChangeFlag:false,
			cityList:[],//城市列表
		}
	},
	inject:['reload','hideRight','showRight'],
	created(){
		//getLocation获取定位信息
		getLocation(this);
	},
	mounted(){
		//console.log(this.$route)
		var that=this;
		if(this.showScroll){
			that.flag=true;
			$('html,body').animate({scrollTop: 0},1000,function(){
				that.scrollFlag=false;
			})
			$(document).scroll(function(){
				if(!that.flag){
					if($(document).scrollTop()<that.screenHeight){
						that.hideRight();
						that.flag=true;
						if(!that.scrollFlag){
							that.scrollFlag=true;
							$('html,body').animate({scrollTop: 0},1000,function(){
								that.scrollFlag=false;
							});
						}
					}else{
						that.showRight();
					}
				}
			})
		}
	},
	
	methods:{
		//搜索
		searchFun(){
			let code=Base64.encode(this.search);
			//console.log(code)
			this.$router.push({path:'/search/'+code});
		},
		//返回顶部搜索
		goSearch(){
			let that=this;
			that.flag=true;
			$('html,body').animate({scrollTop: 0},1000,function(){
				that.scrollFlag=false;
				that.showSearchFlag=true;  
			})
		},
		//修改城市
		changeCityFun(city){
			sessionStorage.setItem('city',city);
			this.$store.commit('changeCity');
		}
	},
	directives : {
        "to-focus" : function (el,binding) {
            if(binding.value){
                el.focus();
            }
        }
   },
	watch: {
      	flag(val) {
	        if(val && this.showScroll){
	        	var that=this;
	        	//监听滑轮滚动
				$(document).on('mousewheel DOMMouseScroll', function(e){
					e.preventDefault();
					if(!that.scrollFlag){
						that.scrollFlag=true;
						var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
					   	var delta = Math.max(-1, Math.min(1, wheel) );
					    if(delta<0){//向下滚动
					    	var height=that.screenHeight;
							$('html,body').animate({scrollTop: height},1000,function(){
								that.scrollFlag=false;
								that.flag=false;
							});
					    }
					}
				});
	        }else{
	        	$(document).unbind('mousewheel');
		        $(document).unbind('DOMMouseScroll');
	        }
      	},
      	//监听city变化
    	'$store.state.city': function () {
      		this.city=this.$store.state.city;
      		this.reload();
    	}
   },
	components:{ 'v-banner':Banner}
}
function getLocation(obj){ 
	//获取当前城市列表
	obj.$ajax(obj.$store.state.localIP+'queryCityList','post',{},function(res){
		obj.cityList=res.cityList || [];
	})
}
</script>

<style scoped="scoped">
ul,li{
	margin: 0px;
	padding: 0px;
}
.top{
	width: 100%;
	overflow: hidden;
	position: relative;
	background-size:100% auto !important;
}
.logo{
	position: absolute;
	top: 0.09rem;
	right: 0.08rem;
	width: 1.12rem;
	height: 0.56rem;
	z-index: 20;
}
.logoBg{
	position: absolute;
	z-index: 10;
	top: 0rem;
	right: 0rem;
	width:0.76rem;
	height:0.76rem;
	background:rgba(126,140,127,1);
	box-shadow:0px 7px 36px 0px rgba(84,96,95,0.45);
}
.scroll{
	position: absolute;
	z-index: 20;
	bottom: 1rem;
	left: 50%;
	width: 0.32rem;
	height: 0.46rem;
	transform: translateX(-50%);
	cursor: pointer;
}
.scrollCircle{
	position: absolute;
	bottom: 1.3rem;
	border-radius: 50%;
	width: 0.06rem;
	height: 0.06rem;
	background: #ffffff;
	left: 50%;
	transform: translateX(-50%);
	z-index: 20;
	animation: scrollBottom 1.2s ease infinite;
}
.scrollText{
	position: absolute;
	bottom: 0.76rem;
	left: 0rem;
	width: 100%;
	text-align: center;
	z-index: 20;
	font-size:0.13rem;
	font-family:AvantGardeMdITCTT;
	font-weight:400;
	color:rgba(255,255,255,1);
	letter-spacing: 2px;
}
.animationLine{
	position: absolute;
	left: 50%;
	width:1px;
	height:0.47rem;
	background:rgba(255,255,255,1);
	bottom: 0rem;
	z-index: 20;
	animation: lineAnimate 1.2s ease infinite alternate;
}
.fadeInLeft{
	animation-duration:2s;
}
.search{
	position: absolute;
	top: 0.76rem;
	left: 0rem;
	width:1.52rem;
	height:0.76rem;
	background:rgba(0,0,0,0.6);
	z-index: 30;
}
.flexSearch{
	top: 0rem;
	left: 0rem;
}
.search img{
	position: absolute;
	top: 0.28rem;
	left: 1.05rem;
	width: 0.19rem;
	height: 0.19rem;
	cursor: pointer;
}
.search .line{
	position: absolute;
	top: 0.32rem;
	left: 0.75rem;
	width:0.02rem;
	height:0.09rem;
	background:rgba(255,255,255,0.6);
}
.search.active{
	animation: searchAnimate 1s ease-in 1 forwards;
}
@keyframes searchAnimate{
	100%{
		width:7rem;
		height:0.76rem;
	}
}
.nav{
	width: 100%;
	height: 0.76rem;
	line-height: 0.76rem;
	position: absolute;
	top: 0.76rem;
	left: 0rem;
	z-index: 20;
	padding-left: 1.52rem;
	box-sizing: border-box;
	background:rgba(0,0,0,0.1);
}
.nav .left{
	float: left;
	margin-left: 0.39rem;
	height: 0.76rem;
}
.nav .left li{
	float: left;
	height: 0.76rem;
	padding: 0rem 0.39rem;
	font-size:0.15rem;
	font-family:MicrosoftYaHei-Bold;
	color:rgba(255,255,255,1);
	cursor: pointer;
}
.nav .left li:hover{
	font-weight:bold;
}
.nav .left li.active{
	font-weight:bold;
}
.nav .right li.active{
	font-weight:bold;
}
.nav .right{
	float: right;
}
.nav .right img{
	width: 0.14rem;
	height:auto;
	position: absolute;
	top: 0.28rem;
	left:0.13rem;
}

.nav .right li{
	position: relative;
	float: left;
	margin-right: 0.54rem;
	cursor: pointer;
	font-size:0.15rem;
	height: 0.76rem;
	font-family:MicrosoftYaHeiLight;
	font-weight:300;
	color:rgba(255,255,255,1);
}
.nav .right>li{
	width: 1.52rem;
	margin-right: 0rem;
	padding-left: 0.35rem;
	box-sizing: border-box;
}
.introduce{
	position: absolute;
	bottom: 1.2rem;
	left: 1.52rem;
	font-size:0.48rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(255,255,255,1);
	letter-spacing: 5px;
	z-index: 20;
}

.introduce p:first-child{
	font-size:0.34rem;
	font-family:AvantGardeMdITCTT;
	font-weight:400;
	color:rgba(255,255,255,1);
	letter-spacing: 3px;
}
.introduce p:last-child{
	max-width: 8rem;
	word-break: break-all;
	font-size:0.2rem;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(255,255,255,1);
	letter-spacing: 10px;
	margin-top: 0.3rem;
}
.line1{
	width:1px;
	height:100%;
	background:rgba(210,210,210,1);
	opacity:0.3;
	position: absolute;
	top: 0rem;
	left: 0.75rem;
}
.line2{
	width:1px;
	height:100%;
	background:rgba(210,210,210,1);
	opacity:0.3;
	position: absolute;
	top: 0rem;
	left: 3.79rem;
}
.line3{
	width:1px;
	height:100%;
	background:rgba(210,210,210,1);
	opacity:0.3;
	position: absolute;
	top: 0rem;
	right: 4.54rem;
}
.line4{
	width:1px;
	height:100%;
	background:rgba(210,210,210,1);
	opacity:0.3;
	position: absolute;
	top: 0rem;
	right: 1.51rem;
}
.line5{
	width:1px;
	height:100%;
	background:rgba(210,210,210,1);
	opacity:0.3;
	position: absolute;
	top: 0rem;
	right: 0.76rem;
}
.flexNav{
	position: fixed;
	top: 0rem;
	left: 0rem;
	width: 100%;
	height: 0.76rem;
	background:rgba(0,0,0,1);
	opacity:0.8;
	z-index: 90;
	overflow: hidden;
}
.flexLogo{
	position: absolute;
	top: 0rem;
	right: 0rem;
	height: 0.76rem;
	width: 0.76rem;
	overflow: hidden;
	background:rgba(0,0,0,1);
	opacity:0.87;
}
.flexLogo img{
	display: block;
	position: absolute;
	top:0rem;
	right:0rem;
	width: 1.12rem;
	height: 0.56rem;
	z-index: 20;
}
.navLine1{
	position: absolute;
	height: 100%;
	top: 0rem;
	left: 1.52rem;
	width: 1px;
	background:rgba(140,140,140,1);
	opacity:0.3;
}
.searchInput{
	position: absolute;
	height: 0.5rem;
	top: 0.13rem;
	left: 1.8rem;
	width: 4rem;
	border: none;
	background: none;
	line-height: 0.5rem;
	outline: none;
	color: #ffffff;
}
.changeLocation{
	position: absolute;
	top: 1.52rem;
	right: 0rem;
	width:1.52rem;
	max-height:5.3rem;
	background:rgba(255,255,255,0.9);
	z-index: 40;
	height: auto;
	padding: 0.3rem 0rem;
	box-sizing: border-box;
}
.changeLocation ul li{
	width:100%;
	height: 0.4rem;
	line-height: 0.4rem;
	padding-left: 0.35rem;
	box-sizing: border-box;
	margin-top: 0.2rem;
	font-size:0.15rem;
	font-family:MicrosoftYaHei;
	font-weight:bold;
	color:rgba(153,153,153,1);
	cursor: pointer;
}
.changeLocation ul li:hover{
	color:rgba(68,68,68,1);
}
.changeLocation ul li.active{
	color:rgba(68,68,68,1);
}
.changeLocation ul li:first-child{
	margin-top: 0rem;
}
.flexNavCity{
	position: fixed;
	top: 0.76rem;
	right: 0rem;
	width:1.52rem;
	max-height:5.3rem;
	background:rgba(0,0,0,0.9);
	z-index: 40;
	height: auto;
	padding: 0.3rem 0rem;
	box-sizing: border-box;
}
.flexNavCity ul li{
	width:100%;
	height: 0.4rem;
	line-height: 0.4rem;
	padding-left: 0.35rem;
	box-sizing: border-box;
	margin-top: 0.2rem;
	font-size:0.15rem;
	font-family:MicrosoftYaHei;
	font-weight:bold;
	color:rgba(153,153,153,1);
	cursor: pointer;
}
.flexNavCity ul li:hover{
	color:rgba(255,255,255,1);
}
.flexNavCity ul li.active{
	color:rgba(255,255,255,1);
}
.flexNavCity ul li:first-child{
	margin-top: 0rem;
}
@keyframes scrollBottom{
	from{
		bottom: 1.3rem;
		opacity: 0.9;
	}
	to{
		bottom:1.1rem;
		opacity: 0.4;
	}
}
@keyframes lineAnimate{
	from{
		height: 0.35rem;
	}
	to{
		height: 0.62rem;
	}
}
</style>