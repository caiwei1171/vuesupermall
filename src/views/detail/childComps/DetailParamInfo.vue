<template>
    <div class='wraper' v-if="Object.keys(paramInfo).length !== 0">
        <table v-for="(table,i1) in paramInfo.sizes" :key="i1" class="size-table">
            <tr v-for="(item,i2) in table" :key="i2">
                <td v-for="(msg,i3) in item" :key="i3">{{msg}}</td>
            </tr>
        </table>
        <table>
            <tr v-for="(item,index) in paramInfo.infos" :key="index">
                <td class="td-key">{{item.key}}</td>
                <td class="td-value">{{item.value}}</td>
            </tr>
        </table>
        <div>
            <img :src="paramInfo.image" class="info-img">
        </div>
    </div>
</template>

<script>
export default {
    name:"DetailParamInfo",
    props:{
        paramInfo:{
            type:Object,
            default(){
                return {}
            }
        }
    },
}
</script>

<style scoped>
    table{
        width: 100%;
        border-collapse: collapse;
    }
    tr{
        height: 42px;
    }
    td{
        border-bottom: 1px solid rgba(100,100,100,.1);
    }
    .wraper{
        font-size: 14px;
        padding: 20px 15px;
        border-bottom: 5px solid #f2f5f8;
        background-color: #fff;
    }
    .size-table{
        border-bottom: 2px solid rgba(100,100,100,.2);
    }
    .td-key{
        width: 95px;
    }
    .td-value {
        color: #eb4868
    }
    .info-img{
        width: 100%;
    }
</style>