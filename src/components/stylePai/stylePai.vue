<template>
	<div class="stylePai">
		<!--top-->
		<v-top :screenHeight='screenHeight' :introduce='introduce'  :showScroll='true'></v-top>
		
		<!--风格派列表-->
		<div class="stylePaiList">
			<div style="height: 0.76rem;"></div>
			<div class="top">
				<div :class="selectIndex==0?'all active':'all'" @click="selectType(0)">全部</div>
				<div class="classType">
					<ul>
						<li :class="selectIndex==1?'active':''" @click="selectType(1)">时尚网红</li>
						<li :class="selectIndex==2?'active':''" @click="selectType(2)">与众不同</li>
						<li :class="selectIndex==(index+3)?'active':''" @click="selectType(index+3)" v-for="(item,index) in classTypeList" :key="index">{{ item.styleName }}</li>
						<div class="clear"></div>
					</ul>
					<div class="typeMore" @click="openMore=!openMore">{{ openMore?'Close':'More' }}</div>
				</div>
				
				<div class="allTypeList animated fadeInUp" v-show="openMore">
					<ul>
						<li :class="selectIndex==0?'active':''" @click="selectType(0)">全部</li>
						<li :class="selectIndex==1?'active':''" @click="selectType(1)">时尚网红</li>
						<li :class="selectIndex==2?'active':''" @click="selectType(2)">与众不同</li>
						<li :class="selectIndex==(index+3)?'active':''" @click="selectType(index+3)" v-for="(item,index) in classTypeList" :key="index">{{ item.styleName }}</li>
						<div class="clear"></div>
					</ul>
				</div>
			</div>
			
			<div class="content">
				<div class="title" v-show="selectName!='全部'">{{ selectName }}</div>
				
				<div class="list">
					<div :class="mouseIndex==index ?'item hover' :'item'" v-for="(item,index) in styleList" :key='index' @click="goInfo(item)" @mouseover="mouseIndex=index" @mouseleave="mouseIndex=-1">
						<div :class="index%2==0?'left':'right'">
							<img :src="item.coverPic" alt="" />
						</div>
						<div :class="index%2==0?'introduce':'introduce introLeft'">
							<p>{{ item.designName }}</p>
							<p>{{ item.details }}</p>
						</div>
						<div class="clear"></div>
						<div class="number">{{ (index+1)>9?(index+1):'0'+(index+1) }}</div>
					</div>
				</div>
			</div>
			<!--线-->
			<div class="line"></div>
			<div class="line1"></div>
			<div class="line2"></div>
			<div class="line3"></div>
			<div class="line4"></div>
			<div class="line5"></div>
			<div class="line6"></div>
			
			<!--更多-->
			<div class="more" @click="loadMore" v-show="showMoreFlag">LOAD MORE</div>
		</div>
	</div>
</template>

<script>
//引入底部子组件
import Top from '../layout/top'

export default {
	name: 'stylePai',
	props:['screenHeight'],
	data(){
		return{
			introduce:{
				bgImg:'http://images.wojiali.cn/Fma7qRww1Y73JDl5vrPgBeS47OJo',
				p1:'STYLE',
				p2:'风格派',
				p3:'当 设 计 遇 上 生 活'
			},
			styleList:[],
			openMore:false,
			classTypeList:[],//经典风格数组
			selectIndex:0,//默认选中
			selectName:'全部',//选中名称
			stylePaiCode:'',
			styleUuid:'',
			showMoreFlag:true,
			mouseIndex:-1,
			start:0//初始
		}
	},
	mounted(){
		let that=this;
		getStyleList(this);
		//获取第一页数据
		getFirstStylePaiList(that,'unusual',function(){
			getFirstStylePaiList(that,'internetCelebrity',function(){
				getFirstStylePaiList(that,'classicStyle',function(){});
			});
		});
	},
	methods:{
		//加载更多
		loadMore(){
			getMoreList(this)
		},
		//选择风格
		selectType(index){
			this.styleList=[];
			this.stylePaiCode='';
			this.styleUuid='';
			this.selectIndex=index;
			this.start=0;
			this.showMoreFlag=true;
			let that=this;
			if(index==0){
				this.selectName='全部';
				//获取第一页数据
				getFirstStylePaiList(that,'unusual',function(){
					getFirstStylePaiList(that,'internetCelebrity',function(){
						getFirstStylePaiList(that,'classicStyle',function(){});
					});
				});
			}else if(index==1){
				this.selectName='时尚网红 FASHION INSTAFAMOUS';
				this.stylePaiCode='internetCelebrity';
				getMoreList(this);
			}else if(index==2){
				this.selectName='与众不同 DIFFERENTIATE';
				this.stylePaiCode='unusual';
				getMoreList(this);
			}else{
				this.selectName=this.classTypeList[index-3].styleName;
				this.stylePaiCode='classicStyle';
				this.styleUuid=this.classTypeList[index-3].styleUuid
				getMoreList(this);
			}
		},
		//跳转详情页
		goInfo(item){
			//console.log(item.uuid);
			let code=Base64.encode(item.uuid);
			this.$router.push({path:'/stylePai/info/'+code})
		}
	},
	components:{'v-top':Top}
}
//获取所有风格列表
function getStyleList(obj){
	obj.$ajax(obj.$store.state.localIP+'stylePai/listStyleHavingByNoAll','get',{},function(res){
		console.log(res)
		obj.classTypeList=res.data || [];
	})
}
//获取全部第一页的数据
function getFirstStylePaiList(obj,type,callback){
	var data={
		length:1,
		start:0,
		stylePaiCode:type
	}
	if(type=='classicStyle'){
		data.length=3;
	}
	obj.$ajax(obj.$store.state.localIP+'stylePai/listDesignByStylePai','post',data,function(res){
		if(res.data){			
			let list=res.data;
			for(let i=0;i<list.length;i++){
				if(list[i].details){
					if(list[i].details.length>50){
						list[i].details=list[i].details.substring(0,50)+'...';
					}
				}
			}
			obj.styleList=obj.styleList.concat(list);
			callback();
		}else{
			obj.$message.error("获取风格派列表失败！");
		}
	})
}
//获取更多数据
function getMoreList(obj){
	var data={
		length:5,
		start:obj.start
	}
	if(obj.stylePaiCode){
		data.stylePaiCode=obj.stylePaiCode;
	}
	if(obj.styleUuid){
		data.styleUuid=obj.styleUuid;
	}
	if(obj.selectIndex==0){
		var styleList=obj.styleList;
		//console.log(list)
		var arr=[];
		for(let i=0;i<styleList.length;i++){
			if(i>4){
				break;
			}else{
				arr.push(styleList[i].uuid);
			}
		}
		data.excludeDesignUuidList=arr;
	}
	obj.$ajax(obj.$store.state.localIP+'stylePai/listDesignByStylePai','post',data,function(res){
		if(res.data){			
			let list=res.data;
			if(list.length>0){
				for(let i=0;i<list.length;i++){
					if(list[i].details){
						if(list[i].details.length>50){
							list[i].details=list[i].details.substring(0,50)+'...';
						}
					}
				}
				obj.styleList=obj.styleList.concat(list);
				obj.start+=(list.length==5 ? 5 : list.length);
				if(obj.start>=res.countNum){
					obj.showMoreFlag=false;
				}
			}else{
				obj.$message('暂无更多风格信息！');
			}
		}else{
			obj.$message.error("获取风格派列表失败！");
		}
	})
}
</script>

<style scoped="scoped">
.stylePaiList{
	position: relative;
	width: 100%;
	overflow: hidden;
}
.stylePaiList .top{
	position: relative;
	width: 100%;
	height: 0.76rem;
	line-height: 0.76rem;
}
.top .all{
	width: 1.52rem;
	text-align: center;
	height: 0.76rem;
	font-size:0.17rem;
	font-family:MicrosoftYaHei-Bold;
	color:rgba(0,0,0,1);
	cursor: pointer;
}
.top .all.active{
	font-weight: bold;
}
.allTypeList{
	position: absolute;
	top: 0.76rem;
	border: 1px solid rgba(245,247,248,1);
	padding: 0.3rem;
	background: #ffffff;
	z-index: 40;
	width: 60%;
	left: 20%;
	font-size:0.15rem;
	font-family:MicrosoftYaHeiLight;
	font-weight:300;
}
.allTypeList ul li{
	float: left;
	margin-left: 0.55rem;
	cursor: pointer;
}
.top .classType{
	width: 60%;
	overflow: hidden;
	height: 0.76rem;
	position: absolute;
	top: 0rem;
	left: 20%;
	font-size:0.15rem;
	font-family:MicrosoftYaHeiLight;
	font-weight:300;
	color:rgba(0,0,0,1);
	text-align: center;
}
.top .classType ul{
	display: inline-block;
	height: 0.76rem;
	overflow: hidden;
}
.top .classType .typeMore{
	position: absolute;
	width: 1rem;
	text-align: center;
	top: 0rem;
	right: 0rem;
	line-height: 0.76rem;
	height: 0.76rem;
	background: #ffffff;
	cursor: pointer;
}
.top .classType li{
	float: left;
	margin-left: 0.55rem;
	cursor: pointer;
}
.classType li.active,.allTypeList ul li.active{
	font-size:0.15rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(159,170,160,1);
}
.top .classType li:first-child{
	margin-left: 0rem;
}
.content{
	width: 100%;
	padding:0.33rem 1.52rem;
	box-sizing: border-box;
	z-index: 80;
}
.title{
	font-size:0.15rem;
	font-family:AvantGardeMdITCTTBold;
	font-weight:bold;
	color:rgba(68,68,68,1);
}
.list{
	margin-top: 0.3rem;
}
.list .item{
	position: relative;
	border:1px solid rgba(140,140,140,0.2);
	cursor: pointer;
}
.list .item .left{
	width: 50%;
	float: left;
	position: relative;
	height: 100%;
}
.list .item.hover .left{
	box-shadow:0px 5px 20px 0px rgba(84,96,95,0.57);
}
.list .item .right{
	width: 50%;
	position: relative;
	float: right;
	height: 100%;
}
.list .item.hover .right{
	box-shadow:0px 5px 20px 0px rgba(84,96,95,0.57);
}
.list .item img{
	display: block;
	width: 100%;
	height: auto;
}
.introduce{
	position: absolute;
	width: 4.28rem;
	height: auto;
	top: 50%;
	left: 75%;
	transform: translate(-50%,-50%);
	font-size:0.23rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
}
.introLeft{
	left: 25%;
}
.introduce p:last-child{
	font-size: 0.13rem;
	font-weight: 400;
	margin-top: 0.3rem;
	line-height: 150%;
}
.line{
	position: absolute;
	top: 0.76rem;
	width: 100%;
	height:1px;
	background:rgba(220,220,220,1);
	opacity:0.3;
}
.line1{
	position: absolute;
	top: 1.52rem;
	width: 100%;
	height:1px;
	background:rgba(220,220,220,1);
	opacity:0.3;
	z-index: 20;
}
.line2{
	position: absolute;
	width:1px;
	height:2.35rem;
	background:rgba(140,140,140,1);
	opacity:0.2;
	z-index: 50;
	top: 0rem;
	left: 1.52rem;
	z-index: 20;
}
.line3{
	position: absolute;
	width:1px;
	height:2.35rem;
	background:rgba(140,140,140,1);
	opacity:0.2;
	top: 0rem;
	left: 3.04rem;
	z-index: 20;
}
.line4{
	position: absolute;
	width:1px;
	height:2.35rem;
	background:rgba(140,140,140,1);
	opacity:0.2;
	top: 0rem;
	left:50%;
	z-index: 20;
}
.line5{
	position: absolute;
	width:1px;
	height:100%;
	background:rgba(140,140,140,1);
	opacity:0.2;
	top: 0rem;
	right:0.76rem;
	z-index: 20;
}
.line6{
	position: absolute;
	width:1px;
	height:100%;
	background:rgba(140,140,140,1);
	opacity:0.2;
	top: -2.6rem;
	right:1.52rem;
	z-index: 20;
}
.more{
	margin: 0rem auto;
	margin-top: 0.76rem;
	margin-bottom: 0.76rem;
	width:2.28rem;
	height:0.66rem;
	border:3px solid rgba(68,68,68,1);
	font-size:0.17rem;
	text-align: center;
	line-height: 0.66rem;
	font-family:AvantGardeMdITCTTBold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	cursor: pointer;
}
.number{
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	font-size:0.88rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(17,17,17,1);
	line-height:193px;
	opacity:0.1;
}
</style>