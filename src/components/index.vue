<template>
  <div class="index">
  	<!--首页轮播图-->
  	<v-banner :screenHeight='screenHeight' :screenIndex='screenIndex'></v-banner>
	  <!--logo-->
		<img src="/static/img/logo.png" class="logo" alt="LOGO" />
		<div class="logoBg"></div>
		<!--菜单menu-->
		<div :class="[0,2,3].indexOf(screenIndex)>-1?'menu':'menu menuBg'" @click="openMenuFun">
			<img src="/static/img/menu.png" v-show="!openMenu && [0,2,3].indexOf(screenIndex)>-1" />
			<img src="/static/img/close.png" v-show="openMenu && [0,2,3].indexOf(screenIndex)>-1" />
			<img src="/static/img/closeBg.png" v-show="openMenu && [0,2,3].indexOf(screenIndex)==-1" />
			<img src="/static/img/menuBg.png" v-show="!openMenu && [0,2,3].indexOf(screenIndex)==-1" />
		</div>
		<!--展开-->
		<div class="menuOpen animated fadeIn" v-show="openMenu" :style="'height:'+(screenHeight-(0.76*deviceWidth/13.66))+'px'"><!--:style="'height:'+(screenHeight-deviceWidth / 13.66*0.76)+'px'"-->
			<!--<div class="searchBtn">
				搜索
			</div>-->
			<div class="menuList">
				<ul>
					<router-link to="/">
						<li>
							<p>首页 </p>
							<p>Home</p>
						</li>
					</router-link>
					
					<router-link to="/stylePai">
						<li>
							<p>风格派 </p>
							<p>Style</p>
						</li>
					</router-link>
					
					<router-link to="/floor">
						<li>
							<p>楼盘 </p>
							<p>Property</p>
						</li>
					</router-link>
					
					<router-link to="/goodsThing">
						<li>
							<p>好物 </p>
							<p>Wonderful things</p>
						</li>
					</router-link>
					
					<router-link to="/aboutUs">
						<li>
							<p>关于我们 </p>
							<p>About us</p>
						</li>
					</router-link>
				</ul>
			</div>
			
			<!--定位等-->
			<div class="position">
				<ul>
					<router-link to="/storeList">
						<li style="margin-left: 0rem;">实体店</li>
					</router-link>
					<router-link to="/case">
						<li>案例</li>
					</router-link>	
					<router-link to="/">
						<li @click="changeCityFun">
							<img src="/static/img/location.png" class="locationImg" alt="定位"/>
							{{ city }}
							<img src="/static/img/change.png" class="changeImg" alt="替换"/>
						</li>
					</router-link>	
					<div class="clear"></div>
				</ul>
			</div>
		</div>
		<!--搜索-->
		<!--<div class="search">
			<img src="/static/img/search.png" />
			<div class="line"></div>
		</div>-->
		<!--搜索-->
		<div :class="showSearchFlag ? 'search active' : 'search'">
			<img src="/static/img/search.png" @click="showSearchFlag=!showSearchFlag"/>
			<input type="text" v-model="search" placeholder="请输入要搜索的楼盘/方案" class="searchInput" v-show="showSearchFlag" @keyup.enter="searchFun" v-to-focus="showSearchFlag"/>
			<div class="line"></div>
		</div>
		
	  <!--风格派-时尚网红-->
	  <div class="stylePai" :style="'height:'+screenHeight+'px'">
	  	<!--左侧-->
	  	<div class="left" @click="goProgramme(internetCelebrity.uuid)" :style="'background:url('+internetCelebrity.coverPic+') no-repeat center center;'">
	  		<!--标题-->
	  		<router-link to="/stylePai">
	  		<div class="stylePai_title animated fadeInDown" v-show="screenIndex==1">
	  			<p class="title">风格派</p>
	  			<p>STYLE</p>
	  		</div>
	  		</router-link>
	  		<!--遮罩-->
	  		<div class="leftMask animated fadeInUp" v-show="screenIndex==1" style="animation-delay:1s;"></div>
	  	</div>
	  	<!--右侧-->
	  	<div class="right">
	  		<div class="right_title animated fadeInRight" v-show="screenIndex==1" style="animation-delay:.2s;">
	  			<p>时尚网红</p>
	  			<p>FASHION INSTAFAMOUS</p>
	  		</div>
	  		<div class="right_introduce animated fadeInRight" v-show="screenIndex==1" style="animation-delay:.5s;">
	  			<p>{{ internetCelebrity.designName }}</p>
	  			<p>{{ internetCelebrity.details }}</p>
	  		</div>
	  		<div class="internetCelebrity_swiper swiper-container">
	  			<div class="swiper-wrapper">
	  				<div class="swiper-slide" v-for="(item,key) in internetCelebrityList" :key="key" :style="'background:url('+item.img+') no-repeat center center;'">
	  					<div class="right_location">
	  						<div class="location_info">
	  							<p>{{ item.name }}</p>
	  							<p>{{internetCelebrity.designName}}</p>
	  						</div>
	  						<div class="shortLine"></div>
	  					<!--	<div class="next_location" v-show="key==0">{{ key==0?"NEXT："+internetCelebrityList[key+1].name:"" }}</div>-->
	  					</div>
	  				</div>
	  			</div>
	  			<!-- 如果需要导航按钮 -->
		  		<div class="stylePai_prevBtn internetCelebrity_prevBtn">
		  			<img src="/static/img/left.png" />
		  		</div>
		  		<div class="stylePai_nextBtn internetCelebrity_nextBtn">
		  			<img src="/static/img/right.png" />
		  		</div>
	  		</div>
	  	</div>
	  	<div class="clear"></div>
	  	<!--风格派线条-->
	  	<div class="stylePai_line1"></div>
	  	<!--横线-->
	  	<div class="stylePai_line2"></div>
	  	<div class="stylePai_line3"></div>
	  	<!--竖线-->
	  	<div class="stylePai_line4"></div>
	  	<div class="stylePai_line5"></div>
	  	<div class="stylePai_line6"></div>
	  </div>
	  
	  <!--风格派-与众不同-->
	  <div class="unusual" :style="'height:'+screenHeight+'px'">
	  	<div class="left">
	  		<router-link to="/stylePai">
	  		<div class="stylePai_title animated fadeInDown" v-show="screenIndex==2">
	  			<p class="title">风格派</p>
	  			<p>STYLE</p>
	  		</div>
	  		</router-link>
	  		
	  		<div class="left_title animated fadeInLeft" v-show="screenIndex==2" style="animation-delay:.2s;">
	  			<p>与众不同</p>
	  			<p>DIFFERENTIATE</p>
	  		</div>
	  		<div class="left_introduce animated fadeInLeft" v-show="screenIndex==2" style="animation-delay:.5s;">
	  			<div class="title">{{ unusual.designName }}</div>
	  			<div class="info">{{unusual.details }}</div>
	  		</div>
	  		
	  		<div class="unusual_swiper swiper-container">
	  			<div class="swiper-wrapper">
	  				<div class="swiper-slide" v-for="(item,key) in unusualList" :key="key" :style="'background:url('+item.img+') no-repeat center center;'">
	  					<div class="right_location">
	  						<div class="location_info">
	  							<p>{{ item.name }}</p>
	  							<p>{{ unusual.designName}}</p>
	  						</div>
	  						<div class="shortLine"></div>
	  						<!--<div class="next_location" v-show="key==0">{{ key==0?"NEXT："+unusualList[key+1].name:"" }}</div>-->
	  					</div>
	  				</div>
	  			</div>
	  			<!-- 如果需要导航按钮 -->
	  			<div class="stylePai_prevBtn unusual_prevBtn">
	  				<img src="/static/img/left.png" />
	  			</div>
	  			<div class="stylePai_nextBtn unusual_nextBtn">
	  				<img src="/static/img/right.png" />
	  			</div>
	  		</div>
	  	</div>
	  	<div class="right" @click="goProgramme(unusual.uuid)" :style="'background:url('+unusual.coverPic+') no-repeat center center;background-size:auto 100%;'">
	  		<div class="rightMask animated fadeInUp" v-show="screenIndex==2" style="animation-delay:1s;"></div>
	  	</div>
	  	<div class="clear"></div>
	  	
	  	<!--线条-->
  		<!--横线条-->
	  	<div class="unusual_line1"></div>
	  	<div class="unusual_line2"></div>
	  	<div class="unusual_line3"></div>
	  	<div class="unusual_line4"></div>
	  </div>
	  
	  <!--风格派-经典风格-->
	  <div class="classicStyle" v-if="classicStyleList.length>0" :style="'height:'+screenHeight+'px;background:url('+classicStyleList[selectClass].coverPic+') no-repeat center center;'">
	  	<router-link to="/stylePai">
	  	<div class="stylePai_title animated fadeInDown" v-show="screenIndex==3">
	  		<p class="title">风格派</p>
	  		<p>STYLE</p>
	  	</div>
	  	</router-link>
	  	
	  	<div class="styleTitleBox">
		  	<div class="styleTitle animated fadeInLeft" v-show="screenIndex==3" style="animation-delay:.2s;">{{ classicStyleList[selectClass].designName }}</div>
		  	<div class="styleInfo animated fadeInLeft" v-show="screenIndex==3"  style="animation-delay:.5s;">{{ classicStyleList[selectClass].details }}</div>
	  	</div>
	  	<!--readMore-->
  		<div class="readMore classicStyle_readMore animated fadeInLeft" @click="goProgramme(classicStyleList[selectClass].uuid)" v-show="screenIndex==3" style="animation-delay:1s;">READ  MORE</div>
  		
  		<div class="styleList">
  			<div v-for="(item,key) in classicStyleList" @mouseover="changeClass(key)" :key='key' :class="(key==selectClass?'active':'')+' listItem animated fadeInRight item'+key" v-show="screenIndex==3" :style="'animation-delay:'+ 0.3*(key+1)+'s;'">
  				<div class="title">
  					<p>{{ item.styleName }}</p>
  					<p>CLASSIC STYLE</p>
  				</div>
  				
  				<div class="info">
  					<p>{{ item.designName }}</p>
  					<p>{{ item.details }}</p>
  				</div>
  				
  				<div class="itemNum">{{ key+1>10 ?(key+1):'0'+(key+1) }}</div>
  			</div>
  		</div>
  		<!--线条-->
  		<!--横线-->
  		<div class="classicStyle_lin1"></div>
  		<div class="classicStyle_lin2"></div>
  		<!--竖线-->
  		<div class="classicStyle_lin3"></div>
  		<div class="classicStyle_lin4"></div>
  		<div class="classicStyle_lin5"></div>
  		<div class="classicStyle_lin6"></div>
	  </div>
	  
	  <!--楼盘-->
	  <div class="house" :style="'height:'+screenHeight+'px'">
	  	<router-link to="/floor">
	  	<div class="house_title animated fadeInLeft" v-show="screenIndex==4">
	  		楼盘
	  	</div>
	  	</router-link>
	  	<!--img列表-->
	  	<div class="houseList" :style="'height:'+screenHeight+'px'">
	  		<div class="house_item" v-for='(item,key) in houseList' :style="'background: url('+item.coverPic+') no-repeat center center;background-size:auto 100% !important;'" @mouseover="floorMaskIndex=key" @mouseleave="floorMaskIndex=-1">
	  			<div class="name animated fadeInDown" v-show="screenIndex==4" style="animation-delay:.2s;">{{item.houseName}}</div>
	  			<div class="floorMask" v-show="floorMaskIndex!=key"></div>
	  			<div class="address" v-show="floorMaskIndex==key">
	  				<h1>{{item.houseName}}</h1>
	  				{{ item.address }}
	  			</div>
	  		</div>
	  		<!--<div class="house_item" style="background: url(http://images.wojiali.cn/FguIFICkz8IS3RgXN85sqfDzAe22) no-repeat center center;background-size:auto 100%;">
	  			<div class="name animated fadeInDown" v-show="screenIndex==4" style="animation-delay:.2s;">金成·英特学府</div>
	  		</div>
	  		<div class="house_item" style="background: url(http://images.wojiali.cn/FsIgWbo5coHYcztr4fPstHH-e1ch) no-repeat center center;background-size:auto 100%;">
	  			<div class="name animated fadeInDown" v-show="screenIndex==4" style="animation-delay:.2s;">金成·英特学府</div>
	  		</div>-->
	  	</div>
	  	<div class="houseInfo">
	  		<div class="title animated fadeInRight" v-show="screenIndex==4" style="animation-delay:.5s;">
	  			<p>楼盘-</p>
	  			<p>户型定制</p>
	  		</div>
	  		
	  		<div class="house_disc animated fadeInRight" v-show="screenIndex==4" style="animation-delay:.7s;">定制定居因为可以量身定制，深受人们追捧，可以说现在每个家庭在装修时，基本都会选择定制家居，因为它足够灵活。</div>
	  		
	  		<div class="house_readMore animated fadeInRight" v-show="screenIndex==4" style="animation-delay:1s;" @click="goFloor">READ MORE</div>
	  		
	  		<!--线条-->
	  		<div class="house_line1"></div>
	  		<div class="house_line2"></div>
	  		<div class="house_line3"></div>
	  	</div>
	  	<div class="clear"></div>
	  </div>
	  
	  <!--好物-->
	  <div class="goodThing" :style="'height:'+screenHeight+'px'" v-if="goodsList.length">
	  	<router-link to="/goodsThing">
	  	<div class="house_title animated fadeInLeft" v-show="screenIndex==5">
	  		好物
	  	</div>
	  	</router-link>
	  		
	  	<div class="goodsName animated fadeInLeft" v-show="screenIndex==5" style="animation-delay:.2s;">
	  		<p>{{goodsList[selectGoodsIndex].goodsName}}｜{{ goodsList[selectGoodsIndex].brandName }}</p>
	  		<p>{{ goodsList[selectGoodsIndex].subtitle || '' }}</p>
	  	</div>
	  	
	  	<div class="goodReadMore animated fadeInLeft" v-show="screenIndex==5" style="animation-delay:.5s;" @click="goGoods">READ MORE</div>
	  	
	  	<div class="goodImg" :style="'background: url('+goodsList[selectGoodsIndex].goodsImg+') no-repeat center center;'">
	  		<!--<img :src="goodsList[selectGoodsIndex].goodsImg"/>-->
	  	</div>
	  	
	  	<div class="goodThingline1"></div>
	  	<div class="goodThingline2"></div>
	  	<div class="goodThingline3"></div>
	  	<div class="goodThingline4"></div>
	  	<div class="goodThingline5"></div>
	  	<div class="goodThingline6"></div>
	  </div>
	  
	  <!--好物图片切换-->
	  <div class="filterGood" v-if="goodsList.length">
	  	<div class="goodsPre" @click="scrollLeft(true)">
	  		<img src="/static/img/left.png" />
	  	</div>
	  	<div class="goodsNext" @click="scrollLeft(false)">
	  		<img src="/static/img/right.png" />
	  	</div>
	  	<div class="scrollX">
	  		<div class="box">	
	  			<ul :style="'width:'+goodsList.length*2.38+'rem'">
	  				<li class="scrollItem" v-for="(item,index) in goodsList" :key='index' :style="'background:#ffffff url('+item.goodsImg+') no-repeat center center;'" @click="selectGoodsIndex=index">
	  					<div class="goodsNameMask" v-show="selectGoodsIndex==index">{{goodsList[selectGoodsIndex].goodsName}}</div>
	  				</li>
	  			</ul>
	  		</div>
	  			
	  		<div class="clear"></div>
	  	</div>
	  </div>
	  
	  <el-dialog
		  title="切换城市"
		  :visible.sync="dialogVisible"
		  style="font-size: 16px;"
		  center
		  :before-close="handleClose">
		  	<!--城市列表-->
		  	<ul class="cityList">
		  		<li v-for="(item,index) in cityList" :class="cityIndex==index ? 'active' : ''" :key="index" @click="cityIndex=index">
		  			<img src="/static/img/sjFlag.png" alt="标记" v-show="cityIndex==index"/>
		  			{{ item.cityName }}
		  		</li>
		  		<div class="clear"></div>
		  	</ul>
		  	<span slot="footer" class="dialog-footer">
			    	<el-button class="confirmBtn" @click="changeFun">确 定</el-button>
			  </span>
		</el-dialog>
  </div>
</template>

<script>
//引入swipper插件
//import Swiper from 'swiper';
//引入banner子组件
import Banner from './layout/banner'

export default {
  name: 'index',
  props:['screenHeight'],
  data () {
    return {
      timer: false,
      screenIndex:0,//记录屏幕滚动标记
      flag:false,//滚动开关
      city:this.$store.state.city,//城市
      dialogVisible:false,//弹窗
      cityList:[],//城市列表
      cityIndex:0,//当前选中城市
      showSearchFlag:false,
      search:'',//搜索
      openMenu:false,
      deviceWidth:'',//屏幕宽度
      unusual:{},//与众不同
      unusualList:[],//与众不同空间list
      internetCelebrity:{},//时尚网红
      internetCelebrityList:[],//时尚网红空间list
      classicStyleList:[],//经典风格列表
      floorMaskIndex:-1,
      selectClass:0,
      houseList:[],//楼盘列表
     	bannerList:[{bannerImg:'http://images.wojiali.cn/Fma7qRww1Y73JDl5vrPgBeS47OJo'}],//banner图列表
     	goodsList:[],//好物列表
     	selectGoodsIndex:0,//选中好物列表
    }
  },
  mounted(){
  	this.hideRight();
  	this.deviceWidth=document.documentElement.clientWidth;
	  //空间切换
	  new Swiper('.internetCelebrity_swiper',{
			loop: false, // 循环模式选项
			nextButton: '.internetCelebrity_nextBtn',
    	prevButton: '.internetCelebrity_prevBtn',
	    observer: true,//修改swiper自己或子元素时，自动初始化swiper
	    observeParents: true//修改swiper的父元素时，自动初始化swiper
		})
	  new Swiper ('.unusual_swiper', {
	    loop: false, // 循环模式选项
	    nextButton: '.unusual_nextBtn',
    	prevButton: '.unusual_prevBtn',
	    observer: true,//修改swiper自己或子元素时，自动初始化swiper
	    observeParents: true//修改swiper的父元素时，自动初始化swiper
	  }) 
	  const that = this;
	  this.flag=true;
	  $('html,body').animate({scrollTop: 0},1000,function(){	  	
	  	that.screenIndex=0;
	  	that.flag=false;
	  });
	  //滚动条监听
	  $(document).scroll(function(){
	  	let top=$(document).scrollTop();
	  	let index=Math.floor(top/that.screenHeight)
			that.screenIndex=index;
		})
		//监听滑轮滚动
		$(document).on('mousewheel DOMMouseScroll', function(e){
			if(!that.flag){
	    	that.flag=true;
				e.preventDefault();
	    	var wheel = e.originalEvent.wheelDelta || -e.originalEvent.detail;
	   	 	var delta = Math.max(-1, Math.min(1, wheel) );
	    	if(delta<0){//向下滚动
	    		if(that.screenIndex<5){
	    			var index=that.screenIndex+1
			      var height=that.screenHeight*(index);
			      $('html,body').animate({scrollTop: height},1000,function(){
			        that.screenIndex=index;
			        that.flag=false;
			      });
	    		}else{
	    			$('html,body').animate({scrollBottom: 0},1000,function(){
			        that.screenIndex=5;
			        that.flag=false;
			      });
	    		}
	    	}else{//向上滚动
	    		if(that.screenIndex==0){
	    			that.flag=false;
	    			return;
	    		}
	    		if($(document).scrollTop()>6*that.screenHeight){
	    			var index=5;
			      var height=that.screenHeight*6;
	    			$('html,body').animate({scrollTop: height},1000,function(){
			        that.screenIndex=index;
			        that.flag=false;
			      });
	    		}else{
	    			var index=that.screenIndex-1
			      var height=that.screenHeight*(index);
			      $('html,body').animate({scrollTop: height},1000,function(){
			        that.screenIndex=index;
			        that.flag=false;
			      });
	    		}
	    	}
	    }
		});
		//获取与众不同信息
		getStylePai(this,'unusual',function(res){
			if(res.length>0){
				if(res[0].details.length>50){
					res[0].details=res[0].details.substring(0,50)+'...';
					res[0].details=res[0].details.replace(/[\s\r\n]/g,"");
				}
			}
			that.unusual=res[0] || {};
			that.unusualList=[{name:res[0].areaPicName1,img:res[0].areaPic1},{name:res[0].areaPicName2,img:res[0].areaPic2}]
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
			that.internetCelebrityList=[{name:res[0].areaPicName1,img:res[0].areaPic1},{name:res[0].areaPicName2,img:res[0].areaPic2}]
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
	directives : {
    "to-focus" : function (el,binding) {
        if(binding.value){
            el.focus();
        }
    }
  },
	components:{ 'v-banner':Banner},
	watch:{
		//监听city变化
    '$store.state.city': function () {
    		this.city=this.$store.state.city;
    		this.reload();
    }
	},
	inject:['reload','hideRight'],
	methods:{
		//搜索
		searchFun(){
			let code=Base64.encode(this.search);
			//console.log(code)
			this.$router.push({path:'/search/'+code});
		},
		//打开菜单
		openMenuFun(){
			this.openMenu=!this.openMenu;
		},
		//改变经典方案
		changeClass(index){
			this.selectClass=index;
		},
		//跳转详情页面
		goProgramme(uuid){
			let code=Base64.encode(uuid);
			this.$router.push({path:'/stylePai/info/'+code})
		},
		goFloor(){
			this.$router.push({path:'/floor'})
		},
		//好物
		goGoods(){
			let uuid=this.goodsList[this.selectGoodsIndex].uuid;
			let code=Base64.encode(uuid);
			this.$router.push({path:'/goods/info/'+code})
		},
		//横向滚动
		scrollLeft(flag){
			if(flag){
				let left=$('.scrollX .box').scrollLeft();
				$('.scrollX .box').scrollLeft(left+100);
			}else{
				let left=$('.scrollX .box').scrollLeft();
				$('.scrollX .box').scrollLeft(left-100);
			}
		},
		//更换城市
		changeCityFun(){
			this.dialogVisible=true;
			getLocation(this);
		},
		//关闭弹窗
		handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
   },
   	//提交更换城市
   	changeFun(){
   		if(this.cityIndex==-1){
   			this.$message.error('请选择更换城市！');
   			return;
   		}
   		let city=this.cityList[this.cityIndex].cityName;
   		sessionStorage.setItem('city',city);
			this.$store.commit('changeCity');
   	}
		//好物详情
		/*goGoodsInfo(uuid){
			let code=Base64.encode(uuid);
			this.$router.push({path:'/goods/info/'+code})
		}*/
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
//获取城市列表
function getLocation(obj){ 
	//获取当前城市列表
	obj.$ajax(obj.$store.state.localIP+'queryCityList','post',{},function(res){
		//console.log(res);
		obj.cityList=res.cityList || [];
		let list=res.cityList || [];
		for(let i=0;i<list.length;i++){
			if(list[i].cityName==obj.city){
				obj.cityIndex=i
				break;
			}
		}
	})
}
</script>

<style scoped>
	p{
		margin: 0px;
		padding: 0px;
	}
	.classicStyle{
		background-size:100% auto !important;
	}
	.logo{
		position: fixed;
		top: 0.09rem;
		right: 0.08rem;
		width: 1.12rem;
		height: 0.56rem;
		z-index: 50;
	}
	.logoBg{
		position: fixed;
		z-index: 10;
		top: 0rem;
		right: 0rem;
		width:0.76rem;
		height:0.76rem;
		background:rgba(126,140,127,1);
		box-shadow:0px 7px 36px 0px rgba(84,96,95,0.45);
	}
	.menu{
		position: fixed;
		top: 0.76rem;
		right: 0.76rem;
		width: 0.76rem;
		height: 0.76rem;
		background:rgba(255,255,255,1);
		box-shadow:0px 7px 36px 0px rgba(84,96,95,0.45);
		cursor: pointer;
		z-index: 50;
	}
	.menu img{
		position: absolute;
		top: 0.255rem;
		left: 0.24rem;
		width: 0.28rem;
		height: 0.25rem;
	}
	.menuOpen{
		position: fixed;
		top: 0.76rem;
		right: 1.52rem;
		width:4.55rem;
		z-index: 90;
		height: auto;
		background:rgba(255,255,255,1);
		padding-left: 0.75rem;
		box-sizing: border-box;
		border: 1px solid rgba(126,140,127,0.2);
		overflow: hidden;
	}
	.menuOpen .searchBtn{
		width: 100%;
		height: 0.6rem;
		padding-left: 0.28rem;
		box-sizing: border-box;
		font-size:0.15rem;
		line-height: 0.6rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(68,68,68,1);
	}
	.menuList{
		font-size:0.19rem;
		font-family:MicrosoftYaHei-Bold;
		height: 80%;
		font-weight:bold;
		color:rgba(126,140,127,1);
	}
	.menuList ul{
		height: 90%;
		display: flex;
		justify-content: space-between;
		flex-direction: column;
	}
	.menuList p:last-child{
		font-size:0.21rem;
		font-family:AvantGardeMdITCTT;
		font-weight:400;
		color:rgba(126,140,127,1);
		opacity:0.2;
	}
	.menuList li{
		margin-top: 0.3rem;
		cursor: pointer;
		color:rgba(44,44,44,1);
	}
	.menuList li:hover{
		font-size:0.19rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(126,140,127,1);
	}
	.position{
		font-size:0.15rem;
		margin-top: 0.3rem;
		margin-bottom: 0.3rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(68,68,68,1);
	}
	.position ul  li:last-child{
		padding-left: 0.3rem;
		position: relative;
	}
	.position .locationImg{
		position: absolute;
		width: 0.15rem;
		height: auto;
		top: 0.14rem;
		left: 0.05rem;
	}
	.position .changeImg{
		position: absolute;
		width: 0.13rem;
		height: auto;
		right: -0.2rem;
		top: 0.18rem;
	}
	.position ul li{
		float: left;
		margin-left: 0.3rem;
		cursor: pointer;
		color:rgba(68,68,68,1);
		height: 0.5rem;
		line-height: 0.5rem;
	}
	.search{
		position: absolute;
		top: 0.76rem;
		left: 0rem;
		width:1.52rem;
		height:0.76rem;
		background:rgba(0,0,0,0.6);
		z-index: 20;
	}
	.search img{
		position: absolute;
		top: 0.28rem;
		left: 1.05rem;
		width: 0.19rem;
		height: 0.19rem;
		cursor: pointer;
	}
	.searchInput{
		position: absolute;
		height: 0.5rem;
		top: 0.13rem;
		left: 1.8rem;
		width: 4rem;
		border: none;
		background: none;
		line-height: 0.5rem;
		outline: none;
		color: #ffffff;
	}
	.search .line{
		position: absolute;
		top: 0.32rem;
		left: 0.75rem;
		width:0.02rem;
		height:0.09rem;
		background:rgba(255,255,255,0.6);
	}
	.search.active{
		animation: searchAnimate 1s ease-in 1 forwards;
	}
	@keyframes searchAnimate{
		100%{
			width:7rem;
			height:0.76rem;
		}
	}
	.readMore{
		position: absolute;
		left: 1.52rem;
		bottom: 1.3rem;
		width:2.28rem;
		height:0.66rem;
		z-index: 20;
		border:3px solid rgba(255,255,255,1);
		font-size:17px;
		font-family:AvantGardeMdITCTTBold;
		font-weight:bold;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 0.66rem;
		letter-spacing: 3px;
		cursor: pointer;
	}
	.classicStyle_readMore{
		left: 0.76rem;
	}
	.animationLine{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width:1px;
		height:0.47rem;
		background:rgba(255,255,255,1);
		bottom: 0rem;
		z-index: 20;
		animation: animationLine 1.2s ease infinite alternate;
	}
	.fadeInLeft{
		animation-duration:2s;
	}
	.stylePai,.goodThing{
		width: 100%;
		position: relative;
		height: 100%;
		overflow: hidden;
	}
	.stylePai .left{
		width: 55.5%;
		float: left;
		height: 100%;
		position: relative;
		background-size:auto 100% !important;
	}
	.stylePai .right{
		width: 44.5%;
		float: left;
		height: 100%;
		position: relative;
	}
	.stylePai_title{
		width:2.28rem;
		height:1.14rem;
		background:rgba(0,0,0,0.5);
		font-size:0.24rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(255,255,255,1);
		padding-top: 0.3rem;
		box-sizing: border-box;
		letter-spacing: 5px;
		cursor: pointer;
	}
	.stylePai_title .title:after{
		position: absolute;
    top: 0.13rem;
    right: 0.55rem;
    content:'';
    font-size: 0;  
    line-height: 0;  
    border-width: 0.06rem;  
    border-color: #ffffff;  
    border-right-width: 0;  
    border-style: dashed;  
    border-left-style: solid;  
    border-top-color: transparent;  
    border-bottom-color: transparent;
    z-index: 20;
	}
	.stylePai_title p{
		width: 100%;
		padding-left: 0.76rem;
		box-sizing: border-box;
		position: relative;
	}
	.stylePai_title p:last-child{
		font-size:0.16rem;
		font-family:AvantGardeMdITCTT;
		font-weight:400;
		color:rgba(255,255,255,1);
		letter-spacing: 3px;
		margin-top: 0.05rem;
	}
	.leftMask{
		width:0.76rem;
		height:2.4rem;
		background:rgba(139,94,81,1);
		position: absolute;
		right: 0rem;
		bottom: 0rem;
	}
	.rightMask{
		width:0.76rem;
		height:2.4rem;
		background:rgba(180,166,157,1);
		position: absolute;
		left: 0rem;
		bottom: 0rem;
	}
	.right_title{
		margin-left: 0.56rem;
		margin-top: 0.9rem;
		font-size:0.19rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		letter-spacing: 5px;
		color:rgba(126,140,127,1);
	}
	.right_title p:last-child{
		font-size:0.15rem;
		font-family:AvantGardeMdITCTT;
		font-weight:400;
		color:rgba(126,140,127,1);
		letter-spacing: 3px;
	}
	.right_introduce{
		margin-top: 0.4rem;
		margin-left: 0.56rem;
		font-family:MicrosoftYaHei-Bold;
		color: #373737;
		font-size: 0.28rem;
		font-weight: bold;
		width:3.45rem;
		height:auto;
		overflow: hidden;
	}
	.right_introduce p:last-child{
		margin-top: 0.2rem;
		font-family:MicrosoftYaHei;
		font-size: 0.13rem;
		color: #373737;
		font-weight: 500;
		line-height: 200%;
		width: 100%;
		word-break: break-all;
	}
	.swiper-container{
		width: 5.33rem;
		height:2.4rem;
		position: absolute;
		bottom: 0rem;
		left: 0rem;
		z-index: 20;
		overflow: hidden;
	}
	.swiper-container .swiper-slide{
		background-size:100% auto !important;
	}
	.stylePai_prevBtn{
		position: absolute;
		bottom: 0rem;
		left: 3.04rem;
		width: 0.76rem;
		height: 0.76rem;
		background:rgba(0,0,0,0.6);
		z-index: 30;
		cursor: pointer;
	}
	.unusual_prevBtn{
		left: 0.76rem;
	}
	.stylePai_prevBtn img{
		position: absolute;
		width: 0.11rem;
		height: 0.21rem;
		top: 0.275rem;
		left: 0.325rem;
	}
	.stylePai_nextBtn{
		position: absolute;
		bottom: 0rem;
		left: 3.8rem;
		width: 0.76rem;
		height: 0.76rem;
		background:rgba(126,140,127,1);
		z-index: 30;
		cursor: pointer;
	}
	.unusual_nextBtn{
		left:1.52rem;
		background:rgba(86,128,143,1);
	}
	.stylePai_nextBtn img{
		position: absolute;
		width: 0.11rem;
		height: 0.21rem;
		top: 0.275rem;
		left: 0.325rem;
	}
	.right_location{
		margin-left: 3.05rem;
		width:2.28rem;
		height:3.04rem;
		background:rgba(159,170,160,1);
		padding: 0.22rem 0.17rem;
		box-sizing: border-box;
	}
	.unusual_swiper .right_location{
		background:rgba(66,96,107,1);
	}
	.unusual_swiper{
		margin-left: 0.76rem;
	}
	.unusual_swiper .right_location{
		margin-left: 0rem;
	}
	.stylePai_line1{
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		width:1px;
		height:0.47rem;
		top: 0rem;
		z-index: 20;
		background:rgba(159,170,160,1);
	}
	.stylePai_line2,.unusual_line1,.classicStyle_lin1{
		width:100%;
		height:1px;
		background:rgba(210,210,210,1);
		opacity:0.3;
		position: absolute;
		top: 0.77rem;
		left: 0rem;
	}
	.stylePai_line3,.unusual_line2,.classicStyle_lin2{
		width:100%;
		height:1px;
		background:rgba(210,210,210,1);
		opacity:0.3;
		position: absolute;
		top: 1.51rem;
		left: 0rem;
	}
	.stylePai_line4,.unusual_line3{
		width:1px;
		height:100%;
		background:rgba(255,255,255,1);
		opacity:0.3;
		position: absolute;
		top: 0.76rem;
		left: 0.77rem;
	}
	.unusual_line3{
		background:rgba(229,229,229,1);
	}
	.stylePai_line5{
		width:1px;
		height:100%;
		background:rgba(255,255,255,1);
		opacity:0.3;
		position: absolute;
		top: 0rem;
		left: 3.78rem;
	}
	.stylePai_line6,.unusual_line4,.classicStyle_lin6{
		width:1px;
		height:100%;
		background:rgba(170,170,170,1);
		opacity:0.3;
		position: absolute;
		top: 0rem;
		right: 1.51rem;
	}
	.location_info{
		margin-top: 0.1rem;
		margin-left: 0.17rem;
		font-size:0.17rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
	}
	.location_info p:last-child{
		font-size: 0.23rem;
	}
	.shortLine{
		width:0.32rem;
		height:2px;
		background:rgba(255,255,255,1);
		margin-top: 0.1rem;
		margin-left: 0.17rem;
	}
	.next_location{
		font-size: 0.15rem;
		font-family:AvantGardeMdITCTT;
		font-weight:400;
		color:rgba(255,255,255,1);
		margin-top: 0.3rem;
		margin-left: 0.17rem;
	}
	.unusual,.classicStyle,.house{
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
	}
	.unusual .left_title{
		font-size:0.19rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(86,128,143,1);
		margin-top: 0.2rem;
		margin-left: 2rem;
	}
	.unusual .left_title p:last-child{
		font-size:0.15rem;
		font-family:AvantGardeMdITCTT;
		font-weight:400;
		color:rgba(86,128,143,1);
	}
	.left_introduce{
		width: 2.73rem;
		word-break: break-all;
		margin-top: 0.2rem;
		margin-left: 2.07rem;
	}
	.left_introduce .title{
		font-family:MicrosoftYaHei-Bold;
		font-weight: bold;
		font-size: 0.28rem;
		color: #373737;
	}
	.left_introduce .info{
		color: #373737;
		font-size: 0.13rem;
		font-weight: 400;
		margin-top: 0.1rem;
		line-height: 200%;
		word-break: break-all;
	}
	.unusual .left{
		width: 44.5%;
		float: left;
		height: 100%;
		position: relative;
	}
	.unusual .right{
		width: 55.5%;
		float: left;
		height: 100%;
		position: relative;
		background-size:auto 100% !important;
	}
	.styleTitleBox{
		position: absolute;
		bottom:2.8rem;
		left: 0.77rem;
	}
	.styleTitle{
		font-size:0.6rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.styleInfo{
		margin-top: 0.2rem;
		font-size:0.13rem;
		width:3.78rem;
		line-height: 200%;
		font-family:MicrosoftYaHeiLight;
		font-weight:300;
		color:rgba(255,255,255,1);
	}
	.styleList .item0{
		position: absolute;
		top: 0.5rem;
		right: 3.32rem;
		width:1.8rem;
		height:1.8rem;
		border:2px solid rgba(255,255,255,1);
		z-index: 30;
	}
	.styleList .item1{
		position: absolute;
		top: 2.3rem;
		right: 1.52rem;
		width:1.8rem;
		height:1.8rem;
		border:2px solid rgba(255,255,255,1);
		z-index: 30;
	}
	.styleList .listItem {
		box-sizing: border-box;
		background: rgba(0,0,0,0.5);
	}
	.styleList .listItem p{
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	.styleList .item2{
		position: absolute;
		top: 4.1rem;
		right: 3.32rem;
		width:1.8rem;
		height:1.8rem;
		border:2px solid rgba(255,255,255,1);
		z-index: 30;
	}
	.listItem .title{
		position: absolute;
		top: 0.16rem;
		right: 0.19rem;
		font-size:0.15rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		text-align: right;
		color: rgba(255,255,255,1);
		opacity:0.8;
	}
	.listItem.active .title{
		color:rgba(112,124,113,1);
	}
	.listItem.active{
		background: rgba(255,255,255,1);
	} 
	.listItem .title p:last-child{
		font-size:0.13rem;
		font-family:AvantGardeMdITCTT;
		font-weight:400;
	}
	.listItem .info{
		width: 100%;;
		position: absolute;
		left: 0rem;
		bottom: 0.16rem;
		color:rgba(255,255,255,1);
		font-size:0.17rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		opacity:0.8;
	}
	.listItem .info p{
		width: 100%;
		overflow: hidden;
		padding: 0rem 0.19rem;
		box-sizing: border-box;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	.listItem .info p:last-child{
		font-size:0.11rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		margin-top: 0.05rem;
	}
	.listItem.active .info{
		color:rgba(37,37,37,1);
	}
	.listItem{
		cursor: pointer;
	}
	.classicStyle_lin3{
		width:1px;
		height:100%;
		background:rgba(210,210,210,1);
		opacity:0.3;
		position: absolute;
		top: 0rem;
		left: 0.77rem;
	}
	.classicStyle_lin4{
		width:1px;
		height:100%;
		background:rgba(170,170,170,1);
		opacity:0.3;
		position: absolute;
		top: 0rem;
		left: 2.28rem;
	}
	.classicStyle_lin5{
		width:1px;
		height:100%;
		background:rgba(238,238,238,1);
		opacity:0.3;
		position: absolute;
		top: 0rem;
		left: 6.83rem;
	}
	.classicStyle_lin6{
		background:rgba(238,238,238,1);
	}
	.menuBg{
		background: #3D3D3D;
	}
	.house{
		background:rgba(237,243,246,1);
	}
	.house_title{
		position: absolute;
		top: 0.77rem;
		left: 0rem;
		width:1.52rem;
		height:0.76rem;
		background:rgba(0,0,0,0.6);
		font-size:0.26rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(255,255,255,1);
		text-align: center;
		line-height: 0.76rem;
		box-sizing: border-box;
		z-index: 30;
	}
	.house_title:after{
		position: absolute;
    top: 0.3rem;
    right: 0.3rem;
    content:'';
    font-size: 0;  
    line-height: 0;  
    border-width: 0.06rem;  
    border-color: #ffffff;  
    border-right-width: 0;  
    border-style: dashed;  
    border-left-style: solid;  
    border-top-color: transparent;  
    border-bottom-color: transparent;
    z-index: 40;
	}
	.houseList{
		width: 66%;
		float: left;
	}
	.houseInfo{
		width: 34%;
		float: left;
		position: relative;
		background:rgba(237,243,246,1);
		height: 100%;
	}
	.houseList .house_item{
		width: 33.33%;
		float: left;
		height: 100%;
		cursor: pointer;
		border-right: 1px solid rgba(255,255,255,1);
		box-sizing: border-box;
		position:relative;
	}
	.houseList .house_item:hover{		
		animation: scale .5s linear forwards;
	}
	.house_item .name{
		display: table-cell;
		position: absolute;
		width:0.38rem;
		padding: 0.5rem 0.1rem;
		box-sizing: border-box;
		background:rgba(27,27,27,0.6);
		top: 0rem;
		right: 0rem;
		text-align: center;
		font-size:0.17rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(255,255,255,1);
		vertical-align: middle;
	}
	.houseInfo .title{
		position: absolute;
		top: 1.2rem;
		left: 0.76rem;
		font-size:0.46rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(43,43,43,1);
		z-index: 20;
	}
	.house_disc{
		width:2.52rem;
		position: absolute;
		bottom: 2.2rem;
		left: 0.76rem;
		font-size:0.13rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(43,43,43,1);
		line-height:200%;
	}
	.house_readMore{
		position: absolute;
		bottom: 1.1rem;
		left: 0.76rem;
		width:2.28rem;
		height:0.66rem;
		border:3px solid rgba(43,43,43,1);
		font-size:0.17rem;
		font-family:AvantGardeMdITCTTBold;
		text-align: center;
		line-height: 0.66rem;
		font-weight:bold;
		color:rgba(43,43,43,1);
		cursor: pointer;
	}
	.house_line1{
		position: absolute;
		top: 0.76rem;
		width:100%;
		height:1px;
		background:rgba(210,210,210,1);
		right: 0rem;
		opacity:0.3;
	}
	.house_line2{
		position: absolute;
		top: 1.52rem;
		width:100%;
		height:1px;
		right: 0rem;
		background:rgba(210,210,210,1);
		opacity:0.3;
	}
	.house_line3{
		position: absolute;
		top: 0rem;
		right: 1.52rem;
		width:1px;
		height:100%;
		background:rgba(170,170,170,1);
		opacity:0.1;
	}
	.goodThing{
		width: 100%;
		height: 100%;
		position: relative;
		overflow: hidden;
		background:rgba(237,243,246,1);
	}
	.goodsName{
		position: absolute;
		top: 2.2rem;
		left: 0.76rem;
		font-size:0.46rem;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(126,140,127,1);
	}
	.goodsName p:last-child{
		width:4.58rem;
		font-size:0.23rem;
		font-family:PingFang-SC-Medium;
		font-weight:500;
		color:rgba(169,180,173,1);
		margin-top: 0.2rem;
	}
	.goodReadMore{
		position: absolute;
		left: 0.76rem;
		bottom: 1.2rem;
		width:2.28rem;
		height:0.66rem;
		font-size:0.17rem;
		text-align: center;
		line-height: 0.66rem;
		font-family:AvantGardeMdITCTTBold;
		font-weight:bold;
		color:rgba(142,155,145,1);
		border:3px solid rgba(159,170,160,1);
		cursor: pointer;
	}
	.goodImg{
		width: 3.85rem;
		height: 4rem;
		background-size:contain !important;
		position: absolute;
		top: 50%;
		transform: translateY(-50%);
		right: 3.6rem;
	}
	.goodsNameMask{
		position: absolute;
		top: 0rem;
		left: 0rem;
		background:rgba(195,206,196,0.6);
		z-index: 20;
		width: 2rem;
		height: 2rem;
		text-align: center;
		line-height: 2rem;
		font-size:0.23rem;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.filterGood{
		width: 100%;
		height: 2.3rem;
		position: relative;
	}
	.goodsPre{
		position: absolute;
		top: 0rem;
		left: 3.79rem;
		width:0.76rem;
		height:0.76rem;
		background:rgba(126,140,127,0.6);
		box-shadow:0px 5px 36px 0px rgba(84,96,95,0.29);
		cursor: pointer;
	}
	.goodsPre img{
		position: absolute;
		top: 0.275rem;
		left: 0.325rem;
		width:0.11rem;
		height:0.21rem;
	}
	.goodsNext{
		position: absolute;
		top: 0rem;
		right: 0rem;
		width:0.76rem;
		height:0.76rem;
		background:rgba(126,140,127,0.6);
		box-shadow:0px 5px 36px 0px rgba(84,96,95,0.29);
		cursor: pointer;
		z-index: 20;
	}
	.goodsNext img{
		position: absolute;
		top: 0.275rem;
		left: 0.325rem;
		width:0.11rem;
		height:0.21rem;
	}
	.scrollX{
		position: absolute;
		width: 100%;
		height: 2.2rem;
		left: 4.55rem;
		top: -1.24rem;
		width: calc(100% - 4.55rem);
		overflow: hidden;
	}
	.scrollX .box{
		width: 100%;
		height:100%;
		padding-bottom: 30px;
		overflow-x: auto;
		overflow-y: hidden;
		position: relative;
	}
	.scrollX ul{
		position: absolute;
		width: 100%;
		top: 0rem;
		left: 0rem;
	}
	.scrollX .scrollItem{
		position: relative;
		float: left;
		width: 2rem;
		height: 2rem;
		box-sizing: border-box;
		border:3px solid rgba(255,255,255,0.6);
		box-shadow:0px 5px 36px 0px rgba(84,96,95,0.29);
		margin-right: 0.38rem;
		cursor: pointer;
		background-size:contain !important;
	}
	.listItem.active .itemNum{
		color:rgba(17,17,17,0.17);
	}
	.itemNum{
		font-size:27px;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(255,255,255,0.17);
		z-index: 20;
	}
	.item0 .itemNum{
		position: absolute;
		right: 0.45rem;
		bottom: 0.45rem;
	}
	.item1 .itemNum{
		position: absolute;
		right: 0.8rem;
		top: 0.02rem;
	}
	.item2 .itemNum{
		position: absolute;
		right: 0.3rem;
		bottom: 0.4rem;
	}
	.floorMask{
		width: 100%;
		height: 100%;
		background:rgba(4,4,4,0.3);
	}
	.address{
		position: absolute;
		bottom: 0rem;
		left: 0rem;
		width:100%;
		height: auto;
		padding: 0.3rem;
		box-sizing: border-box;
		background:rgba(0,0,0,0.6);
		font-size:0.13rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		line-height:23px;
	}
	.address h1{
		font-size:0.17rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.goodThingline1{
		position: absolute;
		width:100%;
		height:1px;
		top: 0.76rem;
		left: 0rem;
		background:rgba(210,210,210,1);
		opacity:0.3;
	}
	.goodThingline2{
		position: absolute;
		width:100%;
		height:1px;
		top: 1.52rem;
		left: 0rem;
		background:rgba(210,210,210,1);
		opacity:0.3;
	}
	.goodThingline3{
		position: absolute;
		width:1px;
		height:100%;
		left: 0.76rem;
		background:rgba(155,166,157,1);
		opacity:0.11;
	}
	.goodThingline4{
		position: absolute;
		width:1px;
		height:100%;
		left: 5.31rem;
		background:rgba(155,166,157,1);
		opacity:0.11;
	}
	.goodThingline5{
		position: absolute;
		width:1px;
		height:100%;
		right: 4.16rem;
		background:rgba(155,166,157,1);
		opacity:0.11;
	}
	.goodThingline6{
		position: absolute;
		width:1px;
		height:100%;
		right: 1.52rem;
		background:rgba(155,166,157,1);
		opacity:0.11;
	}
	.cityList{
		width: 100%;
	}
	.cityList li{
		float: left;
		width:1rem;
		height:0.5rem;
		text-align: center;
		line-height: 0.5rem;
		background:rgba(255,255,255,1);
		border:2px solid rgba(181,181,181,1);
		font-size:0.16rem;
		font-family:MicrosoftYaHei;
		font-weight:bold;
		color:rgba(153,153,153,1);
		margin-left: 0.27rem;
		text-spacing: 3px;
		position: relative;
		cursor: pointer;
		overflow: hidden;
	}
	.cityList li.active{
		background:rgba(255,255,255,1);
		border:2px solid rgba(67,67,67,1);
		font-family:MicrosoftYaHei;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.cityList li img{
		position: absolute;
		top: 0rem;
		left: 0rem;
		width: 0.1rem;
		height: 0.1rem;
	}
	.confirmBtn{
		width:90%;
		height:0.6rem;
		background: none;
		border: none;
		background:rgba(0,0,0,1);
		border-radius:4px;
		text-align: center;
		line-height: 0.6rem;
		font-size:0.20rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(255,255,255,1);
		margin: 0rem;
		padding: 0rem;
	}
	@keyframes scale{
		from{
			background-size:auto 100%;
		}
		to{
			background-size:auto 110%;
		}
	}
	
</style>
