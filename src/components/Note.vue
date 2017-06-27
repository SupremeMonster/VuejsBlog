<template>
<div class="note_content">
<div class="col-sm-3"></div>
<div class="col-sm-6">
<div class="article_edit">  

<label for="title">标题：</label><input type="text" name="title" id="title" v-model="article.title"/>
<br/>
<label for="category" style="margin-top:40px">分类：</label>

<select name="cars" id="category" v-model="article.category">  
            <option value="Html" >Html</option>   
            <option value="Javascript" selected>Javascript</option>   
            <option value="Test" >Test</option>   
            <option value="框架" >框架</option> 
            <option value="Go" >Go</option>  
            <option value="C" >C</option>  
            <option value="其他" >其他</option>     
        </select>  

<br/>


<div  style="margin-top:50px">
<label for="body" style="vertical-align:top;">正文：</label>
<textarea name="body" id="body" cols="100%" rows="3" v-model="article.body"></textarea>
</div>
<br/>

<button class="btn btn-success pull-right" style="margin-right:150px" @click="submit()">提交</button>

</div>
</div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
       article:{
       	  title:'',
       	  body:'',
       	  category:'',
       	  date:new Date(),
       }
    }
  },

  methods:{
       submit(){
                 let param=this.article;

            if(this.article.title==''||this.article.body==''){
            this.$message({
            type: 'error',
            message: '标题或者正文不能为空!'
          })
            }else{

       	   this.$http.post("http://localhost:8080/news/write",param).then((res)=>{
                   this.$message({
            type: 'success',
            message: '添加成功!'
          });
                  
                   location.href='../#/#'


       	    }).catch(err=>{
       	   	     this.$message({
            type: 'error',
            message: '添加失败!'
          });
       	    })
       	}
    }
  },



  mounted:function(){

  }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>



.article_edit{
	margin-top:120px;
}
</style>
