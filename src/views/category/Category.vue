<template>
    <div class='category-wrapper'>
        <nav-bar class="category-nav">
            <div slot="center">商品分类</div>
        </nav-bar>
        <div class="menu-container">
            <tab-menu :list="categories" @menuclick="menuclick" class="menu"/>
            <scroll class="tab-content" ref="scroll">
                <tab-content :subData="getSubcategories" :currentIndex="currentIndex"/>
                <tab-control :titles="['综合','新品','销量']" @tabClick="tabClick"/>
                <goods-list :goods="CategoryGoods" />
            </scroll>
        </div>
    </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import Scroll from '@/components/common/scroll/Scroll'
import TabControl from '@/components/content/tabControl/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import {getCategory,getSubcategory,getCategoryDetail} from '@/network/category'
import {debounce} from '@/commen/utils'

import TabMenu from './childComps/TabMenu'
import TabContent from './childComps/TabContent'
export default {
    name:'Category',
    components:{
        NavBar,
        Scroll,
        TabControl,
        TabMenu,
        TabContent,
        GoodsList
    },
    data(){
        return {
            categories:[],
            categoryData:{},
            currentIndex:-1,
            tabIndex:0,
            currentType:"pop"
        }
    },
    computed:{
        getSubcategories(){
            if(this.currentIndex === -1) return []
            return this.categoryData[this.currentIndex].subcategories.list
        },
        CategoryGoods(){
            if(this.currentIndex === -1) return []
            return this.categoryData[this.currentIndex].categoryDetail[this.currentType]
        }
    },
    created(){
        getCategory().then(res => {
            // 1.获取分类数据
            this.categories = res.data.category.list;
            // 2.初始化每个类别的子数据
            for(let i in this.categories){
                this.categoryData[i] = {
                    subcategories:{},
                    categoryDetail:{
                        'pop':[],
                        'new':[],
                        'sell':[]
                    }
                }
            }
            // 3.请求第一个分类数据
            this._getSubcategory(0);
            this._getCategoryDetail(0,'pop');
            this._getCategoryDetail(0,'new');
            this._getCategoryDetail(0,'sell');
        })
    },
    mounted() {
        let newRefresh = debounce(this.$refs.scroll.refresh)
        this.$bus.$on("categoryImageLoad",() => {
            newRefresh();
        })
    },
    methods:{
        menuclick(index){
            this._getSubcategory(index)
            this._getCategoryDetail(index,'pop')
            this._getCategoryDetail(index,'new')
            this._getCategoryDetail(index,'sell')
        },
        tabClick(index){
            switch(index){
                case 0: this.currentType = "pop"
                break;
                case 1: this.currentType = "new"
                break;
                case 2: this.currentType = "sell"
                break;
            }
        },
        _getSubcategory(index){
            this.currentIndex = index;
            let maitKey = this.categories[index].maitKey
            getSubcategory(maitKey).then(res => {
                this.categoryData[index].subcategories = res.data
                this.categoryData = {...this.categoryData}
            }) 
        },
        _getCategoryDetail(index,type){
            let miniWallkey = this.categories[index].miniWallkey
            getCategoryDetail(miniWallkey,type).then(res => {
                this.categoryData[index].categoryDetail[type] = res;
            })
        }
    }
}
</script>
<style scoped>
    .category-wrapper{
        font-size: 14px;
        color: #666;
    }
    .category-nav{
        background-color: var(--color-tint);
        color: #fff;
        font-weight: 700;
        z-index: 9;
    }
    .menu-container{
        display: flex;
    }
    .menu-container .menu{
        width: 100px;
    }
    .tab-content{
        height: calc(100vh - 44px - 49px);
        flex: 1;
        overflow: hidden;
    }
</style>