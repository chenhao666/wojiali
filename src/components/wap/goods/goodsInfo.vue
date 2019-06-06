<template>
	<div class="wapGoodsInfo">
		<div class="banner_swipper swiper-container" v-if="goodsInfo.goodsImageList">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,key) in goodsInfo.goodsImageList" :key="key" :style="'background:url('+item+') no-repeat center bottom;'">
				</div>
			</div>
			<div class="swiper-pagination"></div>
		</div>
		
		<div class="goodsInfo">
			<div class="name">{{ goodsInfo.goodsName }}</div>
			<div class="price" v-if="goodsInfo.priceFloor"><span style="font-size: 0.28rem;">￥</span>{{ goodsInfo.priceFloor }}</div>
		</div>
		
		<div class="goPay" @click="goPay">
			去购买
			<img src="/static/img/rightArrow.png"/>
		</div>
		
		<div class="goodsBg">
			<!--{{ goodsInfo.goodsName }}-->
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
	export default {
  		name: 'wapGoodsInfo',
  		data(){
  			return{
  				goodsId:'',
				goodsInfo:{},
				goodsAttr:{},
				introduceImgList:[]
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
  		},
		methods:{
			goPay(){
				this.$com.openAPP();
			}
		},
		updated(){
			new Swiper('.banner_swipper',{
				loop: true, // 循环模式选项
	            observer: true,//修改swiper自己或子元素时，自动初始化swiper
	            observeParents: true,//修改swiper的父元素时，自动初始化swiper
	            pagination: '.swiper-pagination',
				paginationType : 'fraction',
				paginationFractionRender: function (swiper, currentClassName, totalClassName) {
					//console.log(currentClassName,totalClassName)
				    return '<span class="' + currentClassName + '" style="font-size:0.36rem"></span>' +
				           ' / ' +
				           '<span class="' + totalClassName + '"></span>';
				}
			})	
		}
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
	.swiper-container{
		position: relative;
		width:100%;
		height:5.4rem;
		overflow: hidden;
	}
	.swiper-container,.swiper-wrapper,.swiper-slide{
		width:100%;
		height:5.4rem;
	}
	.swiper-slide{
		background-size:auto 100% !important;
	}
	.swiper-pagination{
		text-align: right;
		padding-right: 0.4rem;
		box-sizing: border-box;
		font-size: 0.24rem;
		font-family:MicrosoftYaHei-Bold;
		color: #000;
	}
	.goodsInfo{
		width: 100%;
		padding: 0.4rem;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
	}
	.goodsInfo .name{
		font-size:0.36rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(25,25,25,1);
	}
	.goodsInfo .price{
		font-size:0.34rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(25,25,25,1);
	}
	.goPay{
		margin-top: 0.5rem;
		margin-left: 0.4rem;
		width:2.12rem;
		height:0.7rem;
		border:3px solid rgba(68,68,68,1);
		font-size:0.18rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
		padding-left: 0.25rem;
		box-sizing: border-box;
		line-height: 0.6rem;
		letter-spacing: 3px;
		cursor: pointer;
		position: relative;
	}
	.goPay img{
		width: 0.55rem;
		height: 0.06rem;
		position: absolute;
		top: 0.3rem;
		right: 0.3rem;
	}
	.goodsBg{
		width: 100%;
		height: 2.4rem;
		margin-top: 0.64rem;
		background: url(/static/img/wap/goodsBg.png) no-repeat center center;
		background-size:auto 100% !important;
		font-size:0.36rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(255,254,254,1);
		text-shadow:0px 0px 10px rgba(56,56,56,0.91);
		text-align: center;
		line-height: 2.4rem;
		letter-spacing: 3px;
	}
	.goodsAttr{
		margin-top: 0.3rem;
		width: 100%;
		padding:0rem 0.4rem;
		box-sizing: border-box;
	}
	.goodsAttr h1{
		width: 100%;
		height: 0.8rem;
		line-height: 0.8rem;
		font-size:0.26rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
		border-bottom: 1px solid #D2D2D2;
	}
	.goodsAttr li{
		padding: 0.2rem 0rem;
		font-size:0.24rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:#444444;
	}
	.goodsAttr li span{
		font-weight: bold;
	}
	.introduceImg{
		width: 100%;
		height: auto;
		padding: 0.4rem 0rem;
		text-align: center;
	}
	.introduceImg img{
		max-width: 80%;
		display: block;
		margin: 0 auto;
	}
</style>