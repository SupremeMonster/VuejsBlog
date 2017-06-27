<template>

   <div class="article_content">
   
      <ul class="selectList_ul" >
        <h1 class="selectList_category">{{category}}</h1>

     	  	 <li v-for="item in items" >
           <a>
            <router-link :to="{name:'Article', params: { title:item.title}}">{{item.title}}&nbsp;&nbsp;&nbsp;</router-link>
                     
           </a> &nbsp;&nbsp;&nbsp;{{item.date|userDate}}</li>
     	  </ul>
   </div>
</template>



<script>
import Bus from './bus.js';

	export default{
		name:'articlecontent',
		data(){
          return{ 
               category:'所有文章',
          	   items:[],
            }
		},

		methods:{


  getAllList(){

this.$http.get("http://localhost:8080/news/selectNews").then((res)=>{             
            
              
            this.items=res.body;     
            
       }).catch(err=>{
        console.log(err);
         })
       

  },
   

getList(){     

          Bus.$on('getCategory',target=>{ 
          	  this.$http.get(`http://localhost:8080/news/select/category/${target}`).then((res)=>{                   
              console.log(res.body)
              this.category=target;
              this.items=res.body;
                 
       }).catch(err=>{
        console.log(err);
         })
     
          });
       } 

		},
		created:function(){
      this.getList();

      this.getAllList();
              
		}
   
	}

</script>

<style>
  



.selectList_ul li{
  margin:10px;

}

.selectList_category{
  margin-bottom:30px;
}
</style>
