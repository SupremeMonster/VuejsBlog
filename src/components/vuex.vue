<template>
  <div class="vuex">
	<div class="col-md-3">
		<vuex1></vuex1>
	</div>
	<div class="col-md-6">
	   <vuex2></vuex2>
	</div>
</div>
</template>


<script>
import vuex1 from './vuex1.vue';
import vuex2 from './vuex2.vue';
	 export default{
	 	data(){
	 		return{

	 		}
	 	},
	 	methods:{

	 	},

	 	components:{vuex1,vuex2}
	 }

</script>