<template>
	<div class="wapTop" :style="'background:url('+topData.bgImg+') no-repeat center bottom;'">
		<div class="topFont">
			<p>{{ topData.p1 }}</p>
			<p>{{ topData.p2 }}</p>
			<p>{{ topData.p3 }}</p>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'wapBottom',
  		props:['topData'],
  		data(){
  			return{
  				
  			}
  		},
  		methods:{
  			
  		}
	}
</script>

<style scoped="scoped">
	.wapTop{
		width: 100%;
		height: 5.4rem;
		border-radius:0px 0px 20px 20px;
		background-size:100% auto !important;
		position: relative;
	}
	.topFont{
		position: absolute;
		bottom: 0.9rem;
		left: 0.4rem;
		width: 5rem;
		z-index: 50;
	}
	.topFont p{
		width: 100%;
		height: auto;
		word-break: break-all;
		line-height: 150%;
		font-size:0.36rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(255,255,255,1);
		margin-top: 0.1rem;
	}
	.topFont p:first-child{
		font-size:0.24rem;
	}
	.topFont p:last-child{
		font-size:0.24rem;
	}
</style>