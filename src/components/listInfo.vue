<!--
 * @Description: 九宫格列表
 * @Author: xwq
 * @Date: 2019-07-12 17:15:21
 -->
<template>
    <div class="listInfo">
        <van-row class="list-content" tag="ul">
            <van-col
                tag="li"
                class="list-content-children"
                v-for="(item,key) in listArray"
                :key="key"
                @click.native="listHandle(item)"
            >
                <img class="pic-info" v-lazy="item.imgUrl" @click.prevent />
                <p class="text-info">{{item.title}}</p>
            </van-col>
        </van-row>
    </div>
</template>
<script>
export default {
    props: {
        listArray: {
            type: Array,
            default: () => {
                return [];
            }
        }
    },
    data() {
        return {};
    },
    created() {},
    mounted() {},
    methods: {
        listHandle(item) {
            this.$emit("listHandle", item);
        }
    }
};
</script>
<style lang="less" scoped>
.listInfo {
    .list-content {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        .list-content-children:nth-child(4),
        .list-content-children:nth-child(8) {
            border-right: 0 none;
        }
        .list-content-children {
            width: 25%;
            padding: 5px;
            border-radius: 10px;
            background-color: #fff;
            margin-bottom: 5px;
            box-sizing: border-box;
            border-right: 1px dotted#ccc;
            .pic-info {
                display: inline-block;
                min-width: 30px;
                max-width: 100%;
                min-height: 30px;
                max-height: 60px;
                //filter  css3图像过滤器
                // filter: blur(5px);//图片高斯模糊
                filter: brightness(120%); //提高高亮
                filter: contrast(120%); //提高对比度
                filter: drop-shadow(
                    8px 8px 10px rgb(210, 243, 20)
                ); //设置阴影效果
            }
            .text-info {
                font-size: 14px;
            }
        }
    }
}
</style>
