<template>
	<div class="bottom">
		<img src="/static/img/logo.png" class="logo"/>
		
		<div class="iconList">
			<div class="item" @click="goDown">
				<img src="/static/img/code.png"/>
				<div class="text">APP下载</div>
			</div>
			<div class="item" @mouseover="showImg=true" @mouseleave="showImg=false">
				<img src="/static/img/wx.png"/>
				<div class="text">微信</div>
				<img src="/static/img/gzhImg.jpg" class="gzh" alt="二维码" v-show="showImg"/>
			</div>
			<!--<div class="item">
				<img src="/static/img/sina.png"/>
				<div class="text">微博</div>
			</div>-->
			<div class="clear"></div>
		</div>
		
		<div class="contact">
			<p>客服热线：400-966-7757</p>
			<p>周一至周五：9:00-18:00</p>
		</div>
		<div class="bottom_tip">
			©2018 浙江优家云科技有限公司 ALL RIGHTS RESERVED. 浙ICP备07001687号
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'bottom',
  		data(){
  			return{
  				showImg:false
  			}
  		},
  		methods:{
  			goDown(){
  				this.$router.push({path:'/download'})
  			}
  		}
	}
</script>

<style scoped="scoped">
.bottom{
	width: 100%;
	height: 3.65rem;
	background:rgba(213,224,218,1);
	position: relative;
}
.logo{
	position: absolute;
	top: 0.6rem;
	left: 0.53rem;
}
.iconList{
	position: absolute;
	top: 0.6rem;
	left: 8.64rem;
}
.iconList .item{
	float: left;
	margin-right: 0.5rem;
	line-height: 0px;
	width: 1rem;
	text-align: center;
	cursor: pointer;
	position:relative;
}
.iconList .item img{
	width:auto;
	height: 0.34rem;
	display: block;
	margin: 0 auto;
}
.iconList .item .gzh{
	position: absolute;
	top: -1rem;
	left: 0rem;
	width: 1rem;
	height: 1rem;
}
.text{
	font-size:0.15rem;
	font-family:PingFang-SC-Bold;
	font-weight:bold;
	color:rgba(255,255,255,1);
	margin-top: 0.1rem;
	height: 0.2rem;
	line-height: 0.2rem;
}

.contact{
	position: absolute;
	left: 8.64rem;
	bottom: 1.16rem;
	border-left: 2px solid rgba(230,230,230,1);
	font-size:0.13rem;
	font-family:PingFang-SC-Medium;
	font-weight:500;
	color:rgba(255,255,255,1);
	line-height: 0px;
}
p{
	margin: 0px;
	padding: 0px;
}
.contact p{
	padding-left: 0.2rem;
	height: 0.2rem;
	line-height: 0.2rem;
}
.bottom_tip{
	position: absolute;
	bottom: 0px;
	left: 0px;
	width:100%;
	height:0.38rem;
	line-height: 0.38rem;
	background:rgba(32,32,32,0.36);
	font-size:0.11rem;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(254,255,255,0.54);
	text-align: center;
}
</style>