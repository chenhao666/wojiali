<template>
	<div class="banner">
		<div class="banner_swipper swiper-container" :style="'height:'+screenHeight+'px'">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,key) in bannerList" :key="key" :style="'background:url('+item.bannerImg+') no-repeat center bottom;'">
				</div>
			</div>
			<!-- 如果需要导航按钮 -->
			<div class="prevBtn">
				<img src="/static/img/left.png" />
			</div>
			<div class="nextBtn">
				<img src="/static/img/right.png" />
			</div>
		</div>
		
		<!--竖线条-->
		<div class="line1"></div>
		<div class="line2"></div>
		<div class="line3"></div>
		<div class="line4"></div>
		<div class="line5"></div>
		<!--横线条-->
		<div class="line6"></div>
		<!--滚动-->
		<img src="/static/img/scroll.png" class="scroll" />
		<!--滚动点-->
		<div class="scrollCircle"></div>
		<div class="scrollText">Scroll</div>
		<!--左侧文本-->
		<div class="leftText">
			<p class="animated fadeInLeft" v-show="screenIndex==0" style="animation-delay:.2s;">STAY HOME.</p>
			<p class="animated fadeInLeft" v-show="screenIndex==0" style="animation-delay:.5s;">打造年轻人的</p>
			<p class="animated fadeInLeft" v-show="screenIndex==0" style="animation-delay:1s;">生活空间</p>
		</div>
		<!--readMore-->
		<!--<div class="readMore animated fadeInLeft" v-show="screenIndex==0" style="animation-delay:1.2s;">READ MORE</div>-->
		<!--动画线条-->
		<div class="animationLine"></div>
	</div>
</template>

<script>
//引入swipper插件
//import Swiper from 'swiper';

export default {
	name: 'banner',
	props:['screenHeight','screenIndex'],
	data(){
		return{
			bannerList:[{bannerImg:'http://images.wojiali.cn/Fma7qRww1Y73JDl5vrPgBeS47OJo'}],//banner图列表
		}
	},
	mounted(){
  		//获取banner图
  		getBannerList(this);
	}
}
//获取banner图列表
function getBannerList(obj){
	obj.$ajax(obj.$store.state.localIP + 'queryBanners','post',{},function(res){
		//obj.bannerList=res.banners;
		//swipper banner切换
  		new Swiper ('.banner_swipper', {
		    loop: true, // 循环模式选项
		    nextButton: '.nextBtn',
    		prevButton: '.prevBtn',
		    observer:true,//修改swiper自己或子元素时，自动初始化swiper
	　　　　	observeParents:true//修改swiper的父元素时，自动初始化swiper
		}) 
	})
}
</script>

<style scoped="scoped">
p{
	margin: 0px;
	padding: 0px;
}
.banner,.swiper-container{
	position: relative;
	width: 100%;
	overflow: hidden;
}
.banner .swiper-slide{
	background-size:100% auto !important;
}
.line1{
	position: absolute;
	z-index: 30;
	top: 0.76rem;
	left: 0.76rem;
	width:1px;
	height:100%;
	background:rgba(255,255,255,1);
	opacity:0.3;
}
.line2{
	position: absolute;
	z-index: 30;
	top: 0rem;
	left: 3.78rem;
	width:1px;
	height:100%;
	background:rgba(255,255,255,1);
	opacity:0.3;
}
.line3{
	position: absolute;
	z-index: 30;
	top: 0rem;
	right: 4.55rem;
	width:1px;
	height:100%;
	background:rgba(255,255,255,1);
	opacity:0.3;
}
.line4{
	position: absolute;
	z-index: 30;
	top: 0rem;
	right: 2.27rem;
	width:1px;
	height:100%;
	background:rgba(255,255,255,1);
	opacity:0.3;
}
.line5{
	position: absolute;
	z-index: 30;
	top: 0rem;
	right: 1.51rem;
	width:1px;
	height:100%;
	background:rgba(255,255,255,1);
	opacity:0.3;
}
.line6{
	position: absolute;
	z-index: 30;
	height:1px;
	background:rgba(255,255,255,1);
	opacity:0.3;
	top: 0.76rem;
	left: 0rem;
	width:100%;
}
.prevBtn{
	position: absolute;
	right: 0.76rem;
	bottom: 0.76rem;
	width: 0.76rem;
	height:0.76rem;
	background:rgba(0,0,0,0.6);
	z-index: 20;
	cursor: pointer;
}
.prevBtn img{
	position: absolute;
	top: 0.275rem;
	left: 0.325rem;
	width: 0.11rem;
	height: 0.21rem;
}
.nextBtn{
	position: absolute;
	right: 0rem;
	bottom: 0.76rem;
	width: 0.76rem;
	height:0.76rem;
	background:rgba(126,140,127,0.6);
	z-index: 20;
	cursor: pointer;
}
.nextBtn img{
	position: absolute;
	top: 0.275rem;
	left: 0.325rem;
	width: 0.11rem;
	height: 0.21rem;
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
.leftText{
	position: absolute;
	z-index: 30;
	left: 1.52rem;
	bottom: 2.2rem;
	font-size: 0.48rem;
	font-family:AvantGardeMdITCTTBold;
	font-weight:bold;
	color:rgba(255,255,255,1);
	letter-spacing: 10px;
}
.leftText p:first-child{
	font-size: 0.28rem;
	letter-spacing: 5px;
}
.readMore{
	position: absolute;
	left: 1.52rem;
	bottom: 1.3rem;
	width:2.28rem;
	height:0.66rem;
	z-index: 20;
	border:3px solid rgba(255,255,255,1);
	font-size:17px;
	font-family:AvantGardeMdITCTTBold;
	font-weight:bold;
	color:rgba(255,255,255,1);
	text-align: center;
	line-height: 0.66rem;
	letter-spacing: 3px;
	cursor: pointer;
}
.classicStyle_readMore{
	left: 0.76rem;
}
.animationLine{
	position: absolute;
	left: 50%;
	transform: translateX(-50%);
	width:1px;
	height:0.47rem;
	background:rgba(255,255,255,1);
	bottom: 0rem;
	z-index: 20;
	animation: animationLine 1.2s ease infinite alternate;
}
.fadeInLeft{
	animation-duration:2s;
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
@keyframes animationLine{
	from{
		height: 0.35rem;
	}
	to{
		height: 0.62rem;
	}
}
</style>