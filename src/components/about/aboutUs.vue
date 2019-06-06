<template>
	<div class="aboutUs">
		<!--top-->
		<v-top :screenHeight='screenHeight' :introduce='introduce' :showScroll='false'></v-top>
		
		<!--aboutUs-->
		<div class="info">
			<div class="top">
				<h1 class="title">浙江优家云科技有限公司 （窝家里，STAY HOME）</h1>
				<div class="introduce">
					浙江优家云科技有限公司 （窝家里，STAY HOME）是浙江金成控股集团战略投资的，以设计驱动，数据和技术赋能的家居新零售企业。作为家居新零售3.0时代的开启者，窝家里联合新锐设计师打造原创家居品牌、集合全球设计产品、重新定义线下家居消费场景，并通过共享设计，虚拟、互联网等技术为用户提供全新的线上线下家居产品、设计、体验和服务。
                </div>
                <div class="line"></div>
                <div class="contact">	
				    <p>电话：400-966-7757</p>
					<p>微博：窝家里</p>
					<p>邮箱：open@wojiali.cn</p>  
                </div>
			</div>
			<div class="line2"></div>
			
			<h3>我们的足迹</h3>
			
			<div class="development">
				
				<div class="mainLine"></div>
				<div class="box">
					<ul :style="'width:'+develpment.length*2.5+'rem'">
						<li v-for="(item,index) in develpment" :key='index' :class="index%2==0?'devFlexTop':'devFlexBottom'">
							<div class="devInfo" v-show="index%2==0">
								<h1>{{ item.name }}</h1>
								<h2>{{ item.time }}</h2>
							</div>	
							<div class="devInfo" v-show="index%2!=0">
								<h2>{{ item.time }}</h2>
								<h1>{{ item.name }}</h1>
							</div>	
							<div class="devCircle"></div>
							<div class="devLine"></div>
						</li>
						<div class="clear"></div>
					</ul>
				</div>
	  			<!-- 如果需要导航按钮 -->
		  		<div class="prevBtn" @click="scrollLeft(false)">
		  			<img src="/static/img/left.png" />
		  		</div>
		  		<div class="nextBtn" @click="scrollLeft(true)">
		  			<img src="/static/img/right.png" />
		  		</div>
	  		</div>
	  		
	  		<!--<h2>
	  			<p>2018.03.08</p>
	  			<p>浙江优家云科技有限公司注册成立</p>
	  		</h2>-->
	  		<!--服务-->
	  		<div class="sever">
	  			<div class="box">
	  				<div class="title">服务流程</div>
	  				<div class="list">
		  				<div :class="serverIndex==index?'item active':'item'" v-for="(item,index) in serverList" :key='index' @mouseover="serverIndex=index" @mouseleave="serverIndex=-1">
		  					<img :src="item.img" :alt="item.name"/>
		  					<div class="sever_title" v-show="serverIndex!=index">{{ item.name }}</div>
		  					<div class="maskFont animated fadeInUp" v-show="serverIndex==index">
		  						<h1>{{ item.name }}</h1>
		  						<div class="des">
                           			{{ item.dec }}
                       	 		</div>
		  					</div>
		  				</div>
		  			</div>
	  			</div>
	  		</div>
	  		
	  		<div class="serverInfo">
	  			<div class="serverInfoBg">
	  				<h1>甄选世界顶级设计师服务</h1>
	  				<h2>为您量身定制专属服务</h2>
	  			</div>
	  			<div class="serverDec">
	  				<h1>设计师服务</h1>
	  				<div class="dec">窝家里设计实力雄厚，专业的设计团队拥有多年从业经验。团队内每位设计师都有出众的业务实力，实战经验丰富。热情、敬业、充满创意是窝家里每个设计师最基本的从业准则。每一次投入都充满了美与生活，微妙的结合打破了固有的设计理念却保留了精致与优雅。根据您的不同需求、使用功能及空间环境等方面为您量身定制各种风格的家具及配饰，打造年轻人的专属空间。</div>
	  			</div>
	  		</div>
	  		
	  		<div class="store">
	  			<div class="storeLine"></div>
	  			<h1>线下实体体验店</h1>
	  			<div class="storeList">
	  				<div class="item">
	  					<img src="/static/img/store1.png" alt="窝家里杭州英特学府社区店"/>
	  					<div class="dec">
	  						<h1>窝家里杭州英特学府社区店</h1>
	  						<span>浙江省杭州市余杭区天目山路与城东路交叉口英特学府芯寓6-6号</span>
	  					</div>
	  				</div>
	  				<div class="item">
	  					<img src="/static/img/store2.png" alt="窝家里海南博鳌金湾社区店"/>
	  					<div class="dec">
	  						<h1>窝家里海南博鳌金湾社区店</h1>
	  						<span>海南省琼海市博鳌滨海大道8号博鳌金湾商业街</span>
	  					</div>
	  				</div>
	  			</div>
	  		</div>
	  		
	  		<div class="brand">
	  			<h1>品牌合作伙伴</h1>
	  			<img src="/static/img/brand.png" alt="合作品牌"/>
	  		</div>
	  	</div>
	</div>
</template>

<script>
//引入底部子组件
import Top from '../layout/top'
export default {
	name: 'aboutUs',
	props:['screenHeight'],
	data(){
		return{
			introduce:{
				bgImg:'http://images.wojiali.cn/Fma7qRww1Y73JDl5vrPgBeS47OJo',
				p1:'ABOUT US',
				p2:'关于我们',
				p3:'窝家里 打造年轻人的专属空间'
			},
			showMaskIndex:-1,//遮罩层下标
			serverList:[
				{
					img:'/static/img/aboutImg1.png',
					name:'户型定制',
					dec:'通过实地测量户型制定多套专属方案；您也可以与设计师直接沟通，设计团队将根据您的需求与喜好，免费定向服务'
				},{
					img:'/static/img/aboutImg2.png',
					name:'一键下单',
					dec:'选择方案内的商品，一站式购齐'
				},{
					img:'/static/img/aboutImg3.png',
					name:'现场还原',
					dec:'专业人员为您现场还原，所见即所得'
				},{
					img:'/static/img/aboutImg4.png',
					name:'售后服务',
					dec:'合作对象均为品牌产品，拥有完善、快捷的售后服务流程'
				}
			],//服务数组
			serverIndex:-1,//服务数组下标
			develpment:[
				{
					name:'浙江优家云科技有限公司注册成立',
					time:'2018.03.08'
				},{
					name:'“窝家里项目”被杭州未来科技城管委会评定为海归扶持项目',
					time:'2018.04.26'
				},{
					name:'“窝家里”APP试用版上线',
					time:'2018.07.18'
				},{
					name:'“窝家里”开设首家线下社区店（融创.金成博鳌金湾）',
					time:'2018.09.22'
				},{
					name:'公司正式入驻中国人工智能小镇',
					time:'2018.12.25'
				},{
					name:'“窝家里”日本行，与日本家居品牌Real Style签订战略合作协议',
					time:'2019.3.16'
				},{
					name:'“窝家里”官网上线',
					time:'2019. 4'
				}
			],//发展历程
		}
	},
	mounted(){
		this.showRight();
	},
	inject:['reload','hideRight','showRight'],
	methods:{
		//横向滚动
		scrollLeft(flag){
			if(flag){
				let left=$('.development .box').scrollLeft();
				$('.development .box').scrollLeft(left+100);
			}else{
				let left=$('.development .box').scrollLeft();
				$('.development .box').scrollLeft(left-100);
			}
		},	
	},
	components:{'v-top':Top}
}

</script>

<style scoped="scoped">
.info{
	width: 100%;
	height: auto;
	background:rgba(245,247,248,1);
	position: relative;
	padding-top:5rem;
}
.info .top{
	position: absolute;
	width: 60%;
	top: -0.76rem;
	left: 50%;
	transform: translateX(-50%);
	padding: 0.6rem 0.8rem;
	box-sizing: border;
	background:rgba(255,255,255,1);
	box-shadow:0px 4px 38px 0px rgba(79,93,80,0.1);
}
.info .title{
	font-size:0.23rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
}
.info .introduce{
	font-size:0.17rem;
	font-family:MicrosoftYaHeiLight;
	font-weight:400;
	color:#444444;
	line-height: 0.34rem;
	margin-top: 0.3rem;
}
.info .line{
	width:100%;
	height:1px;
	background:rgba(220,220,220,1);
	opacity:0.3;
	margin-top: 0.7rem;
}
.contact{
	margin-top: 0.47rem;
	font-size:0.17rem;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(68,68,68,1);
}
.contact p{
	margin-top: 0.2rem;
}
.info .line2{
	margin: 0 auto;
	width:3px;
	height:0.47rem;
	background:rgba(68,68,68,1);
}
.info h3{
	text-align: center;
	font-size:0.28rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	margin-top: 0.41rem;
}
.swiper-container{
	position: relative;
	width: 100%;
}
.development{
	position: relative;
	width:100%;
	margin: 0 auto;
	height: 4.55rem;
	margin-top: 0.58rem;
	overflow: hidden;
}
.swiper-container img{
	width: 7.6rem;
	height: 4.55rem;
	display: block;
}
.prevBtn{
	position: absolute;
	width:0.76rem;
	height:0.76rem;
	background:rgba(0,0,0,1);
	opacity:0.6;
	bottom: 0rem;
	left:0.76rem;
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
	width:0.76rem;
	height:0.76rem;
	background:rgba(0,0,0,1);
	opacity:0.6;
	bottom: 0rem;
	right:0.76rem;
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
.info h2{
	font-size:0.34rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
	text-align: center;
	margin-top: 0.49rem;
}
.info h2 p:last-child{
	font-size:0.23rem;
	font-family:MicrosoftYaHei;
	font-weight:500;
	color:rgba(68,68,68,1);
	margin-top: 0.1rem;
}
.sever{
	width: 100%;
	padding-bottom: 0.5rem;
	background: #ffffff;
	margin-top: 1.75rem;
}
.sever .box{
	padding:0.3rem 0.76rem;
	box-sizing: border-box;
	width: 80%;
	margin-left: 10%;
	height: 4.57rem;
	background: url(/static/img/serverBg.png) no-repeat center center;
	background-size:auto 100%;
}
.sever .list{
	width: 100%;
	display: flex;
	justify-content: space-between;
	margin-top: 0.7rem;
}
.sever .item{
	width:1.90rem;
	height:2.28rem;
	border:5px solid rgba(229,229,229,1);
	cursor: pointer;
}
.sever .item.active{
	background:rgba(0,0,0,0.5);
}
.maskFont h1{
	font-size:0.14rem;
	text-align: center;
	margin-top: 0.2rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(255,255,255,1);
}
.maskFont .des{
	font-size:0.12rem;
	text-align: center;
	margin-top: 0.1rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(255,255,255,1);
}
.sever .title{
	font-size:0.34rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(0,0,0,1);
	text-align: center;
}
.sever img{
	width: 0.5rem;
	height: 0.5rem;
	display: block;
	margin: 0 auto;
	margin-top: 0.4rem;
	z-index: 40;
}
.sever_title{
	width: 100%;
	text-align: center;
	font-size:0.23rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	margin-top: 0.6rem;
	color:rgba(255,255,255,1);
}
.mainLine{
	width:100%;
	height:1px;
	background:rgba(126,140,127,1);
	border:1px solid rgba(126,140,127,1);
	position: absolute;
	top: 50%;
	margin-top: 3px;
	left: 0rem;
}
.development .box{
	width: 100%;
	height:100%;
	padding-bottom: 30px;
	overflow-x: auto;
	overflow-y: hidden;
	position: relative;
}
.development .box  ul{
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0rem;
	left: 0rem;
}
.development .box li{
	width: 3.2rem;
	height: 100%;
	float: left;
	position: relative;
	margin-left: -1rem;
	text-align: center;
}
.development .box li:first-child{
	margin-left: 0.76rem;
}
.devFlexTop .devLine{
	position: absolute;
	bottom:50%;
	width:1px;
	left: 50%;
	height:0.71rem;
	background:rgba(126,140,127,1);
}
.devFlexTop .devCircle{
	position: absolute;
	bottom: 50%;
	margin-bottom: 0.71rem;
	left: 50%;
	transform: translateX(-50%);
	width:19px;
	height:19px;
	background:rgba(126,140,127,1);
	border-radius:50%;
}
.devFlexTop .devInfo{
	position: absolute;
	margin-bottom: 1.2rem;
	bottom: 50%;
	left: 0rem;
	width: 100%;
}
.devInfo h1{
	width: 100%;
	font-size:0.19rem;
	font-family:MicrosoftYaHei;
	font-weight:400;
	color:rgba(68,68,68,1);
	margin-top: 0.1rem;
}
.devInfo h2{
	width: 100%;
	font-size: 0.23rem;
	font-weight: bold;
	margin-top: 0.1rem;
}
.devFlexBottom .devLine{
	position: absolute;
	top:50%;
	width:1px;
	left: 50%;
	height:0.71rem;
	background:rgba(126,140,127,1);
}
.devFlexBottom .devCircle{
	position: absolute;
	top: 50%;
	margin-top: 0.71rem;
	left: 50%;
	transform: translateX(-50%);
	width:19px;
	height:19px;
	background:rgba(126,140,127,1);
	border-radius:50%;
}
.devFlexBottom .devInfo{
	position: absolute;
	margin-top: 1.2rem;
	top: 50%;
	left: 0rem;
	width: 100%;
}
.serverInfo{
	background: #ffffff;
	width: 100%;
	padding-top: 0.82rem;
	position: relative;
	min-height:9rem;
}
.serverInfoBg{
	width: 100%;
	height: 4rem;
	padding-top: 1.2rem;
	box-sizing: border-box;
	background: url(/static/img/aboutUsBg.png) no-repeat center center;
	background-size: auto 100%;
}
.serverInfoBg h1{
	text-align: center;
	font-size:0.36rem;
	height: 0.4rem;
	line-height: 0.4rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
}
.serverInfoBg h2{
	text-align: center;
	font-size:0.3rem;
	height: 0.4rem;
	line-height: 0.4rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:400;
	color:#444444;
	margin-top: 0.2rem;
}
.serverDec{
	position: absolute;
	width:80%;
	left: 10%;
	z-index: 20;
	padding: 0.8rem;
	box-sizing: border-box;
	height:4.8rem;
	top:4.82rem;
	margin-top: -1rem;
	background:rgba(255,255,255,1);
	box-shadow:0px 4px 40px 0px rgba(79,93,80,0.1);
	background: #ffffff;
}
.serverDec h1{
	font-size:0.24rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
}
.serverDec .dec{
	margin-top: 0.3rem;
	word-break: break-all;
	font-size:0.18rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:400;
	line-height: 200%;
	color:#444444;
}
.store{
	width: 100%;
	height: auto;
	background: #ffffff;
	padding-bottom: 1.8rem;
}
.storeLine{
	margin: 0 auto;
	width:3px;
	height:0.5rem;
	background:rgba(68,68,68,1);
}
.store h1{
	text-align: center;
	margin: 0 auto;
	margin-top: 0.5rem;
	font-size:0.3rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
}
.storeList{
	width: 100%;
	margin-top: 0.8rem;
	display: flex;
	justify-content: space-between;
	flex-direction: row;
	padding: 0 0.8rem;
	box-sizing: border-box;
}
.storeList .item{
	width: 5.6rem;
	height: 3rem;
	position: relative;
}
.storeList .item img{
	width: 5.6rem;
	height: 3rem;
}
.storeList .dec{
	width: 4.5rem;
	padding: 0.45rem;
	left:50%;
	box-sizing: border-box;
	height: auto;
	word-break: break-all;
	position: absolute;
	bottom: 0;
	transform: translate(-50%,50%);
	background: #ffffff;
	box-shadow:0px 4px 40px 0px rgba(79,93,80,0.1);
}
.storeList .dec h1{
	margin: 0px;
	text-align: center;
	font-size:0.24rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
}
.storeList .dec span{
	display: block;
	text-align: center;
	font-size:0.18rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:400;
	color:rgba(68,68,68,1);
	margin-top: 0.1rem;
}
.brand{
	margin-top: 0.1rem;
	width: 100%;
	height: auto;
	background: #ffffff;
	padding: 1rem;
	box-sizing: border-box;
	font-size: 16px;
}
.brand h1{
	text-align: center;
	margin: 0px;
	font-size:0.3rem;
	font-family:MicrosoftYaHei-Bold;
	font-weight:bold;
	color:rgba(68,68,68,1);
}
.brand img{
	display: block;
	width: 80%;
	height: auto;
	margin: 0 auto;
	margin-top: 1rem;
}
</style>