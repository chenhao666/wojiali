<template>
	<div class="goodsInfo">
		<!--top-->
		<v-top :screenHeight='screenHeight' :introduce='introduce' :showScroll='false'></v-top>
		
		<div class="goodsIntroduce">
			<div class="swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,index) in goodsInfo.goodsImageList" :key="index" :style="'background:#ffffff url('+item+') no-repeat center bottom;'">
					
					</div>
				</div>
			</div>
			<div class="goodsText">
				<h1>{{ goodsInfo.goodsName }}</h1>
				<div class="price" v-if="goodsInfo.priceFloor">￥{{ goodsInfo.priceFloor }}</div>
				<div class="goPay" @click="goPay">
					去购买
					<img src="/static/img/rightArrow.png"/>
				</div>
			</div>
			<div class="clear"></div>
		</div>
		
		<div class="goodsAttr">
			<h1>商品参数</h1>
			<ul>
				<li><span>商品名称：</span>{{ goodsInfo.goodsName }}</li>
				<li><span>商品颜色：</span>{{ goodsAttr.goodsColorList ? goodsAttr.goodsColorList.join(' ') : '' }}</li>
				<li><span>规格：</span>{{ goodsAttr.specificationList ? goodsAttr.specificationList.join(' ') : '' }}</li>
				<li><span>商品材质：</span>{{ goodsAttr.materialList ? goodsAttr.materialList.join(' ') : '' }}</li>
				<li><span>商品编号：</span>{{ goodsInfo.goodsCode }}</li>
				<li><span>品牌：</span>{{ goodsInfo.brandName }}</li>
				<div class="clear"></div>
			</ul>
		</div>
		<div class="introduceImg" v-if="introduceImgList.length>0">
			<img :src="item" alt="商品介绍" v-for="(item,index) in introduceImgList"/>
		</div>
	</div>
</template>

<script>
//引入swipper插件
//import Swiper from 'swiper';
//引入底部子组件
import Top from '../layout/top'

export default {
	name: 'goodsInfo',
	props:['screenHeight'],
	data(){
		return{
			goodsId:'',
			goodsInfo:{},
			goodsAttr:{},
			introduceImgList:[],
			introduce:{
				bgImg:'http://images.wojiali.cn/Fma7qRww1Y73JDl5vrPgBeS47OJo',
				p1:'WONDERFUL THINGS',
				p2:'好物',
				p3:'打破新与旧、感性与理性、家与办公室的界限'
			},
			screenWidth:document.body.clientWidth,//屏幕宽度
		}
	},
	mounted(){
		if(this.$route.params.code){
			this.goodsId=Base64.decode(this.$route.params.code);
			getGoodsInfo(this)
			getOtherGoods(this)
			//console.log(this.goodsId)
		}else{
			window.history.go(-1);
		}
		if(!this.goodsId){
			window.history.go(-1);
		}
		new Swiper('.swiper-container',{
			loop: true, // 循环模式选项
            pagination: '.swiper-pagination',
            observer: true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents: true//修改swiper的父元素时，自动初始化swiper
		})
	},
	methods:{
		goPay(){
			this.$router.push({path:'/download'})
		}
	},
	components:{'v-top':Top}
}
//获取好物基本信息
function getGoodsInfo(obj){
	obj.$ajax(obj.$store.state.localIP+'/mall/getGoods','get',{shelvesGoodsUuid:obj.goodsId},function(res){
		//console.log(res)
		obj.goodsInfo=res.data||{};
		
		getGoodsIntroduce(obj,res.data.goodsId);
	})
}
//获取好物属性
function getOtherGoods(obj){
	obj.$ajax(obj.$store.state.localIP+'/mall/getGoodsAttribute','get',{shelvesGoodsUuid:obj.goodsId},function(res){
		//console.log(res)
		obj.goodsAttr=res.data||{};
	})
}
//获取好物介绍
function getGoodsIntroduce(obj,goodsId){
	obj.$ajax(obj.$store.state.localIP+'/mall/getGoodsDescription','get',{goodsId:goodsId},function(res){
		if(res.data){
			obj.introduceImgList=res.data || [];
			
		}
	})
}

</script>

<style scoped="scoped">
.goodsIntroduce{
	width: 100%;
	padding: 0.76rem;
	box-sizing: border-box;
}
.swiper-container{
	position: relative;
	width: 7.6rem;
	height: 6.07rem;
	overflow: hidden;
	float: left;
}
.swiper-container,.swiper-wrapper,.swiper-slide{
	width: 7.6rem;
	height: 6.07rem;
}
.swiper-slide{
	background-size:contain !important;
}
.goodsText{
	width: 3.79rem;
	height: 6.07rem;
	float: left;
	background:rgba(245,247,248,1);
	padding:0.58rem;
	box-sizing: border-box;
	position:relative;
}
.goodsText h1{
	font-size:0.23rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	padding: 0.2rem 0rem;
}
.goodsText .price{
	font-size:0.17rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	margin-top: 0.1rem;
}
.goPay{
	position: absolute;
	bottom: 0.76rem;
	left: 0.58rem;
	width:2.01rem;
	height:0.66rem;
	border:3px solid rgba(68,68,68,1);
	font-size:0.17rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	padding-left: 0.4rem;
	box-sizing: border-box;
	line-height: 0.66rem;
	letter-spacing: 3px;
	cursor: pointer;
}
.goPay img{
	width: 0.55rem;
	height: 0.06rem;
	position: absolute;
	top: 0.3rem;
	right: 0.3rem;
}
.goodsAttr{
	width: 90%;
	margin-left: 5%;
	height: auto;
	padding: 0.3rem;
	box-sizing: border-box;
}
.goodsAttr h1{
	height: 0.6rem;
	line-height: 0.6rem;
	width: 100%;
	font-size:0.23rem;
	font-family:MicrosoftYaHeiLight;
	font-weight:300;
	color:rgba(68,68,68,1);
}
.goodsAttr ul li{
	width: 25%;
	float: left;
	font-size:0.15rem;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(68,68,68,1);
	margin-top: 0.4rem;
}
.introduceImg{
	width: 100%;
	height: auto;
	padding: 0.6rem 0rem;
	text-align: center;
}
.introduceImg img{
	max-width: 80%;
	display: block;
	margin: 0 auto;
}
</style>