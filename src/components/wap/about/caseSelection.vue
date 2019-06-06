<template>
	<div class="wapCaseSelection">
		<v-wapTop :topData='topData'></v-wapTop>
		
		<div class="caseList">
			<div class="item" v-for="(item,index) in caseList" :key='index'>
				<div class="line"></div>
				<h1>{{ item.designName }}</h1>
				
				<div :class="'case_swiper'+index+' swiper-container'" v-if="item.locationList.length">
					<div class="swiper-wrapper">
						<div class="swiper-slide" v-for="(childrenItem,childrenIndex) in item.locationList" :key="childrenIndex">
							<div class="imgBox" :style="'background:url('+childrenItem.img+') no-repeat center bottom;'"></div>
							<div class="dec">
								<h1>{{ childrenItem.name }}</h1>
								<h2>{{ childrenItem.details }}</h2>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
  		name: 'wapCaseSelection',
  		data(){
  			return{
  				topData:{
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
								img:'http://images.wojiali.cn/case1-1.jpg-scaleW'
							},{
								name:'次卧',
								details:'同样明亮柔和的次卧最吸引人眼睛的就是绿色的装饰毯与蓝色的抱枕，大胆的撞色让次卧空间简约中流露出房主人对美的追求。次卧不多矫饰，还空间其本质，让身在其中休息的人们得以舒适与宁静。',
								img:'http://images.wojiali.cn/case1-2.jpg-scaleW'
							},{
								name:'客厅1',
								details:'客厅作为居家环境中主要的生活区域，承载了房主人会客、生活的重任。白色的沙发与灰色的墙面和地垫让客厅空间更为明亮。金属元素的灯具与艺术品给空间增添了精致度与艺术感。简单大方的布置符合整个空间的布置特色，尤其是蓝色的沙发椅仿佛点睛之笔让客厅空间充满年轻气息。',
								img:'http://images.wojiali.cn/case1-3.jpg-scaleW'
							},{
								name:'客厅2',
								details:'',
								img:'http://images.wojiali.cn/case1-4.jpg-scaleW'
							},{
								name:'玄关',
								details:'',
								img:'http://images.wojiali.cn/case1-5.jpg-scaleW'
							},{
								name:'主卧',
								details:'整个主卧以灰白色调为主，柔和的色调使人放松同时也让卧室空间干净明亮。同样白色的床头柜与台灯，以金属元素做点缀，温暖却不失精致。绿色的地垫与装饰毯则给空间增添了与窗帘上那一抹绿相呼应，让主卧充满协调感。',
								img:'http://images.wojiali.cn/case1-6.jpg-scaleW'
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
								img:'http://images.wojiali.cn/case1-1.jpg-scaleW'
							},{
								name:'餐厅',
								details:'餐厅空间，玻璃餐桌线条简单颜色大气，餐椅选择弧形椅背提升用餐时的舒适感，颜色与餐桌相似。蓝色餐盘呼应整体主题色，精致的绿植与配饰让餐厅空间简单却很时尚。',
								img:'http://images.wojiali.cn/case1-2.jpg-scaleW'
							},{
								name:'主卧',
								details:'主卧，暖黄色的背景板让卧室空间温馨舒适。棕色的床板搭配背景板很好的整合了整个空间。精致的床上用品，蓝色的床罩无不流露着现代轻奢优雅而简约之美。',
								img:'http://images.wojiali.cn/case1-3.jpg-scaleW'
							},{
								name:'次卧',
								details:'次卧，同样温暖的暖黄色背景板。白色与黑色搭配的床板与以蓝色为主色调的床上用品轻易就能营造出素雅清爽的感觉。金属元素的台灯与配饰则更好的提升了次卧空间的奢华感。',
								img:'http://images.wojiali.cn/case1-4.jpg-scaleW'
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
  			new Swiper('.case_swiper0',{
				slidesPerView: 'auto',
				spaceBetween: 20,
				observer: true,//修改swiper自己或子元素时，自动初始化swiper
				observeParents: true//修改swiper的父元素时，自动初始化swiper
			});
			new Swiper('.case_swiper1',{
				slidesPerView: 'auto',
				spaceBetween: 20,
				observer: true,//修改swiper自己或子元素时，自动初始化swiper
				observeParents: true//修改swiper的父元素时，自动初始化swiper
			});	
  		},
  		methods:{
  			
  		},
  		updated(){
  			new Swiper('.case_swiper0',{
				slidesPerView: 'auto',
				spaceBetween: 20,
				observer: true,//修改swiper自己或子元素时，自动初始化swiper
				observeParents: true//修改swiper的父元素时，自动初始化swiper
			});
			new Swiper('.case_swiper1',{
				slidesPerView: 'auto',
				spaceBetween: 20,
				observer: true,//修改swiper自己或子元素时，自动初始化swiper
				observeParents: true//修改swiper的父元素时，自动初始化swiper
			});
  		}
	}
</script>

<style scoped="scoped">
	.caseList .item{
		margin-top: 0.5rem;
	}
	.line{
		margin: 0 auto;
		margin-top: 0.2rem;
		width:0.4rem;
		height:4px;
		background:rgba(126,140,127,1);
	}
	.item h1{
		font-size:0.3rem;
		margin-top: 0.3rem;
		text-align: center;
		height: 0.5rem;
		line-height: 0.5rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(126,140,127,1);
	}
	.swiper-container{
		margin-top: 0.3rem;
		width: 100%;
		height: 6rem;
		padding-left: 0.2rem;
		box-sizing: border-box;
	}
	.swiper-slide{
		width: 90%;
	}
	.swiper-slide .imgBox{
		background-size:100% auto !important;
		border-radius:20px;
		width: 100%;
		height: 4rem;
	}
	.dec h1{
		height: 0.4rem;
		line-height: 0.4rem;
		text-align: left;
		width: 100%;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size:0.3rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:bold;
		color:rgba(68,68,68,1);
	}
	h2{
		width: 100%;
		margin-top: 0.2rem;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size:0.24rem;
		font-family:MicrosoftYaHei-Bold;
		font-weight:400;
		color:rgba(68,68,68,1);
	}
</style>