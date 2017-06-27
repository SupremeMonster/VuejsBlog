<template>
<div class="plan_table">
<center>
<el-input placeholder="请输入内容" v-model="searchVal" style="padding-bottom:10px;width:200px"></el-input>
<el-button @click="loadData()">查询</el-button>

<el-table :data="tableData" style="width:59.5%">
	<el-table-column prop="id" label="编号" width="120"></el-table-column>	
	<el-table-column prop="plan" label="计划" width="200"></el-table-column>	
	<el-table-column prop="user" label="参与者" width="200"></el-table-column>	
	<el-table-column inline-template prop="start" label="开始时间" width="200">
		  <el-button-group>{{row.start|parseDate}}</el-button-group>
	</el-table-column>	
	<el-table-column prop="end" inline-template label="结束时间" width="200">
		<el-button-group>{{row.end|parseDate}}</el-button-group>
	</el-table-column>	
   <el-table-column label="操作" width="200">
   	    <template scope="scope">
   	     <el-button @click="edit(scope.$index,scope.row)" icon="edit" size="small">编辑</el-button>
   	     <el-button @click="del(scope.$index,scope.row)" icon="delete" size="small">删除</el-button>
   	</template>
   </el-table-column>	      
</el-table>
<el-button style="margin-top:20px;margin-right:1000px"@click="dialogVisible=true" >添加</el-button>		


 <div class="block">
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[2,4,6]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalCount">
    </el-pagination>
  </div>
</center>


<el-dialog title="添加"  v-model="dialogVisible">
     <el-form  :model="plan" :rules="rules" ref="planForm">
           <el-form-item label="计划" prop="plan"><el-input v-model="plan.plan"></el-input></el-form-item>
           <el-form-item label="参与者" prop="user"><el-input v-model="plan.user"></el-input></el-form-item>
           <el-form-item label="开始时间" prop="start">
           	<el-col>
           		<el-date-picker type="datetime"  placeholder="选择日期" v-model="plan.start"></el-date-picker>
           	</el-col>
           </el-form-item>
           <el-form-item label="结束时间" prop="end">
           	<el-col>
           		<el-date-picker type="datetime" placeholder="选择日期" v-model="plan.end"></el-date-picker>
           	</el-col>
           </el-form-item>
     </el-form>
     <el-button @click="dialogVisible=false">取消</el-button>
     <el-button @click="add()">确定</el-button>
</el-dialog>

<el-dialog title="修改" v-model="updateVisible">
     <el-form  :model="updatePlan" :rules="rules" ref="updatePlanForm">
           <el-form-item label="计划" prop="plan"><el-input v-model="updatePlan.plan"></el-input></el-form-item>
           <el-form-item label="参与者" prop="user"><el-input v-model="updatePlan.user"></el-input></el-form-item>
           <el-form-item label="开始时间" >
           	<el-col>
           	  <el-date-picker type="datetime" placeholder="选择日期" v-model="updatePlan.start"></el-date-picker>
           	</el-col>
           </el-form-item>

           <el-form-item label="结束时间" >
           	<el-col>
           		<el-date-picker type="datetime" placeholder="选择日期" v-model="updatePlan.end"></el-date-picker>
           	</el-col>
           </el-form-item>
     </el-form>
     <el-button @click="updateVisible=false">取消</el-button>
     <el-button @click="change()">确定</el-button>
</el-dialog>
</div>
</template>
<script> 
   export default{
   	  data(){
   	  	return{
   	  		  totalCount: 1000,
   	  		  pageSize:6,
   	  		
   	  		 currentPage:1,
   	  		searchVal:'',//搜索条件
   	  	       tableData:[],
   	  	       plan:{
   	  	       	 plan:'',
   	  	       	 user:'',
   	  	       	 start:'',
   	  	       	 end:'',
   	  	       },
   	  	       updatePlan:{
   	  	       	plan:'',
   	  	       	user:'',
   	  	       	start:'',
   	  	       	end:'',
   	  	       },
   	  	      dialogVisible:false,
   	  	      updateVisible:false,
 rules:{
          plan: [{ required: true, message: '请输入计划名称', trigger: 'blur' },],
          user: [{ required: true, message: '请输入参与者', trigger: 'blur' }],
          start:[{ type: 'date', required: true, message: '请选择日期', trigger: 'change' }],
          end:[{ type: 'date', required: true, message: '请选择时间', trigger: 'change' }]      
        }
	   }
   	  },
   	   methods:{
             getList(){
             	this.$http.get("http://localhost:8080/plan/selectAll").then((res)=>{
             	    this.totalCount=res.body.length;
             	}).catch(err=>{
             		 console.log(err);
             	})
             },
             change(updatePlanForm){                 
             	   let param=this.updatePlan;                	  
            this.$refs.updatePlanForm.validate((valid)=>{
            	if(valid){
            		if(param.start>=param.end){
                                this.$message({
                             	type:'error',
                             	message:'开始时间不能晚于结束时间',
                               });  
             			 	}else{
                       this.$confirm('确认要修改吗？','提示',{
                    	 confirmButtonText: '确定',
				         cancelButtonText: '取消',
				         type: 'warning'
                    }).then(()=>{
                    this.$http.put("http://localhost:8080/plan/changePlan",param).then((res)=>{
                               this.$message({
			                       	 type:'success',
			                       	 message:'修改成功'
                                  })
                              this.updateVisible=false;
                             this.loadData(this.currentPage,this.pageSize);  
                    }).catch(err=>{
                         this.$message({
                       	 type:'error',
                       	 message:'修改失败'
                       })
                    })
                  })
               }
            	}else{
            		this.$message({
                       	 type:'error',
                       	 message:'请输入合法的信息'
                       })
            	    }
                 })
             },
             del(index,row){          
                    this.$confirm('确认要删除吗？','提示',{
                    	 confirmButtonText: '确定',
				         cancelButtonText: '取消',
				         type: 'warning'
                    }).then(()=>{               	
          this.$http.delete(`http://localhost:8080/plan/deletePlan/${row.id}`).then((res)=>{
                       this.$message({
                       	 type:'success',
                       	 message:'删除成功'
                       })
                      this.loadData(this.currentPage,this.pageSize);  
                       this.totalCount=this.totalCount-1;  
          }).catch(err=>{
          	           this.$message({
                       	 type:'error',
                       	 message:'参数错误'
                       })
                    })
                 })                   
             },
             add(planForm){            	    
             	    let param=this.plan;
             		this.$refs.planForm.validate((valid)=>{                                         
             			 if(valid){
             			 	if(param.start>=param.end){
                                this.$message({
                             	type:'error',
                             	message:'开始时间不能晚于结束时间',
                             });  
             			 	}else{
             			 		this.$confirm('确认要添加吗？','提示',{
                    	 confirmButtonText: '确定',
				         cancelButtonText: '取消',
				         type: 'warning'
                    }).then(()=>{
             			 	this.$http.post("http://localhost:8080/plan/savePlan",param).then((res)=>{
                             this.$message({
                             	type:'success',
                             	message:'添加成功',
                             });
                             this.dialogVisible=false;
                             this.plan.user='';
                             this.plan.plan='';
                             this.plan.start='';
                             this.plan.end='';
                            this.loadData(this.currentPage,this.pageSize);
                            this.totalCount=this.totalCount+1;  
                  }).catch(err=>{
                  	  this.$message({
                             	type:'error',
                             	message:'添加失败',
                           });
                  	   })
                    })
                 } 
              }else{
                    this.$message({
                             	type:'error',
                             	message:'请输入合法的信息！',
                             });
             			 }
             		})              
               },
             edit(index,row){
             	this.updateVisible=true;
             	this.updatePlan=row;                      	
             } ,
           

loadData:function(searchVal,pageNum,pageSize){
   searchVal=this.searchVal;
   pageNum=this.currentPage;
   pageSize=this.pageSize;

    this.$http.get
    (`http://localhost:8080/plan/selectPlanPage?parameter=${searchVal}&pageNum=${pageNum}&pageSize=${pageSize}`).then(function(res){
                    
                        this.tableData=res.data;
                         
                        console.log(`第${this.currentPage}页,每页${this.pageSize}条`)
                    },function(){
                        console.log('failed');
                    });     
           },

           handleSizeChange(val){
                        this.pageSize=val;
                        this.loadData(this.searchVal,this.currentPage,this.pageSize);
                        
                       
           },
           handleCurrentChange(val){
           	              this.currentPage=val;
           	              this.loadData(this.searchVal,this.currentPage,this.pageSize);

           },


           







   	   },
   	   computed:{
               
   	   },
   	   created:function(){
   	   	  this.getList();
   	   	 
   	   	  this.loadData(this.searchVal,this.currentPage,this.pageSize);
   	   }
   }
</script>
<style>
	 .plan_table{
	 	margin-top:100px;
	 }
</style>