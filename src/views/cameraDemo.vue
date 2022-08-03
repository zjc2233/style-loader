<template>
    <div>
        <button type="primary" v-db-click @click="useVideo2">测试一下</button>
        <button type="primary" v-db-click @click="screen">截图</button>
        <video id="video"></video>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import html2canvas from 'html2canvas'

const video = ref()

function useVideo2() {
    video.value = document.getElementById('video')
    //兼容性写法,判断getUserMedia方法是否存在
    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia || window.getUserMedia;
    if (navigator.getUserMedia) {
        //调用用户媒体设备, 访问摄像头
        getUserMedia({ video: { width: 270, height: 150 } }, success, error);
    } else {
        alert('不支持访问用户媒体');
    }

}
// 调用成功的方法
function success(stream: any) {
    //兼容webkit核心浏览器
    let CompatibleURL = window.URL || window.webkitURL;
    //将视频流设置为video元素的源
    console.log('stream', stream);

    //video.src = CompatibleURL.createObjectURL(stream);
    //将摄像头拍摄的视频赋值给viedeo的srcObject属性
    //src是视频文件,srcObject是实时流
    //摄像头是实时流
    video.value.srcObject = stream;
    //并播放
    video.value.play();
}
// 调用失败的方法
function error(error: any) {
    console.log(`访问用户媒体设备失败${error.name}, ${error.message}`);
}

//采集图片
function getUserMedia(constraints: any, success: any, error: any) {
    if (navigator.mediaDevices.getUserMedia) {
        //最新的标准API
        navigator.mediaDevices.getUserMedia(constraints).then(success).catch(error);
    } else if (navigator.webkitGetUserMedia) {
        //webkit核心浏览器
        navigator.webkitGetUserMedia(constraints, success, error)
    } else if (navigator.mozGetUserMedia) {
        //firfox浏览器
        navigator.mozGetUserMedia(constraints, success, error);
    } else if (navigator.getUserMedia) {
        //旧版API
        navigator.getUserMedia(constraints, success, error);
    }
}

const screen = () => {
    // 获取要导出的DOM
    const rect: any = document.querySelector('#video').getBoundingClientRect()
    html2canvas(document.querySelector('#video'), {
        width: rect.width,
        height: rect.height
    }).then(function (canvas) {
        const pageData = canvas.toDataURL('image/jpeg', 1.0)
        const imgData = pageData.replace('image/jpeg', 'image/octet-stream')
        const imgName = '生成图片.jpg'
        const save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
        save_link.href = imgData
        save_link.download = imgName
        const event = document.createEvent('MouseEvents')
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        save_link.dispatchEvent(event)
    })
}

</script>

<style lang="scss" scoped>

</style>