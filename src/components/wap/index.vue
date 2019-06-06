<template>
	<div class="index">
		<!--banner-->
		<div class="banner_swipper swiper-container">
			<div class="swiper-wrapper">
				<div class="swiper-slide" v-for="(item,key) in bannerList" :key="key" :style="'background:url('+item.bannerImg+') no-repeat center bottom;'">
				</div>
			</div>
			<!--左侧文字-->
			<div class="bannerFont">
				<p>STAY HOME.</p>
				<p>打造年轻人的生活空间</p>
			</div>
		</div>
		
		<!--风格派-->
		<div class="stylePai">
			<div class="styleLine"></div>
			<router-link to="/wap/stylePai">
				<div class="title">
					<h1><span>风格派</span></h1>
					<h2>STYLE</h2>
				</div>
			</router-link>
			
			<!--时尚网红-与众不同-->
			<div class="stylePaiItem internetCelebrity" :style="'background:url('+internetCelebrity.coverPic+') no-repeat center center;'" @click="goProgramme(internetCelebrity.uuid)">
				<div class="dec">
					<h1><span>时尚网红</span> | {{ internetCelebrity.designName }}</h1>
					<h2>{{ internetCelebrity.details }}</h2>
				</div>
			</div>
			
			<!--与众不同-->
			<div class="stylePaiItem unusual" @click="goProgramme(internetCelebrity.uuid)" :style="'background:url('+unusual.coverPic+') no-repeat center center;'">
				<div class="dec">
					<h1><span>与众不同</span> | {{ unusual.designName }}</h1>
					<h2>{{ unusual.details }}</h2>
				</div>
			</div>
			
			<div class="classicStyleLine"></div>
			<div class="classicStyle">
				<h1>经典风格</h1>
				<div class="classicStyle_swipper swiper-container" v-if="classicStyleList.length">
					<div class="swiper-wrapper">
						<div class="swiper-slide"  v-for="(item,key) in classicStyleList" @click="goProgramme(item.uuid)" :key="key" :style="'background:url('+item.coverPic+') no-repeat center bottom;'">
							<div class="dec">
								<h1>{{ item.designName }}</h1>
								<h2>{{ item.details }}</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<!--楼盘-->
			<div class="floorLine"></div>
			<div class="floor">
				<router-link to="/wap/floor">
					<div class="title">
						<h1><span>楼盘</span></h1>
						<h2>户型定制</h2>
					</div>
				</router-link>
				
				<div class="dec">定制定居因为可以量身定制，深受人们追捧，可以说现在每个家庭在装修时，基本都会选择定制家居，因为它足够灵活。</div>
			
				<div class="floor_swipper swiper-container" v-if="houseList.length">
					<div class="swiper-wrapper">
						<div class="swiper-slide" @click="goHouse(item.houseId)" v-for="(item,key) in houseList" :key="key" :style="'background:url('+item.coverPic+') no-repeat center bottom;'">
							<div class="dec">
								<h1>{{ item.houseName }}</h1>
								<h2>{{ item.address }}</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<!--好物-->
			<div class="goodThingLine"></div>
			<div class="goodThing">
				<router-link to="/wap/goodsThing">
					<div class="title">
						<h1><span>好物</span></h1>
					</div>
				</router-link>
				
				<div class="goodsThing_swipper swiper-container" v-if="goodsList.length">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(item,key) in goodsList" @click="goInfo(item.uuid)" :key="key" :style="'background:url('+item.goodsImg+') no-repeat center bottom;'">
							<div class="dec">
								<h1>{{ item.goodsName }}</h1>
								<h2>{{ item.subtitle }}</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		
		<v-right></v-right>
	</div>
</template>

<script>
	import rightFlex from '@/components/wap/layout/customerService'
	export default {
  		name: 'index',
  		data(){
  			return{
  				bannerList:[
  					{bannerImg:'http://images.wojiali.cn/Fma7qRww1Y73JDl5vrPgBeS47OJo'}
  				],//banner图列表
  				unusual:{},//与众不同
		      	internetCelebrity:{},//时尚网红
		      	classicStyleList:[],//经典风格列表
		      	houseList:[],//楼盘列表
		      	goodsList:[]//好物列表
  			}
  		},
  		mounted(){
  			let that=this;
  			new Swiper ('.banner_swipper', {
			    loop: true // 循环模式选项
			}) 
			
			//获取与众不同信息
			getStylePai(this,'unusual',function(res){
				if(res.length>0){
					if(res[0].details.length>50){
						res[0].details=res[0].details.substring(0,50)+'...';
						res[0].details=res[0].details.replace(/[\s\r\n]/g,"");
					}
				}
				that.unusual=res[0] || {};
			})
			//获取时尚网红信息
			getStylePai(this,'internetCelebrity',function(res){
				if(res.length>0){
					if(res[0].details.length>50){
						res[0].details=res[0].details.substring(0,50)+'...';
						res[0].details=res[0].details.replace(/[\s\r\n]/g,"");
					}
				}
				that.internetCelebrity=res[0] || {};
			})
			//获取经典风格信息
			getStylePai(this,'classicStyle',function(res){
				for(let i=0;i<res.length;i++){
					if(res[i].details){
						if(res[i].details.length>50){
							res[i].details=res[i].details.substring(0,50)+'...';
							res[0].details=res[0].details.replace(/[\s\r\n]/g,"");
						}
					}
				}
				that.classicStyleList=res;
				
			})
			//获取楼盘列表
			getHouseList(this,function(res){
				//console.log(res.houseInfo)
				that.houseList=res.houseInfo||[];
			});
			//获取好物
			getGoodsList(this);
  		},
  		methods:{
  			//跳转详情页面
			goProgramme(uuid){
				let code=Base64.encode(uuid);
				this.$router.push({path:'/wap/stylePai/info/'+code})
			},
			//跳转楼盘列表
			goHouse(houseId){
				let code=Base64.encode(houseId);
				this.$router.push({path:'/wap/house/'+code})
			},
			//跳转详情列表
			goInfo(uuid){
				let code=Base64.encode(uuid);
				this.$router.push({path:'/wap/goods/info/'+code})
			}
  		},
  		components:{'v-right':rightFlex},
  		updated(){
  			new Swiper('.classicStyle_swipper',{
				slidesPerView: 'auto',
				spaceBetween: 20,
				observer: true,//修改swiper自己或子元素时，自动初始化swiper
				observeParents: true//修改swiper的父元素时，自动初始化swiper
			});
			new Swiper('.floor_swipper',{
				slidesPerView: 'auto',
				spaceBetween: 20,
				observer: true,//修改swiper自己或子元素时，自动初始化swiper
				observeParents: true//修改swiper的父元素时，自动初始化swiper
			});
			new Swiper('.goodsThing_swipper',{
				slidesPerView: 'auto',
				spaceBetween: 20,
				observer: true,//修改swiper自己或子元素时，自动初始化swiper
				observeParents: true//修改swiper的父元素时，自动初始化swiper
			});
  		}
	}
	//获取风格派列表
	function getStylePai(obj,type,callback){
		var data={
			length:3,
			start:0,
			stylePaiCode:type
		}
		obj.$ajax(obj.$store.state.localIP+'stylePai/listDesignByStylePai','post',data,function(res){
			if(res.data){			
				//console.log(res.data)
				callback(res.data)
			}else{
				obj.$message.error("获取风格派列表失败！");
			}
		})
	}
	//获取楼盘列表
	function getHouseList(obj,callback){
		var data={
			length:3,
			start:0,
			city:obj.$store.state.city
		}
		obj.$ajax(obj.$store.state.localIP+'queryHouseInfo','post',data,function(res){
			callback(res);
		})
	}
	//获取好物
	function getGoodsList(obj){
		obj.$ajax(obj.$store.state.localIP+'mall/listPromotionGoods','get',{},function(res){
			console.log(res);
			var list=res.data;
			for(var i=0;i<list.length;i++){
				if(list[i].goodsImageList){
					list[i].goodsImg=list[i].goodsImageList[0] || '';
				}
			}
			obj.goodsList=list;
		})
	}
</script>

<style scoped="scoped">
	.banner_swipper{
		width: 100%;
		height: 5.4rem;
	}
	.swiper-container{
		position: relative;
		width: 100%;
		overflow: hidden;
	}
	.banner_swipper .swiper-slide{
		background-size:100% auto !important;
		border-radius:0px 0px 20px 20px;
	}
	.stylePai{
		margin-top: 0.8rem;
		position: relative;
		width: 100%;
	}
	.styleLine{
		position: absolute;
		top: -1.3rem;
		left: 50%;
		width:1px;
		height:1rem;
		background:rgba(116,128,118,1);
		z-index: 30;
	}
	.title h1{
		width: 100%;
		text-align: center;
		height: 0.4rem;
		line-height: 0.4rem;
		font-size:0.3rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
		margin-top: 0.3rem;
	}
	.title h1 span{
		position: relative;
	}
	.title h1 span:after{
		position: absolute;
	    top: 0.12rem;
	    right: -0.17rem;
	    content:'';
	    font-size: 0;  
	    line-height: 0;  
	    border-width: 0.08rem;  
	    border-color: #000;  
	    border-right-width: 0;  
	    border-style: dashed;  
	    border-left-style: solid;  
	    border-top-color: transparent;  
	    border-bottom-color: transparent;
	}
	.title h2{
		width: 100%;
		text-align: center;
		height: 0.3rem;
		line-height: 0.3rem;
		font-size:0.18rem;
		font-family:AvantGardeMdITCTT;
		font-weight:400;
		color:rgba(68,68,68,1);
		margin-top: 0.1rem;
		letter-spacing: 2px;
	}
	.stylePaiItem{
		width: 6.7rem;
		margin: 0 auto;
		height: 4rem;
		margin-top: 0.5rem;
		border-radius:0.2rem;
		position: relative;
	}
	.stylePaiItem .dec{
		position: absolute;
		bottom: 0rem;
		left: 0rem;
		width: 100%;
		padding: 0.3rem;
		text-align: left;
		box-sizing: border-box;
	}
	.stylePaiItem h1{
		font-size:0.28rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:#FFFFFF;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
	}
	.stylePaiItem h1 span{
		color:rgba(126,140,127,1);
	}
	.stylePaiItem h2{
		margin-top: 0.1rem;
		font-size:0.24rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:#FFFFFF;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
	}
	.classicStyleLine{
		margin: 0 auto;
		width:0.4rem;
		height:4px;
		background:rgba(126,140,127,1);
		margin-top: 0.65rem;
	}
	.classicStyle h1{
		margin-top: 0.28rem;
		width: 100%;
		text-align: center;
		font-size:0.26rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(126,140,127,1);
	}
	.classicStyle_swipper,.floor_swipper,.goodsThing_swipper{
		margin-top: 0.3rem;
		width: 100%;
		height: 4rem;
		padding-left: 0.2rem;
		box-sizing: border-box;
	}
	.classicStyle_swipper .swiper-slide,.floor_swipper .swiper-slide{
		background-size:100% auto !important;
		border-radius:20px;
		width: 90%;
	}
	.swiper-container .dec{
		position: absolute;
		bottom: 0rem;
		left: 0rem;
		width: 100%;
		padding: 0.3rem;
		box-sizing: border-box;
		color: #ffffff;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.swiper-container .dec h1{
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		text-align: left;
		color: #ffffff;
		font-size:0.3rem;
		height: 0.4rem;
		line-height: 0.4rem;
	}
	.swiper-container .dec h2{
		font-size:0.24rem;
		height: 0.3rem;
		line-height: 0.3rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:400;
		color:rgba(255,255,255,1);
		text-align: left;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		color: #ffffff;
	}
	.floorLine{
		width:0.04rem;
		height:0.6rem;
		margin: 0 auto;
		margin-top: 0.63rem;
		background:rgba(68,68,68,1);
	}
	/*.floor .title h1{
		width: 100%;
		height: 0.4rem;
		line-height: 0.4rem;
		font-size:0.3rem;
		text-align: center;
		margin-top: 0.35rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.floor .title h2{
		font-size: 0.26rem;
		font-weight: 400;
		color: #444444;
	}*/
	.floor .dec{
		width: 3.8rem;
		word-break: break-all;
		text-align: center;
		height: auto;
		line-height: 150%;
		font-size:0.14rem;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(43,43,43,1);
		margin: 0 auto;
		margin-top: 0.44rem;
	}
	.floor_swipper{
		height: 3.2rem;
	}
	.goodThing{
		margin-bottom: 0.3rem;
	}
	.goodThingLine{
		margin: 0 auto;
		margin-top: 0.7rem;
		width:0.04rem;
		height:0.6rem;
		background:rgba(68,68,68,1);
	}
	.goodsThing_swipper{
		height: 3.6rem;
	}
	.goodsThing_swipper .swiper-slide{
		background-size:auto 100% !important;
		border-radius:20px;
		width: 90%;
	}
	.goodsThing_swipper .dec{
		background: linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.5)  100%);
		border-bottom-left-radius: 20px;
		border-bottom-right-radius: 20px;
	}
	.bannerFont{
		position: absolute;
		bottom:1rem;
		left: 0.4rem;
		width: 3rem;
		font-size:0.48rem;
		font-family:AvantGardeMdITCTTBold;
		font-weight:bold;
		color:rgba(255,255,255,1);
		z-index: 50;
		letter-spacing: 2px;
	}
	.bannerFont p:first-child{
		font-size: 0.3rem;
		letter-spacing: 3px;
	}
</style>