<template>
	<div class="downLoad">
		<div class="down">
			<h1>下载窝家里app</h1>
			<h2>免费个性化方案定制 精选好物购买</h2>
			<div class="btnGroup">
				<div class="item" @mouseover="showFlag=0" @mouseleave="showFlag=-1">
					<img src="/static/img/iphone.png" alt="iphone"/>
					IPHONE版
					<img src="/static/img/downloadImg.png"  class="downLoadImg" alt="二维码" v-show="showFlag==0"/>
				</div>
				<div class="item" @mouseover="showFlag=1" @mouseleave="showFlag=-1">
					<img src="/static/img/android.png" alt="iphone"/>
					Android版
					<img src="/static/img/downloadImg.png"  class="downLoadImg" alt="二维码" v-show="showFlag==1"/>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'downLoad',
  		data(){
  			return{
  				showFlag:-1
  			}
  		}
	}
</script>

<style scoped="scoped">
	.down{
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		overflow: hidden;
		z-index: 90;
		background: url(/static/img/downLoadBg.png) no-repeat center center;
		background-size:auto 100% !important;
	}
	h1{
		width: 100%;
		height: 1rem;
		line-height: 1rem;
		text-align: center;
		margin-top: 1.2rem;
		font-size:0.6rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		text-shadow:0px 5px 21px rgba(45,41,39,0.74);
	}
	h2{
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		text-align: center;
		font-size:0.36rem;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(255,255,255,1);
		text-shadow:0px 5px 21px rgba(45,41,39,0.74);
	}
	.btnGroup{
		margin-top: 0.3rem;
		text-align: center;
		
	}
	.btnGroup .item{
		display: inline-block;
		margin: 0rem 0.6rem;
		position: relative;
		width:2.4rem;
		height:0.8rem;
		background:rgba(116,134,117,1);
		box-shadow:0px 5px 21px 0px rgba(45,41,39,0.74);
		border-radius:0.4rem;
		font-size:0.18rem;
		line-height: 0.8rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		cursor: pointer;
		color:rgba(255,255,255,1);
		text-align: left;
		padding-left: 0.88rem;
		box-sizing: border-box;
	}
	.btnGroup .item:last-child{
		background: #2D2927;
	}
	.btnGroup img{
		position: absolute;
		width: 0.4rem;
		height: auto;
		top: 0.15rem;
		left: 0.32rem;
	}
	.btnGroup .item:first-child img{
		top: 0.13rem;
	}
	.btnGroup .item .downLoadImg{
		width: 2.4rem;
		height: 2.4rem;
		left: -2.4rem;
		top: -1rem !important;
		z-index:90;
	}
	.btnGroup .item:last-child .downLoadImg{
		width: 2.4rem;
		height: 2.4rem;
		left: 2.4rem;
		z-index:90;
	}
</style>