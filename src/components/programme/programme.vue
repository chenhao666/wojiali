<template>
	<div class="programme">
		<!--top-->
		<v-top :screenHeight='screenHeight' :introduce='introduce' :showScroll='false'></v-top>
		
		<div class="goThreeD" @click="goThreeD">3D</div>
		
		<div class="info">
			<div class="top">
				<h1>全屋设计套装</h1>
				<h2>{{ designInfo.designName }}</h2>
				<p>{{ designInfo.details }}</p>
				<!--<h3>留白式扩容，紧凑型空间多彩点睛</h3>
				<p>以柜架系统为全屋线索，紧凑尺寸、大面积留白，为紧凑型空间富余出多样性的软装搭配可能，在全屋明亮底色上，设计师选取自然色彩系统中最具点睛力的亮色单品，创造清亮甜美的紧凑户型风格。</p>
                <p>舒适，是大多数人对家的第一定义，然而在满足这一点的同时，我们往往希望还有不同甚至对撞的元素加以点缀丰富，赋予空间独特的味道和情趣。温润原木，是打造自然舒适的关键元素，黄铜金属，是精致摩登的最佳体现，当这两种相差甚远的材质融合到一起，会产生意想不到的化学反应。</p>          
				<p>暗苔绿色的Sofa-T无疑是客厅的主角，散发出摩登的文艺气息，拥有细腻木纹的花间小桌点缀一旁，给人自然纯粹的视觉感受。</p>-->
				<!--<div class="goSelect">配套您的户型 <img src="/static/img/rightArrow.png" alt="箭头"/></div>-->
			</div>
		</div>
		
		<div class="location" :style="'height:'+screenHeight+'px;background: url('+selectLocation[selectLocationIndex].coverPic+') no-repeat center center;'" v-if="selectLocation.length">
			<div class="left">
				<div class="box">
					<ul :style="'height:'+(locationList.length*1.52+0.76)+'rem'">
						<li v-for="(item,index) in locationList" :key='index' @click="selectLocationFun(index)">
							<img :src="item.templateInfo[0].coverPic" :alt="'空间'+(index+1)" />
							<div class="locationName" v-show="locationIndex!=index">{{ item.areaTypeName }}</div>
						</li>
					</ul>
				</div>
				<div class="open" @click="closeList(true)"><img src="/static/img/left.png" alt="左箭头"/>收起</div>
			</div>
			<div class="close" v-show="!openFlag" @click="closeList(false)"><div class="closeBox"><p>房间</p><img src="/static/img/right.png" alt="右箭头" /></div></div>
			<!--上下切换-->
			<div class="topBtn prevBtn" @click="scrollTop(false)" v-show="topShow && locationList.length>Math.floor((screenHeight/100)/1.52)">
	  			<img src="/static/img/left.png" />
	  		</div>
	  		<div class="bottomBtn nextBtn" @click="scrollTop(true)" v-show="topShow && locationList.length>Math.floor((screenHeight/100)/1.52)">
	  			<img src="/static/img/right.png" />
	  		</div>
	  		
	  		<!--左右切换-->
			<div class="location_preBtn" @click="changePic(false)" v-if="selectLocation.length>1">
	  			<img src="/static/img/left.png" />
	  		</div>
	  		<div class="location_nextBtn" @click="changePic(true)" v-if="selectLocation.length>1">
	  			<img src="/static/img/right.png" />
	  		</div>
	  		
	  		<div class="locationInfo">
	  			<p>{{ designInfo.designName }} | {{ selectLocation[selectLocationIndex].areaTypeName }}</p>
	  			<p>{{ selectLocation[selectLocationIndex].details }}</p>
	  		</div>
		</div>
		
		<!--商品-->
		<div class="goodsInfo" v-if="goodsInfoList.length>0">
			<h1>{{ designInfo.designName }}</h1>
			<!--<h2>基础套餐</h2>-->
			<div class="goodsList">
				<ul>
					<li v-for="(item,index) in goodsInfoList">
						<img :src="item.goodsImages" :alt="'商品'+(index+1)"/>
						<i class="plus">+</i>
						<div class="name">{{ item.goodsName }}</div>
						<div class="num">*{{ item.goodsNum }}</div>
					</li>
					<div class="more">...</div>
					<div class="clear"></div>
				</ul>
				<div class="priceInfo">
					<div class="price" v-show="designInfo.packagePrice">
						<span style="font-size: 0.17rem;">￥</span>{{ designInfo.packagePrice }} <span style="font-size: 0.17rem;">起</span>
					</div>
					<div class="price" v-show="!designInfo.packagePrice">
						<span style="font-size: 0.17rem;">暂无参考价</span>
					</div>
					<div class="more" @click="goDown">详细清单</div>
				</div>
				<div class="clear"></div>
			</div>
		</div>
		
		<!--更多风格-->
		<div class="styleMore" v-if="styleList.length">
			<h3>
				<p>“好的居住，从房子钥匙交付开始便已启动旅程。我们搜罗城市楼盘典</p>
				<p>型户型，以全球设计作品，提供全屋房间解决方案。”</p>
			</h3>
			<div class="line"></div>
			
			<h2>更多风格可选</h2>
			
			<div class="styleList">
				<div class="list">
					<div class="box">
						<ul :style="'width:'+styleList.length*3.35+'rem'">
							<li v-for="(item,index) in styleList" :key="index" :class="index==selectStyle?'active':''" @mouseover="selectStyle=index" @click="changeStyle(item)">
								<img :src="item.coverPic" :alt="item.styleName"/>
								<div class="name">{{ item.styleName }}</div>
								<div class="des">{{ item.details }}</div>
							</li>
							<div class="clear"></div>
						</ul>
					</div>
				</div>
				
				<!--左右切换-->
				<div class="prevBtn" @click="scrollLeft(true)">
	  				<img src="/static/img/left.png"/>
	  			</div>
	  			<div class="nextBtn" @click="scrollLeft(false)">
	  				<img src="/static/img/right.png"/>
	  			</div>
			</div>
		</div>
	</div>
</template>

<script>
//引入底部子组件
import Top from '../layout/top'

export default {
	name: 'programme',
	props:['screenHeight'],
	data(){
		return{
			code:'',//code值
			houseId:'',//楼盘ID
			houseModel:'',//户型
			styleName:'',//风格名称
			designInfo:'',//方案详情
			openFlag:true,
			topShow:true,
			introduce:{
				bgImg:'',
				p1:'',
				p2:'',
				p3:''
			},
			locationList:[],
			locationIndex:0,//当前选中的空间
			selectLocationIndex:0,
			selectLocation:[],
			goodsInfoList:[],//商品列表
			styleList:[],//更多风格
			selectStyle:0,//选中风格
		}
	},
	mounted(){
		if(this.$route.params.code){
			this.code=Base64.decode(this.$route.params.code);
			if(!this.code){
				window.history.go(-1);
				return;
			}
			let arr=this.code.split(',');
			this.houseId=arr[0];
			this.houseModel=arr[1];
			this.styleName=arr[2];
			//获取面积户型列表
			getDesignInfo(this);
		}else{
			window.history.go(-1);
		}
		//console.log(arr)
	},
	methods:{
		//选择空间
		selectLocationFun(index){
			this.locationIndex=index;
			let list=this.locationList[index].templateInfo;
			for(let i=0;i<list.length;i++){
				if(list[i].details.length>50){
					list[i].details=list[i].details.substring(0,50);
				}
			}
			this.selectLocation=list;
			this.selectLocationIndex=0;
		},
		//滚动
		scrollTop(flag){
			if(flag){
				let top=$('.location .box').scrollTop();
				$('.location .box').scrollTop(top+100);
			}else{
				let top=$('.location .box').scrollTop();
				$('.location .box').scrollTop(top-100);
			}
		},
		//横向滚动
		scrollLeft(flag){
			if(flag){
				let left=$('.styleList .box').scrollLeft();
				$('.styleList .box').scrollLeft(left+100);
			}else{
				let left=$('.styleList .box').scrollLeft();
				$('.styleList .box').scrollLeft(left-100);
			}
		},
		//切换图片
		changePic(flag){
			let len=this.selectLocation.length;
			if(len==0 || len==1){
				return;
			}
			if(flag){
				let num=this.selectLocationIndex;
				num+=1;
				if(num>len-1){
					this.selectLocationIndex=0;
				}else{					
					this.selectLocationIndex=num;
				}
			}else{
				let num=this.selectLocationIndex;
				if(num==0){
					this.selectLocationIndex=len-1;
				}else{
					num-=1;
					this.selectLocationIndex=num;
				}
			}
		},
		//跳转3d图
		goThreeD(){
			window.open(this.designInfo.threeDurl);
			//window.location.href=this.designInfo.threeDurl;
		},
		//收起列表
		closeList(flag){
			let that=this;
			let deviceWidth = document.documentElement.clientWidth >1920 ? 1920 : document.documentElement.clientWidth < 1024 ? 1024 : document.documentElement.clientWidth
			let left=deviceWidth/13.66*2.28;
			if(flag){
				this.topShow=false;
				$('.location .left').animate({left:-left},2000,function(){
					that.openFlag=false;
				})
			}else{
				this.openFlag=true;
				$('.location .left').animate({left:0},2000,function(){
					that.topShow=true;
				})
			}
		},
		//选择风格
		changeStyle(obj){
			//console.log(obj)
			let designCode=obj.houseId+','+obj.houseModel+','+obj.styleName
			let code=Base64.encode(designCode);
			this.$router.push({path:'/programme/'+code})
			window.location.reload();
		},
		//下载页面
		goDown(){
			this.$router.push({path:'/download'})
		}
	},
	watch:{
		'$store.state.city': function () {
      		this.$router.push({path:'/floor'})
    	}
	},
	components:{'v-top':Top}
}
//获取方案详情
function getDesignInfo(obj){
	var data={
      	//city:obj.$store.state.city, //城市
		houseId:obj.houseId,
		houseModel:obj.houseModel,
		styleName:obj.styleName
    }; 
	obj.$ajax(obj.$store.state.localIP+'queryHouseDesignList','post',data,function(res){
		console.log(res)
		obj.designInfo=res.data[0];
		obj.introduce.bgImg=res.data[0].coverPic;
		obj.introduce.p2=res.data[0].designName;
		if(res.data[0].details.length>50){
			obj.introduce.p3=res.data[0].details.substring(0,50);
		}else{
			obj.introduce.p3=res.data[0].details;
		}
		if(res.data[0].templates){			
			obj.locationList=res.data[0].templates;
			if(res.data[0].templates.length>0){
				let list=res.data[0].templates[0].templateInfo ||[];
				for(let i=0;i<list.length;i++){
					if(list[i].details.length>50){
						list[i].details=list[i].details.substring(0,50);
					}
				}
				obj.selectLocation=list;
			}			
		}
		obj.designInfo.styleList.map(v=>{
			return v.details=v.details.replace(/[\s\r\n]/g,"");
		})
		obj.styleList=obj.designInfo.styleList || [];
		
		//获取商品
		getGoodList(obj)
	})
}
//获取商品列表
function getGoodList(obj){
	//console.log(obj.designInfo)
	obj.$ajax(obj.$store.state.localIP+'queryDesignGoodsList','GET',{designId:obj.designInfo.designId},function(res){
		//console.log(res)
		let arr=[];
		let list=res.goodsInfoList || [];
		for(let i=0;i<list.length;i++){
			if(list[i].goodsTypeList){
				let goodsTypeList=list[i].goodsTypeList;
				for(let j=0;j<goodsTypeList.length;j++){
					if(goodsTypeList[j].goodsInfos){
						let goodsInfos=goodsTypeList[j].goodsInfos;
						for(let x=0;x<goodsInfos.length;x++){
							if(arr.length<4){	
								if(goodsInfos[x].goodsImages.indexOf(',')>0){
									goodsInfos[x].goodsImages=goodsInfos[x].goodsImages.split(',')[0]
								}
								arr.push(goodsInfos[x]);
							}
						}
					}
				}
			}
		}
		//console.log(arr)
		obj.goodsInfoList=arr;
	})
}
</script>

<style scoped="scoped">
.goThreeD{
	width:1.28rem;
	height:0.7rem;
	box-shadow:0px 4px 23px 0px rgba(79,93,80,0.23);
	line-height: 0.7rem;
	padding-left: 0.6rem;
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%,-50%);
	color: #ffffff;
	font-size: 0.3rem;
	border-radius: 0.38rem;
	border: 3px solid #ffffff;
	cursor: pointer;
	z-index: 10;
}
.goThreeD::after{
    position: absolute;
    top: 0.25rem;
    right: 0.6rem;
    content:'';
    font-size: 0;  
    line-height: 0;  
    border-width: 0.1rem;  
    border-color: #ffffff;  
    border-right-width: 0;  
    border-style: dashed;  
    border-left-style: solid;  
    border-top-color: transparent;  
    border-bottom-color: transparent;
}
.info{
	width: 100%;
	height:7.02rem;
	position: relative;
	background:rgba(245,247,248,1);
}
.info .top{
	width: 10.62rem;
	height: 7.02rem;
	position: absolute;
	background: #ffffff;
	top: -0.76rem;
	left: 50%;
	transform: translateX(-50%);
	padding: 0.76rem;
	box-sizing: border-box;
	z-index: 30;
}
.top h1{
	font-size:0.23rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
}
.top h2{
	font-size:0.38rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:#444444;
	margin-top: 0.1rem;
}
.top h2 span{
	color: #7E8C7F;
}
.top h3{
	font-family:MicrosoftYaHei-Bold;
	font-weight: bold;
	font-size: 0.17rem;
	margin-top: 0.72rem;
}
.top p{
	font-size:0.15rem;
	font-family:MicrosoftYaHeiLight;
	color:rgba(68,68,68,1);
	line-height: 200%;
	margin-top: 0.2rem;
}
.goSelect{
	position: absolute;
	width:3.04rem;
	height:0.66rem;
	border:3px solid rgba(68,68,68,1);
	padding-left: 0.57rem;
	line-height: 0.6rem;
	box-sizing: border-box;
	font-size:0.17rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	bottom: 0.76rem;
	left: 0.76rem;
	/*margin-top: 0.7rem;*/
}
.goSelect img{
	position:absolute;
	right: 0.58rem;
	top: 0.28rem;
	width:0.55rem;
	height:0.06rem;
	display: block;
}
.location{
	width: 100%;
	overflow: hidden;
	position: relative;
}
.location .left{
	width: 2.28rem;
	height: 100%;
	border-right: 1px solid rgba(255,255,255,0.7);
	overflow: hidden;
	position:relative;
}
.location .box{
	width:calc(100% + 20px) !important;
	height: 100%;
	overflow-x: hidden;
	overflow-y: auto;
	position: relative;
}
.location .open{
	width:2.28rem;
	height:0.76rem;
	background:rgba(0,0,0,0.6);
	position: absolute;
	bottom: 0rem;
	left: 0rem;
	line-height: 0.76rem;
	font-size:0.17rem;
	text-align: right;
	padding-right: 0.44rem;
	box-sizing: border-box;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(255,255,255,1);
	cursor: pointer;
}
.location .open img{
	width:0.11rem;
	height:0.21rem;
	position: absolute;
	right: 1rem;
	top: 0.275rem;
}
.location .close{
	position: absolute;
	width:0.76rem;
	height:1.52rem;
	z-index: 30;
	top: 50%;
	transform: translateY(-50%);
	left:0rem;
	overflow: hidden;
	cursor: pointer;
}
.location .closeBox{
	position: absolute;
	top: 0rem;
	left: -0.76rem;
	width:1.52rem;
	height:1.52rem;
	background:rgba(0,0,0,0.8);
	box-shadow:0px 5px 26px 0px rgba(0, 0, 0, 0.45);
	border-radius:50%;
	color: #ffffff;
	font-size: 0.2rem;
	box-sizing: border-box;
}
.location .closeBox p{
	top: 0.52rem;
	left:0.9rem;
	position: absolute;
	width: 0.22rem;
	text-align: center;
}
.location .closeBox img{
	position: absolute;
	width:0.11rem;
	height:0.21rem;
	top: 0.655rem;
	right: 0.1rem;
}
.location{
	background-size:100% auto !important;
}
.location li{
	width:2.28rem;
	height:1.52rem;
	position: relative;
	cursor: pointer;
}
.location li img{
	display: block;
	width:2.28rem;
	height:1.52rem;
}
.location li .locationName{
	position: absolute;
	top: 0rem;
	left: 0rem;
	width:2.28rem;
	height:1.52rem;
	text-align: center;
	line-height: 1.52rem;
	background: rgba(0,0,0,0.5);
	font-size:0.19rem;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(255,255,255,1);
}
.goodsInfo{
	width:100%;
	height:7.6rem;
	background:rgba(245,247,248,1);
	padding-top: 0.78rem;
	box-sizing: border-box;
}
.goodsInfo h1{
	font-size:0.28rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:#444444;
	text-align: center;
}
.goodsInfo h1 span{
	color:rgba(126,140,127,1);
}
.goodsInfo h2{
	font-size:0.23rem;
	text-align: center;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(68,68,68,1);
	margin-top: 0.1rem;
}
.goodsList{
	margin: 0 auto;
	margin-top: 0.75rem;
	width: 12.14rem;
	height: 3.41rem;
	background:rgba(255,255,255,1);
	padding: 0.7rem 0.38rem;
	box-sizing: border-box;
}
.goodsList ul li{
	float: left;;
	width: 2rem;
	height: auto;
	position: relative;
}
.goodsList ul li img{
	display: block;
	width: 1.52rem;
	height: 1.17rem;
}
.goodsList ul li .plus{
	position: absolute;
	right: 0.12rem;
	font-size:0.23rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	top: 0.56rem;
}
.goodsList ul li .name{
	width: 1.52rem;
	text-align: center;
	font-size:0.17rem;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(68,68,68,1);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-top: 0.3rem;
}
.goodsList ul li .num{
	width: 1.52rem;
	text-align: center;
	font-size:0.17rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	margin-top: 0.2rem;
}
.goodsList ul{
	position: relative;
	float: left;
}
.goodsList ul .more{
	float: left;
	font-size:0.46rem;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(68,68,68,1);
	width: 0.6rem;
	height:2.2rem;
	line-height: 1.17rem;
	border-right: 1px solid rgba(220,220,220,1);
}
.priceInfo{
	float: left;
	width: 2.27rem;
	height: 2.2rem;
}
.priceInfo .price{
	width: 100%;
	text-align: center;
	font-size:0.23rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(187,115,111,1);
	margin-top: 0.1rem;
}
.priceInfo  .more{
	width:1.14rem;
	height:0.47rem;
	text-align: center;
	line-height: 0.47rem;
	margin: 0 auto;
	border:3px solid rgba(68,68,68,1);
	margin-top: 1.1rem;
	font-size:0.17rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	cursor: pointer;
}
.styleMore{
	width: 100%;
	height: 10.3rem;
	background:rgba(255,255,255,1);
	padding-top: 1.5rem;
}
.styleMore h3{
	text-align: center;
	font-size:0.23rem;
	font-family:MicrosoftYaHeiLight;
	font-weight:300;
	color:rgba(68,68,68,1);
	line-height:51px;
}
.line{
	margin: 0 auto;
	margin-top: 0.95rem;
	width:3px;
	height:0.47rem;
	background:rgba(68,68,68,1);
}
.styleMore h2{
	text-align: center;
	margin-top: 0.88rem;
	font-size:0.23rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
}
.styleList{
	width: 100%;
	position: relative;
	padding: 0.76rem;
	box-sizing: border-box;
	height: 4.6rem;
	overflow: hidden;
}
.styleList .list{
	width: 100%;
	height: 100%;
	overflow: hidden;
	position: relative;
}
.styleList .box{
	width: 100%;
	height:100%;
	padding-bottom: 20px;
	overflow-x: auto;
	overflow-y: hidden;
	position: relative;
}
.styleList ul{
	position: absolute;
	width: 100%;
	top: 0rem;
	left: 0rem;
}
.styleList li{
	float: left;
	width: 2.65rem;
	height: 3.04rem;
	background:rgba(255,255,255,1);
	margin-right: 0.7rem;
	padding: 0.18rem;
	box-sizing: border-box;
	cursor: pointer;
}
.styleList li.active{
	box-shadow:0px 5px 20px 0px rgba(40,52,51,0.27);
}
.styleList img{
	display: block;
	width: 100%;
	height: 1.9rem;
}
.styleList .name{
	width: 100%;
	font-size:0.17rem;
	margin-top: 0.2rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
}
.styleList .des{
	width: 100%;
	font-size:0.13rem;
	font-family:MicrosoftYaHeiLight;
	font-weight:300;
	color:rgba(68,68,68,1);
	line-height:23px;
	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	margin-top: 0.1rem;
}

.prevBtn{
	position: absolute;
	bottom:1.52rem;
	left: 0rem;
	width: 0.76rem;
	height: 0.76rem;
	background:rgba(0,0,0,0.6);
	z-index: 30;
	cursor: pointer;
}

.prevBtn img{
	position: absolute;
	width: 0.11rem;
	height: 0.21rem;
	top: 0.275rem;
	left: 0.325rem;
}
.nextBtn{
	position: absolute;
	bottom: 1.52rem;
	right: 0rem;
	width: 0.76rem;
	height: 0.76rem;
	background:rgba(126,140,127,1);
	z-index: 30;
	cursor: pointer;
}
.nextBtn img{
	position: absolute;
	width: 0.11rem;
	height: 0.21rem;
	top: 0.275rem;
	left: 0.325rem;
}
.topBtn{
	top: 0rem;
	left:2.28rem;
	transform:rotate(90deg);
}
.bottomBtn{
	top: 0.76rem;
	left:2.28rem;
	transform:rotate(90deg);
}
.location_preBtn{
	position: absolute;
	bottom:0rem;
	right: 0.76rem;
	width: 0.76rem;
	height: 0.76rem;
	background:rgba(0,0,0,0.6);
	z-index: 30;
	cursor: pointer;
}
.location_preBtn img{
	position: absolute;
	width: 0.11rem;
	height: 0.21rem;
	top: 0.275rem;
	left: 0.325rem;
}

.location_nextBtn{
	position: absolute;
	bottom: 0rem;
	right: 0rem;
	width: 0.76rem;
	height: 0.76rem;
	background:rgba(126,140,127,1);
	z-index: 30;
	cursor: pointer;
}
.location_nextBtn img{
	position: absolute;
	width: 0.11rem;
	height: 0.21rem;
	top: 0.275rem;
	left: 0.325rem;
}
.locationInfo {
	position: absolute;
	left: 2.4rem;
	bottom: 1.35rem;
	width: 7.33rem;
	word-break: break-all;
	font-size:0.46rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(255,255,255,1);
	z-index: 30;
}
.locationInfo p:last-child{
	font-size: 0.23rem;
	font-weight:500;
	line-height: 150%;
	font-family:MicrosoftYaHei;
	color:rgba(255,255,255,1);
	margin-top: 0.2rem;
}
</style>