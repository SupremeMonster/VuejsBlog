<template>
<div>
<div class="photo_content" style="margin-top:100px;position:relative">

	
		<h1 class="photo_category">{{category}}</h1>
                <ul class="photos_ul" style="list-style-type:none;display:inline-block"  >
                	<li v-for="item in items">
                		<img :src="item.url" class="photos_img"/>
                	</li>
                </ul>


</div>

<div v-show="category!='全部照片'">
<input type="file" enctype="multipart/form-data" ref="input" class="fileInput"/>





<div class="into">

<h4>照片名称</h4>
<input type="text"   v-model="onload.name">

   <h4>请填写描述</h4>

   <textarea class="remark_text" v-model="onload.description" cols="100%" rows="3" placeholder="写点什么..." ></textarea>


</div>

<el-button @click="onloadFile($event)"  style="position:relative;top:40px">上传照片</el-button>
</div>
</div>
</template>



<script>
import Bus from './bus.js';
	 export default{
	 	name:"photocontent",
	 	data(){
	 		return {
                
                items:[],
                category:'全部照片',
                onload:{
                      category:'',
                      description:'',
                      name:'',
                      date:'',
                      url:''

                }
	 		}
	 	},
	 	methods:{

     
      

    onloadFile(){
         this.onload.category=this.category;
          console.log(this.$refs.input.files[0].name)
          let url=this.$refs.input.files[0].name;
            this.onload.url=`http://localhost:3000/static/${url}`;
             let param=this.onload;
        
            this.$http.post('http://localhost:8080/photo/insertPhoto',param).then((res)=>{
                      this.$message({
                           type:'success',
                           message:'上传成功'
                      })
                       
                
               this.getPhotos();
               this.category="全部照片";

            }).catch(err=>{
                 this.$message({
                     type:'error',
                     message:'上传失败'
                 })
                 console.log(err)
            })
      },



             getPhotos(){
                    this.$http.get("http://localhost:8080/photo/selectPhotos").then((res)=>{
                             this.items=res.body;
                             console.log(this.items);
                    }).catch(err=>{
                               console.log(err);
                    })
                  },
        
   
             
     getPhotosByCategory(){
              Bus.$on('getPhotos',target=>{ 
          	  this.$http.get(`http://localhost:8080/photo/selectPhotosByCategory/${target}`).then((res)=>{                   
              console.log(res.body)
              this.category=target;
              this.items=res.body;
                 
       }).catch(err=>{
        console.log(err);
         })
     })
}
     
     




	 	},
	 	created:function(){
                 this.getPhotos();
                 this.getPhotosByCategory();
	 	}
	 }

</script>

<style>
.photos_ul li{
  float:left;
  width:80px;
  margin-right: 20px

   }


	.photos_img{
    position: relative;

	
		max-width:100%;
		max-height:100%;

	}

  .fileInput{
    position: relative;
    top:40px;
  }

  .into{
     position: relative;
   top:40px;
  }

	


</style>