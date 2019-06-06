<template>
	<div class="house">
		<!--top-->
		<v-top :screenHeight='screenHeight' :introduce='introduce' :showScroll='false'></v-top>
		
		<div class="houseList">
			<div class="top">
				<div class="goBack" @click="goBack"><img src="/static/img/left.png" alt="左箭头"/>BACK</div>
				<h1>全屋设计套装</h1>
				<h2>设计师可根据您的户型定制专属方案</h2>
				<div class="des">
					窝家里针对该楼盘实地考察、测量，由5位资深设计师设计出完全贴合户型的精心设计，还可以根据您的个人喜好作出个性化改动。窝家里针对该楼盘实地考察、测量，由5位资深设计师设计出完全贴合户型的精心设计，还可以根据您的个人喜好作出个性化改动。窝家里针对该楼盘实地考察、测量，由5位资深设计师设计出完全贴合户型的精心设计，还可以根据您的个人喜好作出个性化改动。
				</div>
			</div>
			
			<div  class="houseSelect">
				<div class="title">户型选择</div>
				<div class="houseInfo">
					<div class="left">
						<div class="selectApartment">{{ selectHouse.houseModel }}</div>
						<div class="selectModel">{{ selectHouse.houseTypeName }}</div>
						<div class="selectArea">实用面积{{ selectHouse.houseArea }}㎡</div>
						<div class="goSelect" @click="goDesignInfo">
							选择方案
							<img src="/static/img/rightArrow.png" alt="箭头"/>
						</div>
					</div>
					<div class="right">
						<div class="areaList">
							<ul :style="'width:'+areaList.length*1.52+'rem'">
								<li :class="areaIndex==index?'active':''" v-for="(item,index) in areaList" :key='index' @click="selectAttr(0,index)">{{ item }}㎡</li>
								<div class="clear"></div>
							</ul>
						</div>
						<div class="apartmentList">
							<ul :style="'width:'+areaList.length*1.52+'rem'">
								<li :class="typeNameIndex==index?'active':''" v-for="(item,index) in typeNameList" :key='index' @click="selectAttr(1,index)">{{ item.houseTypeName }}</li>
								<div class="clear"></div>
							</ul>
						</div>
						<img :src="selectHouse.houseModelUrl" alt="户型图"  class="modelImg"/>
						<div class="all" @click="showMoreFun" v-show="areaList.length>4 || typeNameList >4">{{ showMore?'Close':'More' }}</div>
						<div class="mask" v-show="showMore"></div>
						<div class="moreList animated fadeInUp" v-show="showMore">
							<h3>面积</h3>
							<ul>
								<li :class="areaIndex==index?'active':''" v-for="(item,index) in areaList" :key='index' @click="selectAttr(0,index)">{{ item }}㎡</li>
								<div class="clear"></div>
							</ul>
							<h3>居室</h3>
							<ul>
								<li :class="typeNameIndex==index?'active':''" v-for="(item,index) in typeNameList" :key='index' @click="selectAttr(1,index)">{{ item.houseTypeName }}</li>
								<div class="clear"></div>
							</ul>
						</div>
					</div>
					<div class="clear"></div>
				</div>
			</div>
			
			<!--线-->
			<div class="line1"></div>
			<div class="line2"></div>
			<div class="line3"></div>
			<div class="line4"></div>
			<div class="line5"></div>
			<div class="line6"></div>
			<div class="line7"></div>
			<div class="line8"></div>
			<div class="line9"></div>
		</div>
	</div>
</template>

<script>
//引入底部子组件
import Top from '../layout/top'

export default {
	name: 'house',
	props:['screenHeight'],
	data(){
		return{
			houseId:'',
			introduce:{
				bgImg:'',
				p1:'',
				p2:'',
				p3:''
			},
			showMore:false,//更多
			areaList:[],//面积列表
			areaIndex:0,//面积列表下标
			typeNameList:[],//户型列表
			typeNameIndex:0,//户型列表下标
			selectHouse:{}//当前选中的户型
		}
	},
	mounted(){
		if(this.$route.params.code){
			this.houseId=Base64.decode(this.$route.params.code);
			//获取面积户型列表
			getHouseList(this);
		}else{
			window.history.go(-1);
		}
		if(!this.houseId){
			window.history.go(-1);
		}
	},
	methods:{
		goBack(){
			window.history.go(-1);
		},
		//选择面积和户型
		selectAttr(type,index){
			//console.log(index);
			if(type==1){
				this.typeNameIndex=index;
				this.selectHouse=this.typeNameList[index].designInfos[0];
			}else{
				this.areaIndex=index
				this.typeNameList=[];
				this.typeNameIndex=0;
				getHouseInfo(this);
			}
		},
		//更多
		showMoreFun(){
			this.showMore=!this.showMore;
		},
		//方案详情
		goDesignInfo(){
			let designCode=this.selectHouse.houseId+','+this.selectHouse.houseModel+','+this.selectHouse.styleName
			let code=Base64.encode(designCode);
			this.$router.push({path:'/programme/'+code})
		}
	},
	watch:{
		'$store.state.city': function () {
      		this.$router.push({path:'/floor'})
    	}
	},
	components:{'v-top':Top}
}
//获取户型列表
function getHouseList(obj){
	var data=data = {
      	//city:obj.$store.state.city, //城市
      	houseId: obj.houseId || '', //楼盘名称
    }; 
	obj.$ajax(obj.$store.state.localIP+'selectDesignHouseType','post',data,function(res){
		//console.log(res);
		obj.areaList=res.areaList || [];
		//obj.typeNameList=res.typeNameList || [];
		//获取详情
		getHouseInfo(obj);
	})
}
//筛选户型
function getHouseInfo(obj){
	var data={
      	//city:obj.$store.state.city, //城市
      	houseId: parseInt(obj.houseId), //楼盘名称
		length:10,
		start:0
    }; 
    if(obj.areaList.length>0){
    	data.houseArea=obj.areaList[obj.areaIndex];
    }else{
    	return;
    }
    if(obj.typeNameList.length>0){    		
    	data.houseTypeName=obj.typeNameList[obj.typeNameIndex].houseTypeName;
    }
	obj.$ajax(obj.$store.state.localIP+'queryHouseDesign','post',data,function(res){
		//console.log(res);
		if(!res.designInfoList){
			obj.$message.error('暂无符合匹配的户型！');
			return;
		}
		if(res.designInfoList.length==0){
			obj.$message.error('暂无符合匹配的户型！');
			return;
		}
		if(!res.designInfoList[0].designInfos){
			obj.$message.error('获取户型列表失败！');
			return;
		}
		if(res.designInfoList[0].designInfos.length==0){
			obj.$message.error('获取户型列表失败！');
			return;
		}
		/*let arr=[];
		for(let i=0;i<res.designInfoList.length;i++){
			arr.push(res.designInfoList[i].houseTypeName);
		}*/
		obj.typeNameList=res.designInfoList.concat();
		obj.selectHouse=res.designInfoList[0].designInfos[0];
		obj.introduce.p2=obj.selectHouse.houseName;
		obj.introduce.p3=obj.selectHouse.address;
		obj.introduce.bgImg=obj.selectHouse.coverPic;
	})
}
</script>

<style scoped="scoped">
	.houseList{
		position: relative;
		width: 100%;
		height: auto;
		padding-top:3.8rem;
		padding-bottom: 2rem;
	}
	.goBack img{
		position: absolute;
		width: 0.11rem;
		height: 0.21rem;
		top: 0.275rem;
		left: 0.2rem;
	}
	.goBack{
		position: absolute;
		top: 0rem;
		left: -1.52rem;
		width:1.52rem;
		height:0.76rem;
		background:rgba(0,0,0,0.6);
		text-align: center;
		line-height: 0.76rem;
		font-size:0.23rem;
		font-family:AvantGardeMdITCTT;
		font-weight:400;
		color:rgba(255,255,255,1);
		cursor: pointer;
	}
	.houseList .top{
		width: 10.62rem;
		position: absolute;
		top: -0.76rem;
		left: 50%;
		transform: translateX(-50%);
		height: 3.79rem;
		background: #ffffff;
		background:rgba(255,255,255,1);
		box-shadow:0px 4px 38px 0px rgba(79,93,80,0.1);
		padding: 0.76rem;
		box-sizing: border-box;
	}
	.houseList .top h1{
		font-size:0.23rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.houseList .top h2{
		margin-top: 0.1rem;
		font-size:0.38rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.houseList .top .des{
		font-size:0.13rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(68,68,68,1);
		line-height:25px;
		margin-top: 0.6rem;
	}
	.houseSelect .title{
		width:2.28rem;
		height:0.76rem;
		background:rgba(245,247,248,1);
		margin-left: 1.52rem;
		margin-top: 0.1rem;
		font-size:0.2rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
		text-align: center;
		line-height: 0.76rem;
	}
	.houseInfo{
		margin-left: 1.52rem;
	}
	.houseInfo .left{
		float: left;
		width: 3.8rem;
		height: 7.6rem;
	}
	.houseInfo .right{
		float: left;
		width: 7.55rem;
		height: 7.6rem;
		position: relative;
	}
	.houseInfo .all{
		position: absolute;
		font-size:0.19rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(68,68,68,1);
		cursor: pointer;
		width:1.52rem;
		height:0.76rem;
		text-align: center;
		line-height: 0.76rem;
		top: 0rem;
		right: 0rem;
		background: #ffffff;
	}
	.areaList,.apartmentList{
		width: 100%;
		overflow: hidden;
		position: relative;
		height: auto;
		padding-top: 0.76rem;
		box-sizing: border-box;
	}
	.areaList ul,.apartmentList ul{
		position: absolute;
		top: 0rem;
		left: 0rem;
	}
	.areaList ul li,.apartmentList li{
		float: left;
		width:1.52rem;
		height:0.76rem;
		text-align: center;
		line-height: 0.76rem;
		font-size:0.19rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(68,68,68,1);
		cursor: pointer;
	}
	.areaList ul li.active{
		font-size:0.19rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
		background:rgba(245,247,248,1);
	}
	.apartmentList ul li.active{
		font-size:0.19rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.moreList{
		position: absolute;
		width: 100%;
		height: auto;
		top:0.76rem;
		padding: 0.3rem;
		border: 1px solid rgba(245,247,248,1);
		z-index: 40;
		background: #ffffff;
		box-sizing: border-box;
	}
	.moreList h3{
		font-size:0.19rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.moreList ul li{
		float: left;
		width:1.52rem;
		height:0.76rem;
		text-align: center;
		line-height: 0.76rem;
		font-size:0.19rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(68,68,68,1);
		cursor: pointer;
	}
	.moreList ul li.active{
		font-size:0.19rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.houseInfo .mask{
		position: absolute;
		top:0.76rem;
		width: 100%;
		height: 100%;
		z-index: 30;
		left: 0rem;
		background: rgba(0,0,0,0.5);
	}
	.modelImg{
		display: block;
		width:7.55rem;
		height: 6rem;
		background:rgba(246,246,246,1);
		border:1px solid rgba(238,238,238,1);
		z-index: 40;
		box-sizing: border-box;
	}
	.selectApartment{
		margin-top: 2.28rem;
		margin-left: 0.76rem;
		font-size:0.23rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.selectModel{
		font-size:0.34rem;
		margin-top: 0.1rem;
		margin-left: 0.76rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(126,140,127,1);
	}
	.selectArea{
		margin-top: 2.2rem;
		margin-left: 0.76rem;
		font-size:0.23rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.goSelect{
		margin-top: 0.3rem;
		width:2.2rem;
		height:0.66rem;
		border:3px solid rgba(68,68,68,1);
		line-height: 0.66rem;
		font-size:0.17rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
		margin-left: 0.76rem;
		padding-left: 0.38rem;
		position: relative;
		box-sizing: border-box;
		cursor: pointer;
	}
	.goSelect img{
		width: 0.55rem;
		height: 0.06rem;
		position: absolute;
		top: 0.3rem;
		right: 0.38rem;
	}
	.line1{
		position: absolute;
		top: 0rem;
		left: 1.52rem;
		width:1px;
		height:100%;
		background:rgba(191,191,191,1);
		opacity:0.3;
		z-index: 20;
	}
	.line2{
		position: absolute;
		top: 4.65rem;
		left:0rem;
		width:100%;
		height:1px;
		background:rgba(0,0,0,1);
		opacity:0.1;
		z-index: 20;
	}
	.line3{
		position: absolute;
		top: 5.41rem;
		left:0rem;
		width:100%;
		height:1px;
		background:rgba(0,0,0,1);
		opacity:0.1;
		z-index: 20;
	}
	.line4{
		position: absolute;
		top: 3.9rem;
		left:5.31rem;
		width:1px;
		height:5.46rem;
		background:rgba(140,140,140,1);
		opacity:0.1;
		z-index: 20;
	}
	.line5{
		position: absolute;
		top: 3.9rem;
		left:6.83rem;
		width:1px;
		height:5.46rem;
		background:rgba(140,140,140,1);
		opacity:0.1;
		z-index: 20;
	}
	.line6{
		position: absolute;
		top: 3.9rem;
		left:8.35rem;
		width:1px;
		height:5.46rem;
		background:rgba(140,140,140,1);
		opacity:0.1;
		z-index: 20;
	}
	.line7{
		position: absolute;
		top: 3.9rem;
		left:9.87rem;
		width:1px;
		height:5.46rem;
		background:rgba(140,140,140,1);
		opacity:0.1;
		z-index: 20;
	}
	.line7{
		position: absolute;
		top: 3.9rem;
		left:9.87rem;
		width:1px;
		height:5.46rem;
		background:rgba(140,140,140,1);
		opacity:0.1;
		z-index: 20;
	}
	.line8{
		position: absolute;
		top: 3.9rem;
		left:11.39rem;
		width:1px;
		height:5.46rem;
		background:rgba(140,140,140,1);
		opacity:0.1;
		z-index: 20;
	}
	.line9{
		position: absolute;
		top: 12.25rem;
		left:0rem;
		width:100%;
		height:1px;
		background:rgba(0,0,0,1);
		opacity:0.1;
		z-index: 20;
	}
</style>