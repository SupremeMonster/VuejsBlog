<template>
 
<div id="wrapper">
  <nav class="navbar navbar-default navbar-inverse navbar-fixed-top" style="border-radius:0px;">
     

    <div class="navbar-header" >
       <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#example-navbar-collapse">
        <span class="sr-only">切换导航</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
       </button>
       <a href="#" class="navbar-brand" >Supreme个人博客</a>
    </div>

     <div class="collapse navbar-collapse" id="example-navbar-collapse" style="position: relative; left:10%">


   <ul class="nav  navbar-nav" style="margin-left:100px;font-size:16px">
      <li><router-link to="/#">首页</router-link></li>
      <li><router-link to="/Music">分类</router-link></li>
      <li><router-link to="/Photo">照片</router-link></li>
      <li><router-link to="/Game">计划</router-link></li>
      <li><router-link to="/Note">随笔</router-link></li>
      <li><router-link to="/Remark">留言</router-link></li>
      <li><router-link to="/Test">评价</router-link></li>
      <li><router-link to="/Vuex">测试Vuex</router-link></li>
      <li><form><input type="text" class="text" placeholder="请输入标题" v-model="title" style="margin-top:10px" /><span><a style="color:#fff;cursor:pointer;text-decoration:none"  >
       <router-link style="color:#fff" :to="{name:'SelectList', params: { title:this.title } }"> &nbsp;&nbsp;&nbsp;查找</router-link> </a></span>
       </form></li>
   </ul>
   </div>
  </nav>
   <div class="container" style="width:100%;">
     
   
     <router-view></router-view>


   </div>






   </div>
</template>

<script>
export default {
   data () {
    return {
       title :'',
       items :[],
       
     
    }
  },
  methods:{
       


  },
   mounted:function(){
          
     

   }
}



</script>

<style lang="scss">
 body{
  background:#F0FFFF;
 }
 



 .category_ul li{
  margin-left:-30px;
  margin-top:20px;
 }


 



</style>
