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