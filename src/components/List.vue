<template>

<div class="list_content" style="margin-top:100px">
	<div class="col-sm-3">
  </div>
    <div class="col-sm-6">
<div class="category_title">
<h1>{{items[0].category}}</h1>
    <ul class="category_ul">
      <li v-for="item in items" ref="div" >
        <a ref="title"><router-link :to="{name:'Article', params: { title:item.title}}">{{item.title}}
        </router-link></a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.date|userDate}}
      </li>
    </ul>
  </div>
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
        getList(){
          
        var category=this.$route.params.category;

        this.$http.get("http://localhost:8080/news/select/category/"+category).then((res)=>{                   
       
              this.items=res.body;
                 
       }).catch(err=>{
        console.log(err);
         })
       },
       
  },
   mounted:function(){
          
       this.getList();
      

   }
}



</script>