<template>
	<div class="wapAboutUs">
		<v-wapTop :topData='topData'></v-wapTop>
		
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
					<ul>
						<li v-for="(item,index) in develpment" :key='index' :class="index%2==0?'devFlexTop':'devFlexBottom'">
							<div class="devInfo">
								<h1>{{ item.name }}</h1>
								<h2>{{ item.time }}</h2>
							</div>
							<div class="clear"></div>
							<!--<div class="devCircle"></div>
							<div class="devLine"></div>-->
						</li>
						<div class="clear"></div>
					</ul>
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
		  				<div class="item" v-for="(item,index) in serverList" :key='index'>
		  					<img :src="item.img" :alt="item.name"/>
		  					<div class="sever_title">{{ item.name }}</div>
		  				</div>
		  			</div>
	  			</div>
	  		</div>
	  		
	  		<div class="serverInfo">
	  			<div class="serverInfoBg"><!--
	  				<h1>甄选世界顶级设计师服务</h1>
	  				<h2>为您量身定制专属服务</h2>-->
	  			</div>
	  			<div class="serverDec">
	  				<h1>设计师服务</h1>
	  				<div class="dec">窝家里设计实力雄厚，专业的设计团队拥有多年从业经验。团队内每位设计师都有出众的业务实力，实战经验丰富。热情、敬业、充满创意是窝家里每个设计师最基本的从业准则。每一次投入都充满了美与生活，微妙的结合打破了固有的设计理念却保留了精致与优雅。根据您的不同需求、使用功能及空间环境等方面为您量身定制各种风格的家具及配饰，打造年轻人的专属空间。</div>
	  			</div>
	  		</div>
	  		
	  		<div class="store">
	  			<div class="storeLine"></div>
	  			<h1>线下实景体验店</h1>
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
	export default {
  		name: 'wapAboutUs',
  		data(){
  			return{
  				topData:{
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
  		methods:{
  			
  		}
	}
</script>

<style scoped="scoped">
	.info{
		width: 100%;
		height: auto;
		background:rgba(245,247,248,1);
		position: relative;
		padding-top:7rem;
	}
	.info .top{
		position: absolute;
		width: 90%;
		top: -0.76rem;
		left: 5%;
		padding: 0.4rem 0.3rem;
		box-sizing: border-box;
		height:7rem;
		background:rgba(255,255,255,1);
		box-shadow:0px 4px 38px 0px rgba(79,93,80,0.1);
	}
	.info .top h1{
		font-size:0.24rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.info .top .introduce{
		font-weight:400;
		margin-top: 0.5rem;
		line-height: 150%;
		word-break: break-all;
		font-size:0.24rem;
		font-family:MicrosoftYaHei-Bold;
		color:rgba(68,68,68,1);
	}
	.contact{
		font-size:0.24rem;
		font-family:MicrosoftYaHei;
		font-weight:400;
		color:rgba(68,68,68,1);
		line-height:200%;
		margin-top: 0.6rem;
	}
	.line2{
		margin: 0 auto;
		margin-top: 0.5rem;
		width:3px;
		height:0.5rem;
		background:rgba(68,68,68,1);
	}
	.info h3{
		width: 100%;
		text-align: center;
		font-size:0.28rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
		height: 0.4rem;
		line-height: 0.4rem;
		margin-top: 0.38rem;
	}
	.development{
		margin-top: 0.5rem;
		position: relative;
	}
	.mainLine{
		margin: 0 auto;
		width:1px;
		height:10rem;
		background: #7E8C7F;
	}
	.development .box{
		position: absolute;
		top: 0rem;
		left: 0rem;
		width: 100%;
	}
	.development .box li{
		width: 100%;
		text-align: left;
		position: relative;
		margin-top: 0.2rem;
	}
	.development .box .devFlexTop .devInfo{
		float: left;
		width: 40%;
		margin-left: 5%;
		word-break: break-all;
	}
	.development .box .devFlexBottom .devInfo{
		float: right;
		width: 40%;
		margin-right: 5%;
		word-break: break-all;
	}
	.development .box h1{
		font-weight: bold;
		font-size: 0.24rem;
		font-family:MicrosoftYaHei-Bold;
	}
	.development .box h2{
		font-weight: 400;
		font-size: 0.24rem;
		font-family:MicrosoftYaHei;
		margin-top: 0.2rem;
	}
	.sever{
		width: 100%;
		margin-top:0.5rem;
	}
	.sever .box{
		padding: 0.4rem 0.7rem;
		box-sizing: border-box;
		width: 90%;
		margin-left: 5%;
		height: 2.9rem;
		background: url(/static/img/wap/aboutUsBg.png) no-repeat center center;
		background-size:auto 100%;
	}
	.sever .box .title{
		width: 100%;
		font-size:0.3rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(255,255,255,1);
		height: 0.5rem;
		line-height: 0.5rem;
		text-align: center;
	}
	.sever .list{
		width: 100%;
		display: flex;
		justify-content: space-between;
		margin-top: 0.5rem;
	}
	.sever .item{
		width:1.5rem;
		height:1.5rem;
		cursor: pointer;
	}
	.sever .item img{
		display: block;
		width: 0.45rem;
		height: 0.45rem;
		margin: 0 auto;
	}
	.sever .sever_title{
		width: 100%;
		margin-top: 0.2rem;
		height: 0.4rem;
		line-height: 0.4rem;
		text-align: center;
		font-size:0.24rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(255,255,255,1);
	}
	.serverInfo{
		width: 100%;
		padding-top: 0.5rem;
		position: relative;
		min-height:8rem;
	}
	.serverInfoBg{
		width: 100%;
		height: 1.9rem;
		padding-top: 0.5rem;
		box-sizing: border-box;
		background: url(/static/img/wap/aboutUsBg2.png) no-repeat center center;
		background-size: auto 100%;
	}
	.serverDec{
		position: absolute;
		width: 90%;
		top:2rem;
		left: 5%;
		border-radius: 20px;
		background: #ffffff;
		padding: 0.4rem 0.3rem;
		box-sizing: border-box;
		height: 5.5rem;
	}
	.serverDec h1{
		height: 0.4rem;
		line-height: 0.4rem;
		font-size:0.24rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.serverDec .dec{
		font-size:0.24rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:400;
		margin-top: 0.5rem;
		line-height: 200%;
		color:rgba(68,68,68,1);
	}
	.storeLine{
		margin-top: 0.5rem;
		margin: 0 auto;
		width:3px;
		height:0.5rem;
		background:rgba(68,68,68,1);
	}
	.store h1{
		font-size:0.28rem;
		height: 0.4rem;
		line-height: 0.4rem;
		text-align: center;
		margin-top: 0.5rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.storeList{
		width: 100%;
	}
	.storeList .item{
		margin-top: 0.5rem;
		width: 90%;
		margin-left: 5%;
		padding-bottom: 1.4rem;
		position: relative;
	}
	.storeList .item img{
		display: block;
		width: 100%;
		height: auto;
	}
	.storeList .item .dec{
		background: #ffffff;
		width: 90%;
		left: 5%;
		position: absolute;
		bottom: 0.4rem;
		height:1.8rem;
		padding: 0.3rem;
		box-sizing: border-box;
		background:rgba(255,255,255,1);
		box-shadow:0px 4px 40px 0px rgba(79,93,80,0.1);
	}
	.storeList .item .dec h1{
		font-size:0.3rem;
		margin: 0px;
		padding: 0px;
		text-align: left;
		height: 0.4rem;
		line-height: 0.4rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.storeList .item .dec  span{
		font-size: 0.24rem;
		line-height: 150%;
		word-break: break-all;
		display: block;
		font-weight:400;
		font-family:MicrosoftYaHei;
		color:rgba(68,68,68,1);
		margin-top: 0.2rem;
	}
	.brand{
		margin-top: 0.5rem;
		padding-bottom: 0.3rem;
	}
	.brand h1{
		font-size:0.28rem;
		height: 0.4rem;
		line-height: 0.4rem;
		text-align: center;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	.brand img{
		display: block;
		width:90%;
		margin-left: 5%;
		height: auto;
		margin-top: 0.5rem;
	}
</style>