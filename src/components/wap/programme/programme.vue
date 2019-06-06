<template>
	<div class="wapProgramme">
		<div class="top" :style="'background:url('+introduce.bgImg+') no-repeat center bottom;'">
			<div class="goThreeD" @click="goThreeD">3D</div>
		</div>
		
		<div class="programme">
			<div class="info">
				<h1>全屋设计套装</h1>
				<h2>{{ designInfo.designName }}</h2>
				<p>{{ designInfo.details }}</p>
			</div>
		</div>
		
		<div class="location" v-if="locationList.length">
			<div class="location_container swiper-container">
			    <div class="swiper-wrapper">
			        <div :class="locationIndex==index?'active swiper-slide':'swiper-slide'" v-for="(item,index) in locationList" :key='index' >{{ item.areaTypeName }}</div>
			    </div>
			</div>
		</div>
		
		<div class="locationInfo" v-if="locationList.length">
			<div class="locationInfo_container swiper-container" :style="'height:'+selectLocation.length*10+'rem'">
			    <div class="swiper-wrapper" :style="'height:'+selectLocation.length*10+'rem'">
			        <div class="swiper-slide" v-for="(item,index) in locationList" :key='index' :style="'height:'+selectLocation.length*10+'rem'">
			        	<div class="item" v-for="(childrenItem,childrenIndex) in item.templateInfo" :key='childrenItem.areaTypeId'>			        		
			        		<div class="locationImg" :style="'background: url('+childrenItem.coverPic+') no-repeat center center;'" v-if="childrenItem.coverPic"></div>
			        		<div class="dec">
			        			<div class="decBox">
			        				<h1>{{ designInfo.designName }} | {{ childrenItem.areaTypeName }}</h1>
			        				<div class="introduce">{{ childrenItem.details }}</div>
			        			</div>
			        		</div>
			        	</div>
			        </div>
			    </div>
			    <!--<div class="swiper-pagination"></div>-->
			</div>
		</div>
		
		<!--商品列表-->
		<div class="goodsListBox" v-if="goodsInfoList.length">
			<h1>{{ designInfo.designName }}</h1>
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
			</div>
			<div class="priceInfo">
				<div class="price" v-show="designInfo.packagePrice">
					<span style="font-size: 0.17rem;">￥</span>{{ designInfo.packagePrice }} <span style="font-size: 0.17rem;">起</span>
				</div>
				<div class="price" v-show="!designInfo.packagePrice">
					<span style="font-size: 0.17rem;">暂无参考价</span>
				</div>
				<div class="more" @click="goDown">详细清单</div>
			</div>
		</div>
		
		<!--更多风格-->
		<div class="mordStyle" v-if="styleList.length">
			<h3>“好的居住，从房子钥匙交付开始便已启动旅程。我们搜罗城市楼盘典型户型，以全球设计作品，提供全屋房间解决方案。”</h3>
			<div class="styleLine"></div>
			<h1>更多风格可选</h1>
			
			<div class="style_swipper swiper-container">
				<div class="swiper-wrapper">
					<div class="swiper-slide" v-for="(item,key) in styleList" :key="key"  @click="changeStyle(item)">
						<img :src="item.coverPic" :alt="item.styleName"/>
						<div class="name">{{ item.styleName }}</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'wapProgramme',
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
			//跳转3d图
			goThreeD(){
				window.open(this.designInfo.threeDurl);
				//window.location.href=this.designInfo.threeDurl;
			},
			
			//选择风格
			changeStyle(obj){
				//console.log(obj)
				let designCode=obj.houseId+','+obj.houseModel+','+obj.styleName
				let code=Base64.encode(designCode);
				this.$router.push({path:'/wap/programme/'+code})
				window.location.reload();
			},
			//下载页面
			goDown(){
				this.$com.openAPP();
			}
  		},
  		updated(){
  			if(this.locationList.length){
  				let that=this;
	  			let locationSwiper=new Swiper('.location_container',{
					slidesPerView: 'auto',
					observer: true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents: true//修改swiper的父元素时，自动初始化swiper
				});
				
				let locationInfoSwiper=new Swiper('.locationInfo_container',{
					pagination : '.swiper-pagination',
					observer: true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents: true//修改swiper的父元素时，自动初始化swiper
				});
				//监听点击
				locationSwiper.on('tap',function(swiper){
					that.locationIndex=swiper.clickedIndex;
					that.selectLocation=that.locationList[swiper.clickedIndex].templateInfo;
				    locationInfoSwiper.slideTo(swiper.clickedIndex, 1000, false);//切换到第一个slide，速度为1秒
				})
				//监听滑动
				locationInfoSwiper.on('slideChangeEnd',function(swiper){
					that.locationIndex=swiper.activeIndex;
					that.selectLocation=that.locationList[swiper.activeIndex].templateInfo;
					locationSwiper.slideTo(swiper.activeIndex, 1000, false);//切换到第一个slide，速度为1秒
				})
  			}
  			if(this.styleList.length){
  				//风格
				new Swiper('.style_swipper',{
					slidesPerView: 'auto',
					spaceBetween: 20,
					observer: true,//修改swiper自己或子元素时，自动初始化swiper
					observeParents: true//修改swiper的父元素时，自动初始化swiper
				});
  			}
  		}
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
							if(arr.length<5){								
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
	.wapProgramme{
		width: 100%;
		background:rgba(245,247,248,1);
	}
	.top{
		width: 100%;
		height: 5.4rem;
		border-radius:0px 0px 20px 20px;
		background-size:auto 100% !important;
		position: relative;
	}
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
	.programme{
		width: 100%;
		position: relative;
		height: 6rem;
	}
	.info{
		width: 90%;
		left: 5%;
		position: absolute;
		top: -0.8rem;
		background: #ffffff;
		padding: 0.5rem;
		border-radius:20px;
		box-sizing: border-box;
		height: 6rem;
		word-break: break-all;
	}
	.info h1{
		height: 0.3rem;
		line-height: 0.3rem;
		font-size:0.26rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.info h2{
		height: 0.5rem;
		line-height: 0.5rem;
		font-size:0.4rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:#444444;
		margin-top: 0.2rem;
	}
	.info p{
		font-size:0.26rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		line-height: 150%;
		color: #444444;
		margin-top: 0.5rem;
	}
	.location{
		width: 90%;
		margin-left: 5%;
		position: relative;
	}
	.location:after{
		content: '';
		background:linear-gradient(to right, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.4)  100%);
		position: absolute;
		top: 0rem;
		right: 0rem;
		width: 0.6rem;
		height: 0.6rem;
	}
	.swiper-container{
		width: 100%;
		height: 0.6rem;
	}
	.swiper-slide{
		width: 20%;
		height: 0.6rem;
		text-align: center;
		font-size:0.3rem;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(116,116,116,1);
		line-height: 0.6rem;
	}
	.swiper-slide.active{
		font-size:0.48rem;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(25,25,25,1);
	}
	.locationInfo{
		width: 100%;
		padding-top: 0.4rem;
		position: relative;
	}
	.locationInfo_container{
		width: 100%;
		height: 10rem;
	}
	.locationInfo_container .item{
		width: 100%;
		margin-top: 0.3rem;
	}
	.locationInfo_container .item .locationImg{
		background-size:auto 100% !important;
		height: 4.5rem;
	}
	.locationInfo_container .item  .dec{
		width: 100%;
		height: 5rem;
		position: relative;
	}
	.decBox{
		position: absolute;
		top: -0.8rem;
		width: 90%;
		padding: 0.4rem;
		box-sizing: border-box;
		left: 5%;
		background: #ffffff;
		border-radius:20px;
		height: 5rem;
		text-align: left;
	}
	.decBox h1{
		font-size:0.26rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.decBox .introduce{
		font-size: 0.26rem;
		line-height: 150%;
		margin-top: 0.3rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:400;
		color:rgba(68,68,68,1);
		word-break: break-all;
	}
	.goodsListBox{
		width: 100%;
		height: auto;
		padding-bottom: 0.3rem;
	}
	.goodsListBox h1{
		font-size:0.3rem;
		text-align: center;
		height: 0.5rem;
		line-height: 0.5rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:#444444;
	}
	.goodsList{
		margin: 0 auto;
		margin-top: 0.75rem;
		width: 6.7rem;
		height:auto;
		background:rgba(255,255,255,1);
		padding: 0.6rem 0.3rem;
		box-sizing: border-box;
	}
	.goodsList ul li{
		float: left;;
		width: 1.9rem;
		height: auto;
		position: relative;
	}
	.goodsList ul li img{
		display: block;
		width: 1.6rem;
		height: 1.23rem;
	}
	.goodsList ul li .plus{
		position: absolute;
		right: 0rem;
		font-size:0.23rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
		top: 0.56rem;
	}
	.goodsList ul li .name{
		width: 1.6rem;
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
		width: 1.6rem;
		text-align: center;
		font-size:0.17rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
		margin-top: 0.2rem;
	}
	.goodsList ul .more{
		float: left;
		font-size:0.46rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(68,68,68,1);
		width: 1.2rem;
		height:2.2rem;
		text-align: center;
		letter-spacing: 3px;
		line-height: 1.17rem;
	}
	.goodsList ul{
		padding-bottom:0.5rem ;
		border-bottom: 1px solid #DCDCDC;
	}
	.priceInfo{
		width: 100%;
		text-align: center;
		padding-top: 0.3rem;
		background: #ffffff;
		width: 6.7rem;
		margin:0 auto;
		height: 2.2rem;
	}
	.priceInfo .price{
		text-align: center;
		font-size:0.36rem;
		height: 0.4;
		line-height: 0.4rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(187,115,111,1);
	}
	.priceInfo .more{
		display: inline-block;
		width:1.6rem;
		height:0.6rem;
		letter-spacing: 2px;
		text-align: center;
		line-height: 0.6rem;
		font-size:0.3rem;
		margin-top: 0.3rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
		border:3px solid rgba(68,68,68,1);
	}
	.mordStyle h3{
		width: 6.5rem;
		margin: 0 auto;
		margin-top: 0.5rem;
		line-height: 150%;
		font-size:0.24rem;
		text-align: center;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(68,68,68,1);
	}
	.styleLine{
		width:3px;
		height:0.5rem;
		background:rgba(68,68,68,1);
		margin: 0 auto;
		margin-top:0.3rem;
	}
	.mordStyle h1{
		font-size:0.28rem;
		height: 0.4rem;
		line-height: 0.4rem;
		margin-top: 0.3rem;
		text-align: center;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.style_swipper{
		margin-top: 0.3rem;
		width: 100%;
		height: 3.6rem;
		padding-left: 0.2rem;
		box-sizing: border-box;
		padding-left: 0.5rem;
	}
	.style_swipper .swiper-slide{
		background-size:100% auto !important;
		border-radius:20px;
		width: 3.6rem;
	}
	.style_swipper img{
		display: block;
		width: 100%;
		height: 2.4rem;
		border-radius:10px;
	}
	.style_swipper .name{
		width: 100%;
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size:0.26rem;
		height: 0.3rem;
		line-height: 0.3rem;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(25,25,25,1);
		margin-top: 0.3rem;
	}
</style>