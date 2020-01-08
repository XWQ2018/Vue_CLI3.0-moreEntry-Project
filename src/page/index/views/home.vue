<!--
 * @Description: 首页
 * @Author: xwq
 * @Date: 2019-11-24 20:04:31
 -->
<template>
    <div class="page-index">
        <headerOne title="首页" />
        <intervalTimeSelect :popShow="popShow" @screenHandle="screenHandle" @confirm="confirm" />
        <div class="main-container">
            <h2>我是index页</h2>
            <van-button type="primary">确定</van-button>
        </div>
        <van-uploader :after-read="afterRead" :max-count="num" />
        <div class="pic-show">
            <img v-for="(item,key) in list" :key="key" :src="item" />
        </div>
        <van-uploader v-model="fileList" :max-count="num" :after-read="afterRead" />
    </div>
</template>
<script>
import headerOne from "@/components/headOne";
import intervalTimeSelect from "@/components/calendar/intervalTimeSelect";
import { Uploader } from "vant";
export default {
    components: {
        headerOne,
        intervalTimeSelect,
        [Uploader.name]: Uploader
    },
    data() {
        return {
            popShow: false,
            list: [],
            num: 3,
            fileList: [
                { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
                // Uploader 根据文件后缀来判断是否为图片文件
                // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
                { url: "https://cloud-image", isImage: true }
            ]
        };
    },
    created() {},
    mounted() {},
    methods: {
        afterRead(file) {
            // console.log(this.fileList);
            // return;
            // 此时可以自行将文件上传至服务器
            console.log(file);
            let that = this;
            // let file = document.getElementById("logimg").files[0];
            let uploadFile = file["file"];
            console.log(uploadFile);
            // console.log("file==", uploadFile);
            let baseUrl = window[window.webkitURL ? "webkitURL" : "URL"][
                "createObjectURL"
            ](uploadFile);

            this.list.push(baseUrl);
        },
        /**
         * @Description: 时间筛选
         * @Param:
         * @Author: xwq
         * @Date: 2019-11-24 20:14:39
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */

        screenHandle() {
            this.popShow = true;
        },
        /**
         * @Description: 日期设置完成
         * @Param:
         * @Author: xwq
         * @Date: 2019-11-24 20:19:33
         * @LastEditors: xwq
         * @LastEditTime: Do not edit
         * @return:
         */

        confirm(dateInfo) {
            this.popShow = false;
            console.group("返回的日期信息对象");
            console.dir(dateInfo);
        }
    }
};
</script>
<style lang="less" scoped>
.page-index {
    text-align: center;
    .main-container {
        margin-top: 46px;
        h2 {
            color: #f00;
            font-size: 18px;
            padding: 20px;
        }
    }
    .pic-show {
        width: 60px;
        height: 60px;
        margin-top: 60px;
        border: 1px solid #ccc;
        img {
            display: inline-block;
            width: 60px;
            height: 60px;
        }
    }
}
</style>