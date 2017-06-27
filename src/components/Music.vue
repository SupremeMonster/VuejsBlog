<template>
  <div>
     <div class="col-sm-3" style="position:relative;left:10%">
 
       <leftlist></leftlist>
     
       </div>
       <div class="col-sm-9" style="margin-top:120px;position:relative">
          <articlecontent></articlecontent>

       </div>
</div>
</template>

<script>
 import leftlist from './left_list.vue'
  import articlecontent from './articlecontent.vue'
export default {
  name: 'music',

 components: {
    leftlist,
    articlecontent,
  },
  data(){
          return{ 
          	   items:[],
            }
		},
		methods:{
			getList(){
				this.$http.get(`http://localhost:8080/news/selectNews`).then((res)=>{                   
           
              this.items=res.body;
                 
       }).catch(err=>{
        console.log(err);
         })
			}
		},
	created:function(){
		this.getList();
	}

}
</script>

<style>

</style>
