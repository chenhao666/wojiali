<template>
	<div class="goodThing">
		<!--top-->
		<v-top :screenHeight='screenHeight' :introduce='introduce' :showScroll='true'></v-top>
		
		<!--好物列表-->
		<div class="goodsList">
			<ul :style="'width:'+parseInt((screenWidth/100)/3.2)*3.2+'rem'">
				<li style="width: 5.86rem;">
					<img src="/static/img/goodThing.png" alt="好物"/>
				</li>
				<li v-for="(item,index) in goodsList" :key="index" @mouseover="mouseIndex=index" @mouseleave="mouseIndex=-1">
					<img :src="item.goodsImg" alt="好物"/>
					<div class="goodsName">{{ item.goodsName }}</div>
					<div class="goodsMask animated rotateInDownLeft" v-show="mouseIndex==index" @click="goInfo(item.uuid)">查看详情</div>
				</li>
				<div class="clear"></div>
			</ul>
			
			<div class="line" v-show="otherList.length"></div>
			
			<h3 v-show="otherList.length">往期精选</h3>
			
			<ul :style="'width:'+Math.floor((screenWidth/100)/3.2)*3.2+'rem'" v-show="otherList.length">
				<li v-for="(item,index) in otherList" :key="index" @mouseover="mouseOtherIndex=index" @mouseleave="mouseOtherIndex=-1">
					<img :src="item.goodsImg" alt="好物"/>
					<div class="goodsName">{{ item.goodsName }}</div>
					<div class="goodsMask animated rotateInDownLeft" v-show="mouseOtherIndex==index" @click="goInfo(item.uuid)">查看详情</div>
				</li>
				<div class="clear"></div>
			</ul>
			
			<div class="more" @click="getGoodsMore" v-show="showMoreFlag && otherList.length">LOAD MORE</div>
		</div>
	</div>
</template>

<script>
//引入底部子组件
import Top from '../layout/top'

export default {
	name: 'goodThing',
	props:['screenHeight'],
	data(){
		return{
			screenWidth:document.body.clientWidth,//屏幕宽度
			introduce:{
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
			this.$router.push({path:'/goods/info/'+code})
		}
	},
	components:{'v-top':Top}
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
		length:parseInt((obj.screenWidth/100)/3.2)*2
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
				obj.start+=(res.data.length==parseInt((obj.screenWidth/100)/3.2)*2 ? parseInt((obj.screenWidth/100)/3.2)*2 : res.data.length);
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
.goodsList{
	width: 100%;
	background:rgba(238,241,243,1);
	padding: 0.76rem 0rem;
	padding-top:0.24rem;
	box-sizing: border-box;
	overflow: hidden;
	text-align: center;
}
.goodsList ul{
	display: inline-block;
	margin-top: 0.76rem;
}
.goodsList ul li{
	float: left;
	margin:0rem 0.27rem;
	width:2.66rem;
	margin-top: 0.52rem;
	height:3.04rem;
	background:rgba(255,255,255,1);
	cursor: pointer;
	padding: 0.19rem;
	box-sizing: border-box;
	position: relative;
}
.goodsList li img{
	display: block;
	width: 100%;
	height: 2.09rem;
}
.goodsList ul:first-child li:first-child img{
	height: 100%;
}
.line{
	width:3px;
	height:0.47rem;
	background:rgba(68,68,68,1);
	margin: 0 auto;
	margin-top: 0.76rem;
}
.goodsList h3{
	margin-top: 0.81rem;
	font-size:0.23rem;
	text-align: center;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
}
.goodsList  .more{
	margin: 0 auto;
	margin-top: 0.76rem;
	margin-bottom: 1rem;
	width:2.28rem;
	height:0.66rem;
	line-height: 0.66rem;
	text-align: center;
	font-size:0.17rem;
	font-family:AvantGardeMdITCTTBold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	border:3px solid rgba(68,68,68,1);
	cursor: pointer;
}
.goodsName{
	font-size:0.17rem;
	width: 100%;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	margin-top: 0.2rem;
	text-align: left;
}
.goodsMask{
	position: absolute;
	top: 0.19rem;
	left: 0.19rem;
	width: 2.28rem;
	height: 2.09rem;
	z-index: 20;
	background:rgba(196,207,198,0.6);
	font-size:0.23rem;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(255,255,255,1);
	text-align: center;
	line-height: 2.09rem;
	letter-spacing: 3px;
}
</style>