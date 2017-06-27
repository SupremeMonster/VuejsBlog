<template>
<div >
<div class="col-sm-3"></div>
  <div class="col-sm-6">

 <div class="comment_content">
      <h1>您的评价对于我的改进十分重要！</h1>
   
             <h2>历史评价:</h2>
             
              <el-rate v-model="value" disabled show-text text-color="#ff9900"  text-template="{value}"></el-rate>
   <h2>请选择您的评价</h2>
   <form>
  <el-rate v-model="comment.grade" @click="show()" show-text text-color="#ff9900" >
  </el-rate>
  <br/>
  <el-button value="提交"  @click="submit()">提交</el-button>
  </form>
    </div>

	</div>
</div>

</template>


<script>
	
export default{
   data(){
   	return {
           value:'',
           comment:{
           	   grade:'',
           },
          
           	  
           
   	}
   },
   methods:{   
    


      getRateValue(){
      	  this.$http.get("http://localhost:8080/comment/selectAvg").then((res)=>{
                       console.log(res.body)
                    this.value=res.body;
      	  }).catch(err=>{
                 console.log(err);
      	  })
      },

    submit(){
    	let param =this.comment;
    	console.log(param)
       this.$http.post("http://localhost:8080/comment/insertComment",param).then((res)=>{
                     this.$message({
                    	type:'success',
                    	message:'谢谢您的评价'
                    })
                    this.getRateValue();   
                    
      	  }).catch(err=>{
                 this.$message({
                    	type:'error',
                    	message:'参数错误'
                    }) 
      	  })



    } 




      

   },

   created:function(){
                this.getRateValue();
   }

}

</script>


<style scoped>
	.comment_content{
		margin-top:100px;
	}

</style>