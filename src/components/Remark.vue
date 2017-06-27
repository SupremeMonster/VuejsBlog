<template>
<div>
<div class="col-sm-3"></div>
<div class="col-sm-6">
  <div class="remark_content">
<h1 class="">留言列表：</h1>
   

<textarea class="remark_text" v-model="remark.content" cols="100%" rows="3" placeholder="写点什么..." ></textarea>


<vue-html5-editor :content="content" :height="500"></vue-html5-editor>













<br/>
  <button class="btn btn-primary pull-right" style="position:relative;margin-right:160px;margin-top:10px" @click="submitRemark()">写留言</button>

  <div class="remark_list"  >
    <ul class="remark_ul" style="list-style-type:none"   >
   	  <li v-for="(item,index) in items" ref="ul"> {{item.id }}楼&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.content}}  
   	  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; {{item.date|userDate2}}
        
       <el-button @click="deleteRemark(index)" icon="delete"></el-button>
   	  </li>
   </ul>
   </div>

</div>
</div>
</div>

</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      items:[],
      remark:{
      	date:'',
      	content:'',
      },
     

    }
  },

  methods:{
  	
   getRemarkList(){
        this.$http.get("http://localhost:8080/remark/selectRemark").then((res)=>{
                this.items=res.body;
                   console.log(res);
        }).catch(err=>{
                    console.log(err);
        })
    },
    deleteRemark(index){

    	 this.$confirm('确认要删除该留言吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(()=>{
        	
        	let id=this.$refs.ul[index].innerHTML;
          id=id.substr(0,id.indexOf('楼'));
          console.log(id)
        	this.$http.delete("http://localhost:8080/remark/deleteRemark/"+id).then((res)=>{
                this.$message({
                        type:'success',
                        message:'删除成功'

                   }) 
                   this.getRemarkList();

        }).catch(err=>{
                    this.$message({
                        type:'error',
                        message:'删除失败'

                   }) 
        })
        })


        

    },

    submitRemark(){
    	 let param=this.remark;
            console.log(this.remark.date)

                    if(param.content==''||param.content==null){
                    	this.$message({
                        type:'error',
                        message:'留言内容不能为空'

                   }) 
              }else{



    	this.$http.post("http://localhost:8080/remark/addRemark",param).then((res)=>{
                   this.$message({
                        type:'success',
                        message:'留言成功'

                   }) 
                  
                   this.getRemarkList();
                   this.remark.content='';



        }).catch(err=>{
        	this.$message({
                        type:'error',
                        message:'留言失败'

                   }) 
                    
        })
        }
    }
  },

  mounted:function(){
  	 this.getRemarkList();
  }



}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .remark_content{
  	margin-top:120px;
  }

   
  .remark_ul li {
    padding:10px;
    background: #fbfdfb;
  	margin-top:20px;
    border: 1px #eee solid;
    height:auto;

 word-break:break-all;
    word-wrap:break-word;
  }
  .remark_text{
  	margin-top:40px;
  	margin-left:30px;
  }

  .remark_list{
  	padding: 0px 15px;
    margin-top: 100px;
     width:725px;
     margin-left:30px;
    border-radius: 3px;
    
    
    font-size: 15px;
    color:#bbb;
  }

</style>
