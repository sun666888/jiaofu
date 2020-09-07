<template>
  <div class="search">
    <el-card class="box-card">
      <el-form
        class="diaplayinformationcenter"
        ref="form"
        :model="form"
        label-width="100px"
        :inline="true"
      >
       
        <el-form-item :label="data.nickName" :prop="data.name" v-for="(data,index) in labelModel " :key="index+2">
            <el-date-picker
            v-model="form[data.name]"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            :placeholder="'请选择'+data.nickName"
            v-if="data.labelType==1"></el-date-picker>

            <el-select v-if="data.labelType==2" v-model="form[data.name]" clearable :placeholder="data.nickName" >
            <el-option
              v-for="(item, index) in data.data"
              :key="index"
              :label="item.name"
              :value="(!item.val)?item.name:item.val"
            ></el-option>
          </el-select>

            <el-input v-model="form[data.name]" clearable :placeholder="'请输入'+data.nickName" v-if="data.labelType==3"></el-input>

                <el-cascader v-bind:options="data.data" clearable v-if="data.labelType==4" v-model="form[data.name]" ></el-cascader>
              
        </el-form-item>

        <el-button v-for="(data,index) in tableBtn" type="primary" size="medium" :icon="data.icon" @click="$parent[data.transfer](this);" :key="index">{{data.name}}</el-button>
        
      </el-form>
    </el-card>
    
  </div>
</template>

<style lang="scss">
.search {
  // 覆写el样式,调整输入框宽度 start
  .form_input {
    .el-form-item__content {
      width: 220px;
    }
  }
  .form_select {
    .el-select {
      width: 220px;
    }
  }
  .el-pagination {
    padding-top: 5px;
  }
  .el-form-item {
    margin-bottom: 20px;
  }
  // 覆写el样式,调整输入框宽度 end
  .operate {
    padding-bottom: 10px;
  }
}
.el-pagination{
    margin: 20px auto;
		text-align: center;
	}
</style>


<script>
import zyz from "./../services/zyz";
export default {
  name: "search",
  inject:['reload'], 
  props:{
      form:Object,
      labelModel:Array,
      tableBtn:Array
  }

};
</script>
