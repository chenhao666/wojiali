<template>
	<div class="wapStylePai">
		<v-wapTop :topData='topData'></v-wapTop>
		
		<!--风格派列表-->
		<div class="stylePaiList">
			<div class="top">
				<div class="classType">
					<ul>
						<li :class="selectIndex==0?'active':''" @click="selectType(0)"><span>全部</span></li>
						<li :class="selectIndex==1?'active':''" @click="selectType(1)"><span>时尚网红</span></li>
						<li :class="selectIndex==2?'active':''" @click="selectType(2)"><span>与众不同</span></li>
						<li :class="selectIndex==(index+3)?'active':''" @click="selectType(index+3)" v-for="(item,index) in classTypeList" :key="index"><span>{{ item.styleName }}</span></li>
						<div class="clear"></div>
					</ul>
					<div class="typeMore" @click="openMore=!openMore"></div>
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
				<div class="mask" v-show="openMore" @click="openMore=false"></div>
				<!-- v-show="selectName!='全部'"-->
				<div class="title" v-show="selectName!='全部'">{{ selectName }}</div>
				
				<div class="list">
					<ul>
						<li v-for="(item,index) in styleList" :key='index' @click="goInfo(item)">
							<img :src="item.coverPic" alt="" />
							<div class="decBox">
								<p class="name">{{ item.designName }}</p>								
								<p class="des">{{ item.details }}</p>
							</div>
						</li>
					</ul>
				</div>
			</div>
			
			<!--更多-->
			<div class="more" @click="loadMore" v-show="showMoreFlag">LOAD MORE</div>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'wapStylePai',
  		data(){
  			return{
  				topData:{
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
				this.$router.push({path:'/wap/stylePai/info/'+code})
			}
		}
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
						list[i].details=list[i].details.replace(/[\s\r\n]/g,"");
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
							list[i].details=list[i].details.replace(/[\s\r\n]/g,"");
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
		width: 100%;
		margin-top: 0.6rem;
	}
	.top{
		position: relative;
	}
	.top .classType{
		height: 0.5rem;
		overflow: hidden;
		position: relative;
		padding: 0.2rem 0rem;
		border-bottom: 1px solid #EEEEEE;
	}
	.top .classType ul{
		width: 10rem;
		position: absolute;
		top: 0rem;
		left: 0rem;
		height:100%;
	}
	.top .classType li{
		float: left;
		width: 1.55rem;
		height: 0.5rem;
		line-height: 0.5rem;
		padding: 0.2rem 0rem;
		text-align: center;
		font-size:0.28rem;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(179,179,179,1);
		opacity:0.9;
		cursor: pointer;
	}
	.top .classType li span{
		display: inline-block;
		width: 100%;
		border-right:1px solid rgba(0,0,0,0.1);;
	}
	.top .classType li.active{
		font-size:0.28rem;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(0,0,0,1);
	}
	.classType .typeMore{
		position: absolute;
		top: 0.2rem;
		right: 0rem;
		width: 1rem;
		height: 0.5rem;
		cursor: pointer;
		background:linear-gradient(to right, rgba(255,255,255,0.9) 0%, rgba(255,255,255,1)  100%);
	}
	.classType .typeMore:after{
		content:'';
		position: absolute;
		border-right: 1px solid #000;
		border-bottom: 1px solid #000;
		transform:rotate(45deg);
		top: 0.1rem;
		right: 0.3rem;
		width: 0.2rem;
		height: 0.2rem;
	}
	.content .title{
		width: 100%;
		font-size:0.3rem;
		text-align: center;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(25,25,25,1);
	}
	.list  ul{
		margin-top: 0.1rem;
	}
	.list li{
		margin-top: 0.4rem;
		width: 90%;
		margin-left: 5%;
		height: auto;
		box-sizing: border-box;
		position: relative;
	}
	.list li img{
		display: block;
		width: 100%;
		height: auto;
		border-radius:20px;
	}
	.list .decBox{
		width: 100%;
		position: absolute;
		bottom: 0.3rem;
		left: 0rem;
	}
	.list .decBox p{
		width: 100%;
		padding: 0rem 0.4rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 0.22rem;
		font-weight: 400;
		font-family:MicrosoftYaHei-Bold;
		color:rgba(255,255,255,1);
		box-sizing: border-box;
	}
	.list .decBox .name{
		font-size:0.28rem;
		font-weight:bold;
		margin-bottom: 0.2rem;
	}
	.content{
		width: 100%;
		height: auto;
		position: relative;
		padding-top: 0.57rem;
		padding-bottom: 0.3rem;
	}
	.mask{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0rem;
		left: 0rem;
		background:rgba(0,0,0,0.5);
		z-index: 30;
	}
	.allTypeList{
		position: absolute;
		top: 0.9rem;
		left: 0rem;
		z-index: 50;
		width: 100%;
		height: auto;
		padding: 0.4rem;
		box-sizing: border-box;
		background: #ffffff;
	}
	.allTypeList li{
		float: left;
		height: 0.5rem;
		text-align: center;
		line-height: 0.5rem;
		margin: 0.3rem;
		font-size:0.28rem;
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(179,179,179,1);
		opacity:0.9;
		cursor: pointer;
	}
	.allTypeList li.active{
		font-family:PingFang-SC-Bold;
		font-weight:bold;
		color:rgba(0,0,0,1);
	}
	.more{
		margin: 0 auto;
		margin-bottom: 0.5rem;
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