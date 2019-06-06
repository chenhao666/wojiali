<template>
	<div class="wapBottom">
		<div class="bottomBox">
			<div class="group">
				<div class="item" @click="downloadApp">
					<div class="img">						
						<img src="/static/img/wap/er.png" alt="二维码"/>
					</div>
					<div class="font">下载APP</div>
				</div>
				<div class="item" @click="downloadApp">
					<div class="img">						
						<img src="/static/img/wap/wx.png" alt="微信"/>
					</div>
					<div class="font">微信</div>
				</div>
			</div>
			
			<div class="info">
				<p>客服热线：400-966-7757</p>
				<p>周一至周五：9：00 - 18：00</p>
			</div>
			
			<div class="bottom">
				©2018 浙江优家云科技有限公司  浙ICP备07001687号
			</div>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'wapBottom',
  		data(){
  			return{
  				
  			}
  		},
  		methods:{
  			downloadApp(){
  				this.$com.openAPP();
  			}
  		}
	}
</script>

<style scoped="scoped">
	.wapBottom{
		width: 100%;
		height: 3rem;
		background: #ffffffr;
		/*margin-top: 0.3rem;*/
	}
	.bottomBox{
		/*position: absolute;*/
		width: 100%;
		/*bottom: 0px;
		left: 0px;*/
		height: 3rem;
		background:rgba(213,224,218,1);
		position: relative;
	}
	.group{
		width: 60%;
		margin-left: 20%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		padding-top: 0.4rem;
	}
	.group .item{
		width: 1.5rem;
		height: auto;
		text-align: center;
	}
	.group .item .img{
		margin: 0 auto;
		width: 0.4rem;
		height: 0.4rem;
	}
	.group .item img{
		display: block;
		width: 100%;
		height: auto;
	}
	.font{
		margin-top: 0.1rem;
		font-size:0.24rem;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.info{
		margin-top: 0.4rem;
		font-size:0.2rem;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(255,255,255,1);
		text-align: center;
	}
	.info p{
		margin-top: 0.1rem;
	}
	.bottom{
		position: absolute;
		bottom: 0px;
		left: 0px;
		width:100%;
		height:0.4rem;
		line-height: 0.4rem;
		background:rgba(32,32,32,0.36);
		text-align: center;
		font-size:0.12rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(254,255,255,0.54);
	}
</style>