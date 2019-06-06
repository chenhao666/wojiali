<template>
	<div class="caseSelection">
		<!--top-->
		<v-top :screenHeight='screenHeight' :introduce='introduce' :showScroll='false'></v-top>
		
		<!--案例一-->
		<!--<div class="location" :style="'height:'+screenHeight+'px;background: url('+locationList[locationIndex].img+') no-repeat center center;'" v-if="locationList.length">
			<div class="left">
				<div class="box">
					<ul :style="'height:'+(locationList.length*1.52+0.76)+'rem'">
						<li v-for="(item,index) in locationList" :key='index' @click="selectLocationFun(index)">
							<img :src="item.img" :alt="'空间'+(index+1)"/>
							<div class="locationName" v-show="locationIndex!=index">{{ item.name }}</div>
						</li>
					</ul>
				</div>
				<div class="open" @click="closeList(true)"><img src="/static/img/left.png" alt="左箭头"/>收起</div>
			</div>
	  		<div class="close" v-show="!openFlag" @click="closeList(false)"><div class="closeBox"><p>房间</p><img src="/static/img/right.png" alt="右箭头" /></div></div>
		
			<div class="topBtn prevBtn" @click="scrollTop(false,0)" v-show="topShow && locationList.length>Math.floor((screenHeight/100)/1.52)">
	  			<img src="/static/img/left.png" />
	  		</div>
	  		<div class="bottomBtn nextBtn" @click="scrollTop(true,0)" v-show="topShow && locationList.length>Math.floor((screenHeight/100)/1.52)">
	  			<img src="/static/img/right.png" />
	  		</div>
		</div>-->
		
		<!--案例-->
		<div :class="'location location'+locIndex" v-for="(locItem,locIndex) in caseList" :key='locIndex' :style="'height:'+screenHeight+'px;background: url('+locItem.locationList[locItem.locationIndex].img+') no-repeat center center;'" v-if="locItem.locationList.length">
			<div class="left">
				<div class="box">
					<ul :style="'height:'+(locItem.locationList.length*1.52+0.76)+'rem'">
						<li v-for="(item,index) in locItem.locationList" :key='index' @click="locItem.locationIndex=index">
							<img :src="item.img" :alt="'空间'+(index+1)"/>
							<div class="locationName" v-show="locItem.locationIndex!=index">{{ item.name }}</div>
						</li>
					</ul>
				</div>
				<div class="open" @click="closeList(true,locIndex)"><img src="/static/img/left.png" alt="左箭头"/>收起</div>
			</div>
	  		<div class="close" v-show="!locItem.openFlag" @click="closeList(false,locIndex)"><div class="closeBox"><p>房间</p><img src="/static/img/right.png" alt="右箭头" /></div></div>
			<!--上下切换-->
			<div class="topBtn prevBtn" @click="scrollTop(false,locIndex)" v-show="locItem.topShow && locItem.locationList.length>Math.floor((screenHeight/100)/1.52)">
	  			<img src="/static/img/left.png" />
	  		</div>
	  		<div class="bottomBtn nextBtn" @click="scrollTop(true,locIndex)" v-show="locItem.topShow && locItem.locationList.length>Math.floor((screenHeight/100)/1.52)">
	  			<img src="/static/img/right.png" />
	  		</div>
	  		<!--下一个-->
			<!--<div class="location_next">
				<p class="btn">NEXT</p>
				<p>北欧极简</p>
			</div>-->
			<div class="locationInfo">
	  			<p>{{ locItem.designName }} | {{ locItem.locationList[locItem.locationIndex].name }}</p>
	  			<p>{{ locItem.locationList[locItem.locationIndex].details }}</p>
	  		</div>
		</div>
	</div>
</template>

<script>
//引入底部子组件
import Top from '../layout/top'
//引入swipper插件
//import Swiper from 'swiper';

export default {
	name: 'caseSelection',
	props:['screenHeight'],
	data(){
		return{
			introduce:{
				bgImg:'http://images.wojiali.cn/Fma7qRww1Y73JDl5vrPgBeS47OJo',
				p1:'SELECTED CASE',
				p2:'案例精选',
				p3:'当 设 计 遇 上 生 活'
			},
			caseList:[
				{
					locationList:[
						{
							name:'餐厅',
							details:'餐厅白色简约的餐桌，餐椅则选择了黑白格纹与草绿色搭配，醒目却不失大气。灰色的背墙搭配金属画框与时尚的墙镜给餐厅空间增添了时尚气息。绿色的花瓶和餐盘与餐椅相呼应点出了空间的主题色。',
							img:'http://images.wojiali.cn/case1-1.jpg'
						},{
							name:'次卧',
							details:'同样明亮柔和的次卧最吸引人眼睛的就是绿色的装饰毯与蓝色的抱枕，大胆的撞色让次卧空间简约中流露出房主人对美的追求。次卧不多矫饰，还空间其本质，让身在其中休息的人们得以舒适与宁静。',
							img:'http://images.wojiali.cn/case1-2.jpg'
						},{
							name:'客厅1',
							details:'客厅作为居家环境中主要的生活区域，承载了房主人会客、生活的重任。白色的沙发与灰色的墙面和地垫让客厅空间更为明亮。金属元素的灯具与艺术品给空间增添了精致度与艺术感。简单大方的布置符合整个空间的布置特色，尤其是蓝色的沙发椅仿佛点睛之笔让客厅空间充满年轻气息。',
							img:'http://images.wojiali.cn/case1-3.jpg'
						},{
							name:'客厅2',
							details:'',
							img:'http://images.wojiali.cn/case1-4.jpg'
						},{
							name:'玄关',
							details:'',
							img:'http://images.wojiali.cn/case1-5.jpg'
						},{
							name:'主卧',
							details:'整个主卧以灰白色调为主，柔和的色调使人放松同时也让卧室空间干净明亮。同样白色的床头柜与台灯，以金属元素做点缀，温暖却不失精致。绿色的地垫与装饰毯则给空间增添了与窗帘上那一抹绿相呼应，让主卧充满协调感。',
							img:'http://images.wojiali.cn/case1-6.jpg'
						}
					],
					designName:'美式轻奢风格',
					locationIndex:0,//当前选中的空间
					topShow:true,
					openFlag:true
				},
				{
					locationList:[
						{
							name:'客厅',
							details:'整个客厅色调较为稳重，简约却时尚有韵味，给人一种安静、舒适却不失品味的感觉。白色弧形沙发给客厅空间带来一丝轻松，蓝色的抱枕呼应主题色。黑色与金属色搭配的弧形茶几与沙发相呼应。客厅空间整体除了满足正常的生活需求外，也将艺术的审美展现到了极致。',
							img:'http://images.wojiali.cn/case1-1.jpg'
						},{
							name:'餐厅',
							details:'餐厅空间，玻璃餐桌线条简单颜色大气，餐椅选择弧形椅背提升用餐时的舒适感，颜色与餐桌相似。蓝色餐盘呼应整体主题色，精致的绿植与配饰让餐厅空间简单却很时尚。',
							img:'http://images.wojiali.cn/case1-2.jpg'
						},{
							name:'主卧',
							details:'主卧，暖黄色的背景板让卧室空间温馨舒适。棕色的床板搭配背景板很好的整合了整个空间。精致的床上用品，蓝色的床罩无不流露着现代轻奢优雅而简约之美。',
							img:'http://images.wojiali.cn/case1-3.jpg'
						},{
							name:'次卧',
							details:'次卧，同样温暖的暖黄色背景板。白色与黑色搭配的床板与以蓝色为主色调的床上用品轻易就能营造出素雅清爽的感觉。金属元素的台灯与配饰则更好的提升了次卧空间的奢华感。',
							img:'http://images.wojiali.cn/case1-4.jpg'
						}
					],
					designName:'现代轻奢、三室两厅',
					locationIndex:0,//当前选中的空间
					topShow:true,
					openFlag:true
				}
			],
		}
	},
	mounted(){
		
	},
	methods:{
		//滚动
		scrollTop(flag,index){
			if(flag){
				let top=$('.location'+index+' .box').scrollTop();
				$('.location'+index+' .box').scrollTop(top+100);
			}else{
				let top=$('.location'+index+' .box').scrollTop();
				$('.location'+index+' .box').scrollTop(top-100);
			}
		},
		//选择空间
		/*selectLocationFun(index,locIndex){
			this.caseList[locIndex].locationIndex=index;
		},*/
		//收起列表
		closeList(flag,index){
			let that=this;
			let deviceWidth = document.documentElement.clientWidth >1920 ? 1920 : document.documentElement.clientWidth < 1024 ? 1024 : document.documentElement.clientWidth
			let left=deviceWidth/13.66*2.28;
			if(flag){
				this.caseList[index].topShow=false;
				$('.location'+index+' .left').animate({left:-left},2000,function(){
					that.caseList[index].openFlag=false;
				})
			}else{
				this.caseList[index].openFlag=true;
				$('.location'+index+' .left').animate({left:0},2000,function(){
					that.caseList[index].topShow=true;
				})
			}
		},		
	},
	components:{'v-top':Top}
}

</script>

<style scoped="scoped">
.location{
	width: 100%;
	overflow: hidden;
	position: relative;
	background-size:100% auto !important;
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
	background: url(http://images.wojiali.cn/Fma7qRww1Y73JDl5vrPgBeS47OJo) no-repeat center center;
	background-size:100% auto;
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
.location_next{
	position: absolute;
	bottom: 0rem;
	right: 0rem;
	width:1.52rem;
	height:0.76rem;
	background:rgba(126,140,127,1);
	font-size:0.17rem;
	font-family:Adobe Heiti Std R;
	font-weight:normal;
	color:rgba(255,255,255,1);
	text-align: center;
	cursor: pointer;
}

.location_next p{
	line-height: 0.22rem;
}
.location_next .btn{
	margin-top: 0.16rem;
}
.location_next .btn:after{
	content: '';
	background: url(/static/img/right.png) no-repeat center center;
	background-size: 0.06rem 0.11rem;
	transform: rotate(90deg);
	width: 0.06rem;
	height: 0.11rem;
	position: absolute;
	right: 0.4rem;
	top: 0.22rem;
}
.locationInfo {
	position: absolute;
	left: 2.6rem;
	bottom: 1.3rem;
	width: 7.33rem;
	word-break: break-all;
	font-size:0.46rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(255,255,255,1);
	z-index: 30;
}
.locationInfo p:last-child{
	font-size: 0.2rem;
	font-weight:500;
	line-height: 150%;
	font-family:MicrosoftYaHei;
	color:rgba(255,255,255,1);
	margin-top: 0.2rem;
}
</style>