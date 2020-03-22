<template>
    <div id="recommend">
        <div v-for="(item,index) in recommends" v-bind:key="index" class="item">
            <a v-bind:href="item.link">
                <img v-bind:src="item.image" alt="">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>
export default {
    name:"RecommendView",
    props:{
        recommends:{
            type:Array,
            data(){
                return []
            }
        }
    }
}
</script>

<style scoped>
    #recommend{
        display: flex;
        width: 100%;
        text-align: center;
        padding: 10px 0 20px;
        border-bottom: 10px solid #eee;
        font-size: 14px;
    }
    #recommend .item{
        flex: 1;
    }
    #recommend .item img{
        height: 70px;
        width: 70px;
        margin-bottom: 10px;
    }
</style>