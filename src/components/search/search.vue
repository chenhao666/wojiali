<template>
	<div class="floor">
		<!--top-->
		<v-top :screenHeight='screenHeight' :introduce='introduce' :showScroll='false'></v-top>
		
		<!--楼盘列表-->
		<div class="floorList">
			<div class="floorBox" v-show="floorList.length">
				<!--线条-->
				<div class="floorLine"></div>
				<h1 class="floorTitle">楼盘</h1>
				
				<div class="box">
					<ul :style="'width:'+Math.floor((screenWidth/100)/3.65)*3.65+'rem'">
						<li class="itme" v-for="(item,key) in floorList" :key='key' @click="goHouse(item.houseId)">
							<div class="img" :style="'background:url('+item.coverPic+') no-repeat center center;background-size:100% auto;'"></div>
							<div class="info">
								<p>{{ item.houseName }}</p>
								<p>{{ item.address }}</p>
							</div>
						</li>
						<div class="clear"></div>
					</ul>
					
					<div class="more" @click="getFloorMore" v-show="showMoreFlag && floorList.length">LOAD MORE</div>
				</div>
			</div>
			
			<div class="floorBox" v-show="styleList.length" >
				<!--线条-->
				<div class="floorLine"></div>
				<h1 class="floorTitle">风格</h1>
				
				<div class="box">
					<ul :style="'width:'+Math.floor((screenWidth/100)/3.65)*3.65+'rem'">
						<li class="itme" v-for="(item,key) in styleList" :key='key' @click="goStyle(item.uuid)">
							<div class="img" :style="'background:url('+item.coverPic+') no-repeat center center;background-size:100% auto;'"></div>
							<div class="info">
								<p>{{ item.stylePaiCode=='unusual' ? '与众不同': item.stylePaiCode=='internetCelebrity' ? '时尚网红' :  item.styleName }} | {{ item.designName }}</p>
								<p>{{ item.details }}</p>
							</div>
						</li>
						<div class="clear"></div>
					</ul>
					
					<div class="more" @click="getStyleMore" v-show="showStyleMore && styleList.length">LOAD MORE</div>
				</div>
			</div>
			<!--线-->
			<div class="line1"></div>
			<div class="line2"></div>
			<div class="line3"></div>
			<div class="line4"></div>
			<div class="line5"></div>
		</div>
	</div>
</template>

<script>
//引入底部子组件
import Top from '../layout/top'

export default {
	name: 'floor',
	props:['screenHeight'],
	data(){
		return{
			code:'',//搜索信息
			screenWidth:document.body.clientWidth,//屏幕宽度
			introduce:{
				bgImg:'http://images.wojiali.cn/Fma7qRww1Y73JDl5vrPgBeS47OJo',
				p1:'SEARCH RESULT',
				p2:'搜索结果',
				p3:'我们搜罗城市楼盘典型户型，以全球设计作品，提供全屋房间解决方案'
			},
			floorList:[],//楼盘列表
			styleList:[],//风格列表
			start:0,
			showMoreFlag:true,
			styleStart:0,
			showStyleMore:true,
		}
	},
	mounted(){
		if(this.$route.params.code){
			this.code=Base64.decode(this.$route.params.code);
			//console.log(this.code)
			//获取楼盘列表
			getFloorList(this);
			//获取风格派列表
			getStyleList(this);
		}else{
			window.history.go(-1);
		}
		if(!this.code){
			window.history.go(-1);
		}
	},
	methods:{
		//更多楼盘信息
		getFloorMore(){
			//获取楼盘列表
			getFloorList(this);
		},
		//获取更多风格
		getStyleMore(){
			getStyleList(this);
		},
		//跳转楼盘列表
		goHouse(houseId){
			let code=Base64.encode(houseId);
			this.$router.push({path:'/house/'+code})
		},
		//跳转风格
		goStyle(uuid){
			//console.log(item.uuid);
			let code=Base64.encode(uuid);
			this.$router.push({path:'/stylePai/info/'+code})
		}
	},
	components:{'v-top':Top}
}
//获取楼盘列表
function getFloorList(obj){
	var data={
		length:8,
		start:obj.start,
		keyWord:obj.code,
		//city:obj.$store.state.city
	}
	obj.$ajax(obj.$store.state.localIP+'queryHouseInfo','post',data,function(res){
		//console.log(res);
		if(res.houseInfo){
			if(res.houseInfo.length>0){
				obj.floorList=obj.floorList.concat(res.houseInfo||[]);
				obj.start+=(res.houseInfo.length==8 ? 8 : res.houseInfo.length);
				if(obj.start>=res.countNum){
					obj.showMoreFlag=false;
				}
			}else{
				if(obj.start!=0){			
					obj.$message('暂无更多楼盘信息！');
				}
			}
		}else{
			if(obj.start!=0){	
				obj.$message('暂无更多楼盘信息！');
			}
		}
	})
}
//获取风格列表
function getStyleList(obj){
	var data={
		length:8,
		start:obj.styleStart,
		designName:obj.code,
		//city:obj.$store.state.city
	}
	obj.$ajax(obj.$store.state.localIP+'stylePai/listDesignByStylePai','post',data,function(res){
		//console.log(res);
		if(res.data){
			if(res.data.length>0){
				let list=res.data;
				for(let i=0;i<list.length;i++){
					if(list[i].details){
						list[i].details=list[i].details.replace(/[\s\r\n]/g,"");
					}
				}
				obj.styleList=obj.styleList.concat(res.data||[]);
				obj.styleStart+=(res.data.length==8 ? 8 : res.data.length);
				if(obj.styleStart>=res.countNum){
					obj.showStyleMore=false;
				}
			}else{
				if(obj.styleStart!=0){					
					obj.$message('暂无更多风格信息！');
				}
			}
		}else{
			if(obj.styleStart!=0){	
				obj.$message('暂无更多风格信息！');
			}
		}
	})
}
</script>

<style scoped="scoped">
.floorList{
	width: 100%;
	height: auto;
	padding-top: 0.74rem;
	padding-bottom: 0.76rem;
	position:relative;
	overflow: hidden;
}
.floorList ul{
	display: inline-block;
	width: 100%;
	/*display: flex;
	justify-content: space-between;
	flex-direction:row;
	flex-wrap:wrap;*/
}
.floorBox{
	position: relative;
	height:auto;
	width: 100%;
	padding: 1rem 0rem;
}
.floorTitle{
	position: absolute;
	top:0.8rem;
	left: 50%;
	transform: translateX(-50%);
	width: 2rem;
	text-align: center;
	font-size:0.23rem;
	height: 0.4rem;
	background: #ffffff;
	line-height: 0.4rem;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(68,68,68,1);
}
.floorLine{
	width: 60%;
	margin: 0 auto;
	height:1px;
	background:rgba(161,171,162,1);
	opacity:0.4;
}
.itme{	
	width:2.65rem;
	float: left;
	margin: 0rem 0.5rem;
	height:3.04rem;
	background:rgba(255,255,255,1);
	padding: 0.2rem;
	box-sizing: border-box;
	margin-top: 0.78rem;
	cursor: pointer;
	box-shadow:0px 5px 20px 0px rgba(40,52,51,0.27);
}
.itme .img{
	display: block;
	width: 100%;
	height: 1.9rem;
}
.box{
	margin: 0 auto;
	text-align: center;
}
.more{
	margin: 0 auto;
	margin-top: 0.76rem;
	width:2.28rem;
	height:0.66rem;
	border:3px solid rgba(68,68,68,1);
	text-align: center;
	line-height: 0.66rem;
	font-size:0.17rem;
	font-family:AvantGardeMdITCTTBold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	cursor: pointer;
}
.info{
	width: 100%;
	font-size:0.17rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	text-align: left;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.info p{
	margin-top: 0.18rem;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.info p:last-child{
	width: 100%;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
	font-size:0.13rem;
	font-family:MicrosoftYaHeiLight;
	font-weight:300;
	color:rgba(68,68,68,1);
}
.floorList .line1{
	width:1px;
	height:100%;
	background:rgba(191,191,191,1);
	opacity:0.3;
	position: absolute;
	top: 0rem;
	left: 0.76rem;
}
.floorList .line2{
	width:1px;
	height:100%;
	background:rgba(191,191,191,1);
	opacity:0.3;
	position: absolute;
	top: 0rem;
	left: 1.52rem;
}
.floorList .line3{
	width:1px;
	height:100%;
	background:rgba(191,191,191,1);
	opacity:0.3;
	position: absolute;
	top: 0rem;
	left: 50%;
}
.floorList .line4{
	width:1px;
	height:100%;
	background:rgba(191,191,191,1);
	opacity:0.3;
	position: absolute;
	top: 0rem;
	right: 0.76rem;
}
.floorList .line5{
	width:1px;
	height:100%;
	background:rgba(191,191,191,1);
	opacity:0.3;
	position: absolute;
	top: 0rem;
	right:1.52rem;
}
</style>