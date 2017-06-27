<template>
<div class="selectList_content">
	 <div class="col-sm-3"></div>
     <div class="col-sm-6">
     <h1 class="selectList_title">查询到以下符合的文章:</h1>

     	  <ul class="selectList_ul" v-for="item in items">
     	  	 <li>
     	  	 <a>
     	  	 	<router-link :to="{name:'Article', params: { title:item.title}}">{{item.title}}&nbsp;&nbsp;&nbsp;</router-link>
                     
     	  	 </a> &nbsp;&nbsp;&nbsp;{{item.date|userDate}}</li>
     	  </ul>


     </div>

</div>
</template>


<script>
	
  export default {
   data () {
    return {
         items: [],
         
     
    }
  },
  methods:{
        getSelectList(){
          
        var title=this.$route.params.title;
         if(title==''||title==null){
         	this.$message({
          	 	type:'error',
          	 	message:'请输入查询条件！'

          	 })
         	location.href='../#'
         }else{
        this.$http.get("http://localhost:8080/news/select/titleAll/"+title).then((res)=>{                   
          console.log(res.body)
          if(res.body.length==0){
          	 this.$message({
          	 	type:'error',
          	 	message:'您要找的文章不存在！'
          	 })
              location.href='../#'
          }else{

              this.items=res.body;
               }  
       }).catch(err=>{
        console.log(err);
         })
   }
       },
       
  },
   mounted:function(){
          
       this.getSelectList();
       

   }
}

</script>

<style>
   .selectList_title{
    margin-bottom: 30px;
   }


	.selectList_content{
		margin-top:120px;
	}
</style>