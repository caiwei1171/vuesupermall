import {debounce} from './utils.js'
export const itemListenerMixin = {
    data(){
        return {
            itemImgListener:null
        }
    },
    mounted(){
        const refresh = debounce(this.$refs.scroll.refresh,300);
        this.itemImgListener = () => {
            this.$refs.scroll.refresh();
            refresh()
        }
        this.$bus.$on('detailImageLoad',this.itemImgListener);
    }
}
// BackTop的封装
import BackTop from "@/components/content/backTop/BackTop"
// 回到顶部的封装
export const backTopMixin = {
    components:{
        BackTop
    },
    data(){
        return {
            isShowBackTo:false,//控制backTo的现实与隐藏
        }
    },
    methods:{
        backClick(){
            // scrollTo(x距离，y距离，时间以ms为单位)
            this.$refs.scroll.scrollTo(0,0,500);
        },
        listenShowBackTop(position){
            // 是否现实回到顶部
            this.isShowBackTo = (-position.y) > 1000;
        }
    }
}