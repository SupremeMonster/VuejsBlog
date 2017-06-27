<template>
  <div >
  	   <div class="col-md-3">
  	      <photolist></photolist>   	
  	   </div>
  <div class="col-md-9" >
  	   <photocontent></photocontent>
  </div>

  </div>
   

</template>

<script>
   import photolist from './photo_list.vue';
   import photocontent from './photocontent.vue';

export default {
  name: 'Photo',
  components:{
  	 photolist,
  	 photocontent,
  },
  data () {
    return {
        
    }
  },
  methods:{

  },
  created:function(){

  }
}
</script>


<style scoped>

</style>
