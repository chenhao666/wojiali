<template>
	<div class="storeList">
		<!--top-->
		<v-top :screenHeight='screenHeight' :introduce='introduce' :showScroll='false'></v-top>
		
		<div class="list">
			<div class="item">
				<img src="/static/img/store1.png"/>
				<div class="introduce">
					<h1>窝家里杭州英特学府社区店</h1>
					<div class="content">英特学府店，是窝家里继博鳌金湾之后第二家线下社区店，店面位于英特学府社区内。店面整体设计小巧精致，除家具外还有精致的配饰与之相呼应。</div>
					<div class="connect">
						<p>店址：浙江省杭州市余杭区天目山路与城东路交叉口英特学府芯寓6-6号</p>
						<p>电话：400-966-7757</p>
						<p>营业时间：10:00-20:00</p>
					</div>
				</div>
			</div>
			
			<div class="item">
				<img src="/static/img/store2.png"/>
				<div class="introduce">
					<h1>窝家里海南博鳌金湾社区店</h1>
					<div class="content">博鳌金湾店，窝家里第一家线下社区店，店面位于博鳌金湾社区商业街内。店面整体设计明亮通透，家具种类繁多。</div>
					<div class="connect">
						<p>店址：海南省琼海市博鳌滨海大道8号博鳌金湾商业街</p>
						<p>电话：400-966-7757</p>
						<p>营业时间：9:00-18:00</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
//引入底部子组件
import Top from '../layout/top'
export default {
	name: 'aboutUs',
	props:['screenHeight'],
	data(){
		return{
			introduce:{
				bgImg:'http://images.wojiali.cn/Fma7qRww1Y73JDl5vrPgBeS47OJo',
				p1:'PHYSICAL STORE',
				p2:'实体店',
				p3:'沉浸式购物体验 遇见你梦想的家'
			},
			
		}
	},
	mounted(){
		this.showRight();
	},
	inject:['reload','hideRight','showRight'],
	methods:{
		
	},
	components:{'v-top':Top}
}

</script>

<style scoped="scoped">
	.storeList{
		width: 100%;
		background:rgba(245,247,248,1);
	}
	.list{
		width: 100%;
		height: auto;
		padding: 0.8rem;
		padding-bottom: 6rem;
		box-sizing: border-box;
	}
	.item{
		width: 100%;
		height: auto;
		position: relative;
	}
	.item img{
		width: 100%;
		height: auto;
	}
	.introduce{
		position: absolute;
		bottom: -4rem;
		width: 80%;
		height: 5.6rem;
		background: #ffffff;
		left: 10%;
		box-shadow:0px 4px 40px 0px rgba(79,93,80,0.1);
		padding: 0.8rem;
		box-sizing: border-box;
	}
	.item:last-child{
		margin-top: 6rem;
	}
	.introduce h1{
		font-size:0.3rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.content{
		margin-top: 0.5rem;
		font-size:0.16rem;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(68,68,68,1);
		line-height:36px;
	}
	.connect{
		margin-top: 0.5rem;
	}
	.connect p{
		margin-top: 0.2rem;
		font-size:0.18rem;
		height: 0.36rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(68,68,68,1);
		line-height:0.36rem;
	}
</style>