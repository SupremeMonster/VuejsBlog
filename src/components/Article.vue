<template>
<div>
<div class="col-sm-3">
  
</div>
 <div class="juti_article col-sm-6" >
   <center><h1 class="juti_title">{{ title }}</h1>
   <span class="juti_date">{{ date|userDate }}</span>&nbsp;&nbsp;&nbsp;
   <button class="btn btn-danger" @click="deleteArticle($event)">删除</button></center>
     <p class="juti_body">{{ body }}</p>
 </div> 
</div>

</template>


<script>
export default {
  
  data () {
    return {
      title :'',
      date : '',
      body : '',
      items:[],
     
    }
  },
  methods : {
    getData(title){
        var title=this.$route.params.title;
        console.log(title)
        this.$http.get("http://localhost:8080/news/select/title/"+title).then((res)=>{             
  
               this.title=res.body.title;
               this.date=res.body.date;
               this.body=res.body.body;    
             
       }).catch(err=>{
        console.log(err);
         })
       },

        getCategory(){

        this.$http.get("http://localhost:8080/news/select/categoryAll").then((res)=>{               
                  
                  this.items=res.body;
               
                  
       }).catch(err=>{
        console.log(err);
         })
       },


       deleteArticle(title){

        this.$confirm('确认要删除该文章吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
        var title=this.title;

   this.$http.delete("http://localhost:8080/news/delete/"+title).then((res)=>{                   
       
            this.$message({
            type: 'success',
            message: '删除成功!'
          });
            location.href="../#/#";
           
       }).catch(err=>{
        this.$message({
            type: 'error',
            message: '删除失败!'
          });
         })
     });
   }

  },
  mounted:function(){
    console.log(this.title)
     this.getCategory();
      this.getData();

  }


    

  }

  </script>


  <style lang="scss">
.juti_title{
  margin-top:120px;
}

     .juti_date{
        margin-top:30px;
     }

     .juti_body{
       word-break:break-all;
    word-wrap:break-word;
      margin-top:20px;
   letter-spacing:0.5px;
   padding:10px;
   background:#eee;
   text-indent:50px;
   font-size:15px;
   line-height:34px;
     }


  </style>