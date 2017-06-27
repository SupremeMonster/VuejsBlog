<template >
<div>
<div class="col-sm-3">
     
     </div>
     <div class="col-sm-6">
  <div class="article">
   
    <div class="article_content" v-for="item in items">
       <center><h1 class="title">{{item.title}}</h1>
         <span class="date_category">{{item.date|userDate}} · {{item.category}}</span>
         </center>
           <p>{{item.body}}<span class="readmore"><a ><router-link :to="{name:'Article', params: { title: item.title }}">阅读全文&gt;&gt;</router-link></a></span></p>
            </div>


<div class="pagination" style="position:absolute;left:35%;margin:40px">
  
 <div class="block">

    <el-pagination

      @current-change="handleCurrentChange"
      :current-page.sync="currentPage"
      :page-size="100"
      layout="prev, pager, next, jumper"
      :total="1000">
    </el-pagination>
  </div>
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
      
    currentPage:'1',
   
      items: [],
      indexs: [],
    }
  },
  methods : {
   
   
    getCategory(){

        this.$http.get("http://localhost:8080/news/select/categoryAll").then((res)=>{   
                this.indexs=res.body;                         
       }).catch(err=>{
        console.log(err);
         })
       },

 handleCurrentChange(val) {
      this.currentPage=val;
   
       this.getData(this.currentPage);


      },


  	getData(pageNum){
         
        this.$http.get(`http://localhost:8080/news/selectNewsPage?pageNum=${this.currentPage}&pageSize=5`).then((res)=>{             
        		for(let i in res.body){
        			if(res.body[i].body.length>400){
        				res.body[i].body=res.body[i].body.slice(0,400)+'...';	
        			}
        			
        		this.items=res.body;   

        		}  
       }).catch(err=>{
       	console.log(err);
         })
       }
  },

  mounted:function(){
  	 this.getCategory();
  	 this.getData();	 
  }
}
</script>


<style lang="scss">
	.article{
		margin-top:120px;

	.date_category{
		color:#999;
	}
	 .article_content{
    word-break:break-all;
    word-wrap:break-word;
	 margin-top:20px;
    margin-bottom:40px;
   	 letter-spacing:0.5px;
	 padding:10px;
	 background: #F0F0F0 ;
	 text-indent:50px;
	 font-size:15px;
	 line-height:34px;
	 }
     .readmore{

     	cursor:pointer;

     	left:30px;
     	margin-top:20px;
     	margin-bottom:10px;
        a{
              text-decoration:none;
              color:white;
              font-weight:bold;
              background:#CD9B1D;
              padding:6px 2px;
              border-radius:3px;
             
        }
        a:hover{
        	background: #CD853F;;
        }
     }

}
	


</style>
