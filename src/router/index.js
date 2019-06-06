import Vue from 'vue'
import Router from 'vue-router'
//首页
import Index from '@/components/index'
//const Index = resolve => require(['../components/index'],resolve)
//风格派
import StylePai from '@/components/stylePai/stylePai'
//const StylePai = resolve => require(['@/components/stylePai/stylePai'],resolve)
//风格派-详情
import StylePaiInfo from '@/components/stylePai/stylePaiInfo'
//const StylePaiInfo = resolve => require(['@/components/stylePai/stylePaiInfo'],resolve)
//楼盘
import Floor from '@/components/floor/floor'
//const Floor = resolve => require(['@/components/floor/floor'],resolve)
//楼盘-户型选择
import House from '@/components/floor/house'
//const House = resolve => require(['@/components/floor/house'],resolve)
//好物
import GoodThing from '@/components/goods/goodThing'
//const GoodThing = resolve => require(['@/components/goods/goodThing'],resolve)
//好物详情
import GoodsInfo from '@/components/goods/goodsInfo'
//const GoodsInfo = resolve => require(['@/components/goods/goodsInfo'],resolve)
//方案-方案详情
import Programme from '@/components/programme/programme'
//const Programme = resolve => require(['@/components/programme/programme'],resolve)
//关于我们
import AboutUs from '@/components/about/aboutUs'
//const AboutUs = resolve => require(['@/components/about/aboutUs'],resolve)
//关于我们-案例精选
import Case from '@/components/about/caseSelection'
//const Case = resolve => require(['@/components/about/caseSelection'],resolve)
//搜索
import SearchModel from '@/components/search/search'
//const SearchModel = resolve => require(['@/components/search/search'],resolve)
//下载页
import Download from '@/components/download/download'
//const Download = resolve => require(['@/components/download/download'],resolve)
//门店列表
import StoreList from '@/components/about/storeList'
//const StoreList = resolve => require(['@/components/about/storeList'],resolve)
//移动端
//首页
import wapIndex from '@/components/wap/index'
//const wapIndex = resolve => require(['@/components/wap/index'],resolve)
//楼盘
import wapFloor from '@/components/wap/floor/floor'
//const wapFloor = resolve => require(['@/components/wap/floor/floor'],resolve)
//户型
import wapHouse from '@/components/wap/floor/house'
//const wapHouse = resolve => require(['@/components/wap/floor/house'],resolve)
//方案详情
import wapProgramme from '@/components/wap/programme/programme'
//const wapProgramme = resolve => require(['@/components/wap/programme/programme'],resolve)
//风格派
import wapStylePai from '@/components/wap/stylePai/stylePai'
//const wapStylePai = resolve => require(['@/components/wap/stylePai/stylePai'],resolve)
//风格派详情
import wapStylePaiInfo from '@/components/wap/stylePai/stylePaiInfo'
//const wapStylePaiInfo = resolve => require(['@/components/wap/stylePai/stylePaiInfo'],resolve)
//好物
import wapGoodsThing from '@/components/wap/goods/goodsThing'
//const wapGoodsThing = resolve => require(['@/components/wap/goods/goodsThing'],resolve)
//好物详情
import wapGoodsInfo from '@/components/wap/goods/goodsInfo'
//const wapGoodsInfo = resolve => require(['@/components/wap/goods/goodsInfo'],resolve)
//关于我们
import wapAboutUs from '@/components/wap/about/aboutUs'
//const wapAboutUs = resolve => require(['@/components/wap/about/aboutUs'],resolve)
//案例精选
import wapCaseSelection from '@/components/wap/about/caseSelection'
//const wapCaseSelection = resolve => require(['@/components/wap/about/caseSelection'],resolve)
//搜索
import wapSearch from '@/components/wap/search/search'
//const wapSearch = resolve => require(['@/components/wap/search/search'],resolve)
//移动聊天
import Chat from '@/components/wap/chat/chat'
//const Chat = resolve => require(['@/components/wap/chat/chat'],resolve)
//门店列表
import wapStoreList from '@/components/wap/about/storeList'
//const wapStoreList = resolve => require(['@/components/wap/about/storeList'],resolve)
Vue.use(Router)

export default new Router({
	mode:'history',
	routes: [
	    {
	      path: '/',
	      name: 'index',
	      component: Index
	    },
	    {
	      path: '/stylePai',
	      name: 'stylePai/index',
	      component: StylePai
	    },{
	      path: '/stylePai/info/:code',
	      name: 'stylePai/info/:code',
	      component: StylePaiInfo
	    },
	    {
	      path: '/floor',
	      name: 'floor/index',
	      component: Floor
	    },
	    {
	      path: '/house/:code',
	      name: 'floor/house',
	      component: House
	    },{
	      path: '/goodsThing',
	      name: 'goods/index',
	      component: GoodThing
	    },{
	      path: '/goods/info/:code',
	      name: 'goods/info',
	      component: GoodsInfo
	    },
	    {
	      path: '/aboutUs',
	      name: 'about/aboutUs',
	      component: AboutUs
	    },
	    {
	      path: '/case',
	      name: 'about/case',
	      component: Case
	    },
	    {
	      path: '/programme/:code',
	      name: 'programme/index',
	      component: Programme
	    },
	    {
	      path: '/search/:code',
	      name: 'search',
	      component: SearchModel
	    },
	    {
	      path: '/download',
	      name: 'download/index',
	      component: Download
	    },
	    {
	      path: '/storeList',
	      name: 'storeList',
	      component: StoreList
	    },//移动端
	    {
		  path: '/wap',
		  name: 'wap',
		  component: wapIndex
		},{
		  path: '/wap/floor',
		  name: 'wap/floor',
		  component: wapFloor
		},{
		  path: '/wap/house/:code',
		  name: 'wap/house',
		  component: wapHouse
		},{
		  path: '/wap/programme/:code',
		  name: 'wap/programme',
		  component: wapProgramme
		},{
		  path: '/wap/stylePai',
		  name: 'wap/stylePai',
		  component: wapStylePai
		},{
		  path: '/wap/stylePai/info/:code',
		  name: 'wap/stylePai/info',
		  component: wapStylePaiInfo
		},{
		  path: '/wap/goodsThing',
		  name: 'wap/goodsThing',
		  component: wapGoodsThing
		},{
		  path: '/wap/goods/info/:code',
		  name: 'wap/goods/info',
		  component: wapGoodsInfo
		},{
		  path: '/wap/aboutUs',
		  name: 'wap/aboutUs',
		  component: wapAboutUs
		},{
		  path: '/wap/case',
		  name: 'wap/case',
		  component: wapCaseSelection
		},{
		  path: '/wap/search/:code',
		  name: 'wap/search',
		  component: wapSearch
		},{
		  path: '/wap/chat',
		  name: 'wap/chat',
		  component: Chat
		},{
		  path: '/wap/storeList',
		  name: 'wap/storeList',
		  component: wapStoreList
		}
	]
})
