<template>
	
 <div style="height:auto;background:#EAEAEA;margin-top:100px;padding:20px;word-break:break-all;
    word-wrap:break-word;" class="col-sm-6">
        <ul style="list-style-type:decimal;" class="photoList_ul">
           <h4>分类列表</h4>
              <li v-for="(item,index) in items" ><a ref="category_a" @click="change(index)" style="cursor:pointer;text-decoration:none;color:#222">  
                      {{item.CATEGORY}}({{item.NUMBER}})
              </a></li>
        </ul>
        </div>

</template>



<script>
import Bus from './bus.js';
	 export default {
  name:'photolist',
 data() {
  return{
    
    items:[],
  }
},
methods : {
   change(index){

                 let value=this.$refs.category_a[index].innerHTML.trim('');
               
                 value=value.substr(0,value.indexOf('('));
  
                 Bus.$emit('getPhotos',value);
   },

      getPhotoList(){
                   

              this.$http.get("http://localhost:8080/photo/selectCategory").then((res)=>{
              	 this.items=res.body;
              }).catch(err=>{
              	console.log(err);
              })

      }

      },

    created:function(){
 
       this.getPhotoList();
    },



    

}

</script>

<style>
	
.photoList_ul{
   padding:10px;
}
	.photoList_ul li{
              margin-top:10px;
	}
</style>