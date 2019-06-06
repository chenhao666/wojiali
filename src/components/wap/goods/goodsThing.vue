<template>
	<div class="wapGoodsThing">
		<v-wapTop :topData='topData'></v-wapTop>
		
		<!--好物列表-->
		<div class="goodsList">
			<ul>
				<li style="width: 100%;height: auto;">
					<img src="/static/img/goodThing.png" alt="好物" style="width: 100%;height: auto;"/>
				</li>
				<li v-for="(item,index) in goodsList" :key="index" class="item" @click="goInfo(item.uuid)">
					<img :src="item.goodsImg" alt="好物"/>
					<div class="goodsName">{{ item.goodsName }}</div>
				</li>
				<div class="clear"></div>
			</ul>
			
			<div class="line" v-show="otherList.length"></div>
			
			<h3 v-show="otherList.length">往期精选</h3>
			
			<ul v-show="otherList.length" style="margin-top: 0.3rem;">
				<li v-for="(item,index) in otherList" :key="index"  class="item" @click="goInfo(item.uuid)">
					<img :src="item.goodsImg" alt="好物"/>
					<div class="goodsName">{{ item.goodsName }}</div>
				</li>
				<div class="clear"></div>
			</ul>
			
			<div class="more" @click="getGoodsMore" v-show="showMoreFlag && otherList.length">LOAD MORE</div>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'wapGoodsThing',
  		data(){
  			return{
				topData:{
					bgImg:'http://images.wojiali.cn/Fma7qRww1Y73JDl5vrPgBeS47OJo',
					p1:'WONDERFUL THINGS',
					p2:'好物',
					p3:'打破新与旧、感性与理性、家与办公室的界限'
				},
				goodsList:[],//好物列表
				otherList:[],//往期
				start:0,
				showMoreFlag:true,
				mouseIndex:-1,
				mouseOtherIndex:-1
  			}
  		},
		mounted(){
			//获取好物列表
			getGoodsList(this);
			getOtherGoods(this);
		},
		methods:{
			//更多好物信息
			getGoodsMore(){
				//获取楼盘列表
				getOtherGoods(this);
			},
			//跳转详情列表
			goInfo(uuid){
				let code=Base64.encode(uuid);
				this.$router.push({path:'/wap/goods/info/'+code})
			}
		}
	}
//获取好物列表
function getGoodsList(obj){
	obj.$ajax(obj.$store.state.localIP+'mall/listPromotionGoods','get',{},function(res){
		//console.log(res);
		var list=res.data;
		for(var i=0;i<list.length;i++){
			if(list[i].goodsImageList){
				list[i].goodsImg=list[i].goodsImageList[0] || '';
			}
		}
		obj.goodsList=list;
	})
}
//获取往期列表
function getOtherGoods(obj){
	var data={
		start:obj.start,
		length:6
	}
	obj.$ajax(obj.$store.state.localIP+'mall/listOtherGoods','post',data,function(res){
		if(res.data){
			if(res.data.length>0){
				var list=res.data;
				for(var i=0;i<list.length;i++){
					if(list[i].goodsImageList){
						list[i].goodsImg=list[i].goodsImageList[0] || '';
					}
				}
				obj.start+=(res.data.length==6 ? 6 : res.data.length);
				if(obj.start>=res.countNum){
					obj.showMoreFlag=false;
				}
				obj.otherList=obj.otherList.concat(list);
			}else{
				if(obj.start!=0){					
					obj.$message('暂无更多信息！');
				}
			}
		}else{
			obj.$message('暂无更多信息！');
		}
		
	})
}
</script>

<style scoped="scoped">
	.wapGoodsThing{
		width: 100%;
		height: auto;
		background:rgba(245,247,248,1);
	}
	.goodsList{
		width: 100%;
		padding: 0.5rem 0.4rem;
		box-sizing: border-box;
		height: auto;
	}
	.goodsList ul{
		width: 100%;
		display: flex;
		justify-content: space-between;
		flex-direction: row;
		flex-wrap: wrap;
	}
	.goodsList .item{
		width:3.2rem;
		height:3.7rem;
		background:rgba(255,255,255,1);
		padding: 0.2rem;
		box-sizing: border-box;
		margin-top: 0.3rem;
	}
	.goodsList .item img{
		width: 100%;
		height: 2.6rem;
	}
	.goodsList .item .goodsName{
		width: 100%;
		margin-top: 0.3rem;
		font-size:0.25rem;
		height: 0.3rem;
		line-height: 0.3rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.line{
		width:2px;
		height:0.3rem;
		margin: 0 auto;
		margin-top: 0.74rem;
		background:rgba(68,68,68,1);
	}
	.goodsList h3{
		width: 100%;
		height: 0.4rem;
		line-height: 0.4rem;
		text-align: center;
		margin-top: 0.45rem;
		font-size:0.3rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.more{
		margin: 0 auto;
		margin-top: 0.5rem;
		margin-bottom: 0.3rem;
		width:2rem;
		height:0.6rem;
		text-align: center;
		line-height: 0.6rem;
		background:rgba(161,171,162,1);
		opacity:0.65;
		border-radius:10px;
		font-size:0.26rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		cursor: pointer;
	}
</style>