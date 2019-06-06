<template>
	<div class="wapHouse">
		<v-wapTop :topData='topData'></v-wapTop>
		
		<!--户型列表-->
		<div class="houseList">
			<div class="top">
				<h1>全屋设计套装</h1>
				<h2>设计师可根据您的户型定制专属方案</h2>
				<div class="des">
					窝家里针对该楼盘实地考察、测量，由5位资深设计师设计出完全贴合户型的精心设计，还可以根据您的个人喜好作出个性化改动。窝家里针对该楼盘实地考察、测量，由5位资深设计师设计出完全贴合户型的精心设计，还可以根据您的个人喜好作出个性化改动。窝家里针对该楼盘实地考察、测量，由5位资深设计师设计出完全贴合户型的精心设计，还可以根据您的个人喜好作出个性化改动。
				</div>
			</div>	
			
			<!--户型选择-->
			<div class="selectHouse">
				<div class="title">户型选择</div>
			</div>
			
			<div class="areaList">
				<div class="area_container swiper-container">
			        <div class="swiper-wrapper">
			            <div :class="areaIndex==index?'active swiper-slide':'swiper-slide'" v-for="(item,index) in areaList" :key='index' @click="selectAttr(0,index)">{{ item }}㎡</div>
			        </div>
			    </div>
			</div>
			
			<div class="modelList">
				<div class="model_container swiper-container">
			        <div class="swiper-wrapper">
			            <div :class="typeNameIndex==index?'swiper-slide active':'swiper-slide'" v-for="(item,index) in typeNameList" :key='index' @click="selectAttr(1,index)"><span>{{ item.houseTypeName }}</span></div>
			        </div>
			    </div>
			</div>
			<!--选中户型-->
			<div class="houseInfo">
				<div class="left">
					<div class="name">{{ selectHouse.houseModel }}</div>
					<div class="model">{{ selectHouse.houseTypeName }}</div>
					<div class="area">实用面积{{ selectHouse.houseArea }}㎡</div>
					<div class="goInfo" @click="goDesignInfo">
						<img src="/static/img/wap/goInfo.png" alt="查看方案"/>
					</div>
				</div>
				<div class="right">
					<img :src="selectHouse.houseModelUrl" alt="户型图"  class="modelImg"/>
				</div>
				<div class="clear"></div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'wapHouse',
  		data(){
  			return{
  				houseId:'',
				topData:{
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
				this.$router.push({path:'/wap/programme/'+code});
			}
  		},
	  	watch:{
			'$store.state.city': function () {
	      		this.$router.push({path:'/floor/index'})
	    	}
		},
  		updated(){
  			new Swiper('.area_container',{
				slidesPerView: 'auto',
				observer: true,//修改swiper自己或子元素时，自动初始化swiper
				observeParents: true//修改swiper的父元素时，自动初始化swiper
			});
			new Swiper('.model_container',{
				slidesPerView: 'auto',
				observer: true,//修改swiper自己或子元素时，自动初始化swiper
				observeParents: true//修改swiper的父元素时，自动初始化swiper
			});
  		}
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
		obj.topData.p2=obj.selectHouse.houseName;
		obj.topData.p3=obj.selectHouse.address;
		obj.topData.bgImg=obj.selectHouse.coverPic;
	})
}
</script>

<style scoped="scoped">
	.houseList{
		width: 100%;
		background:rgba(245,247,248,1);
		padding-bottom: 0.5rem;
		padding-top: 6rem;
		position: relative;
	}
	.top{
		width: 90%;
		padding:0.4rem;
		position: absolute;
		left:5%;
		top: -0.6rem;
		background: #ffffff;
		border-radius: 20px;
		box-sizing: border-box;
		height: 6rem;
	}
	.houseList h1{
		width: 100%;
		font-size:0.26rem;
		height: 0.3rem;
		line-height: 0.3rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.houseList h2{
		margin-top: 0.2rem;
		width: 100%;
		line-height:150%;
		font-size:0.4rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.houseList .des{
		font-size:0.24rem;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(68,68,68,1);
		line-height: 150%;
		margin-top: 0.5rem;
	}
	/*.selectHouse{
		width: 90%;
		margin-left: 5%;
		height: 0.6rem;
		line-height: 0.6rem;
		font-size:0.26rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
		border-bottom: 1px solid rgba(210,210,210,1);
		position: relative;
		cursor: pointer;
	}
	.selectHouse:after{
		content: '';
		width: 0.16rem;
		height: 0.16rem;
		position: absolute;
		top: 0.16rem;
		right: 0rem;
		border-left: 1px solid #000;
		border-bottom: 1px solid #000;
		transform: rotate(-45deg);
	}*/
	.selectHouse{
		width: 90%;
		left: 5%;
		height: 1px;
		background:rgb(210,210,210);
		position: relative;
	}
	.selectHouse .title{
		position: absolute;
		top: -0.15rem;
		height: 0.3rem;
		line-height: 0.3rem;
		left: 50%;
		padding: 0rem 0.3rem;
		transform: translateX(-50%);
		background:rgba(245,247,248,1);
	}
	.houseInfo{
		width: 90%;
		margin-left: 5%;
		padding-top: 0.76rem;
		padding-bottom: 1rem;
		position: relative;
	}
	.houseInfo .left{
		float: left;
		width: 50%;
		position: relative;
		height: 3rem;
	}
	.houseInfo .right{
		float: left;
		width: 50%;
	}
	.houseInfo .right img{
		width: 100%;
		height: 3rem;
	}
	.name{
		font-size:0.26rem;
		height: 0.3rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.model{
		font-size:0.3rem;
		margin-top: 0.2rem;
		height: 0.4rem;
		line-height: 0.4rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(126,140,127,1);
	}
	.area{
		font-size:0.24rem;
		margin-top: 0.3rem;
		height: 0.3rem;
		line-height: 0.3rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.goInfo img{
		display: block;
		width: 2.53rem;
		height: 0.7rem;
	}
	.goInfo{
		display: inline-block;
		position: absolute;
		bottom: 0rem;
		cursor: pointer;
	}
/*	.houseMask{
		position: absolute;
		width: 100%;
		height: 100%;
		z-index: 30;
		left: 0rem;
		top: 0rem;
		background: rgba(0,0,0,0.5);
	}
	.selectList{
		position: absolute;
		background: #ffffff;
		top: 0rem;
		left: 0rem;
		width: 100%;
		height: auto;
		padding: 0.4rem;
		box-sizing: border-box;
		z-index: 50;
	}*/
	.areaList{
		width: 90%;
		margin-left: 5%;
		margin-top: 0.5rem;
	}
	.modelList{
		width: 90%;
		margin-left: 5%;
	}
	.swiper-container{
		width: 100%;
		height: 0.5rem;
	}
	.swiper-slide{
		width: 20%;
		height: 0.4rem;
		text-align: center;
		font-size:0.24rem;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(68,68,68,1);
		line-height: 0.4rem;
		border-right:1px solid rgb(220,220,220);
	}
	.swiper-slide:last-child{
		border: none;
	}
	.swiper-slide.active{
		font-weight:bold;
	}
	.modelList span{
		display: block;
		padding: 0rem 0.2rem;
		background:rgba(126,140,127,1);
		opacity:0.2;
		border-radius:4px;
		font-size:0.24rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(255,254,254,1);
		line-height: 0.5rem;
		height: 0.5rem;
	}
	.modelList .swiper-slide{
		width: 2rem;
		text-align: left;
		line-height: 0.6rem;
		height: 0.6rem;
		padding:0rem 0.2rem;
		border-right: none;
	}
	.modelList .swiper-slide.active span{
		background:rgba(126,140,127,1);
		opacity: 1;
		font-size:0.24rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(255,254,254,1);
	}
</style>