<template>
  <div class="vuex1" style="margin-top:200px">
	  <ul class="vuex1_ul">
	  	  <li v-for="(item,index) in items"><a ref="vuex" @click="change(index)">{{item}}</a></li>


	  </ul>
</div>
</template>


<script>

	 export default{
	 	data(){
	 		return{
             items:[1,2,3],
	 		}
	 	},
	 	methods:{
              change(index){
              	let id=this.$refs.vuex[index].innerHTML;
              	console.log(this.$refs.vuex[index].innerHTML)
              	    this.$store.state.number=id;
              }
	 	},

	 	
	 }

</script>
