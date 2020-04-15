<template>
    <div class='comment-wrapper' v-if="Object.keys(commentInfo).length !== 0">
        <div class="header">
            <span>用户评价</span>
            <span class="more">更多<i>></i></span>
        </div>
        <div class="content">
            <div class="user" v-if="commentInfo.user">
                <img :src="commentInfo.user.avatar" class="user-logo">
                <span>{{commentInfo.user.uname}}</span>
            </div>
            <p class="comment">{{commentInfo.content}}</p>
            <div class="goods-info">
                <span class="time">{{commentInfo.created | showDate}}</span>
                <span>{{commentInfo.style}}</span>
                <div class="img-box">
                    <img v-for="(item,index) in commentInfo.images" :key="index" :src="item" alt="">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {formatDate} from "@/commen/utils.js"
export default {
    name:"DetailCommentInfo",
    props:{
        commentInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
    filters:{
        showDate(value){
            // 将时间戳转化为Date对象
            let date = new Date(value * 1000);
            return formatDate(date,"yyyy-MM-dd");
        }
    }
}
</script>

<style scoped>
    i{
        color: #555;
        font-size: 16px;
    }
    .comment-wrapper{
        padding: 5px 12px;
        border-bottom: 5px solid #f2f5f8;
        font-size: 15px;
        color: #111;
        background: #fff;
    }
    .header{
        display: flex;
        justify-content: space-between;
        line-height: 50px;
        padding: 0 5px;
        border-bottom: 1px solid #ddd;
    }
    .more{
        margin-right: 10px;
    }
    .user{
        line-height: 45px;
        padding: 10px 0 5px;
    }
    .comment{
        color: #777;
        font-size: 14px;
    }
    .goods-info{
        color: #999;
        margin-top: 10px;
        padding: 0 5px 15px;
    }
    .time{
        padding-right: 5px;
    }
    .user-logo{
        height: 45px;
        width: 45px;
        vertical-align:middle;
        border-radius: 50%;
        margin-right: 10px;
    }
    .img-box{
        margin-top: 10px;
    }
    .img-box img{
        margin-right: 5px;
        width: 70px;
        height: 70px;
    }
</style>