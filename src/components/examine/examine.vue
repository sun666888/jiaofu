<template>
  <div class="search">
    <el-card class="box-card">
      <el-form
        class="diaplayinformationcenter"
        ref="form"
        :model="form"
        label-width="80px"
        :inline="true"
      >
        <el-form-item label="日期" prop="time">
          <el-date-picker
            v-model="form.time"
            type="date"
            value-format="yyyyMMdd"
            placeholder="请选择时间"
          ></el-date-picker>
        </el-form-item>
        <el-form-item label="项目名称" prop="name">
          <el-select v-model="form.name" clearable placeholder="请选择">
            <el-option
              v-for="(item, index) in businessList"
              :key="index"
              :label="item.name"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="外呼工号" prop="whaccount">
          <el-input v-model="form.whaccount" clearable placeholder="请输入外呼工号"></el-input>
        </el-form-item>
        <el-form-item label="号码" prop="mobile">
          <el-input v-model="form.mobile" clearable placeholder="请输入号码"></el-input>
        </el-form-item>
        <el-form-item label="质检结果" prop="result">
          <el-select v-model="form.result" clearable placeholder="请选择">
            <el-option label="合格" value="合格"></el-option>
            <el-option label="不合格" value="不合格"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="success" size="medium" icon="el-icon-search" @click="search">查询</el-button>
        <el-button type="warning" size="medium" icon="el-icon-download" @click="dao">导出</el-button>
      </el-form>
    </el-card>
    <el-card class="box-card" style="margin-top:20px;">
      <el-table
        :data="tabData"
        border
        ref="tab"
        height="500"
        v-loading="isload"
        style="width: 100%; margin:20px auto;"
      >
        <el-table-column fixed type="index" label="#" align="center"></el-table-column>
        <el-table-column fixed prop="name" label="业务名称" align="center"></el-table-column>
        <el-table-column fixed prop="time" label="日期" align="center"></el-table-column>
        <el-table-column fixed prop="mobile" label="号码" align="center"></el-table-column>
        <el-table-column fixed prop="whaccount" label="外呼工号" align="center"></el-table-column>
        <el-table-column fixed prop="username" label="员工姓名" align="center"></el-table-column>
        <el-table-column fixed prop="first_result" label="质检结果" align="center"></el-table-column>
        <el-table-column fixed prop="must_say" label="整改措施" align="center"></el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="form.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
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
  data() {
    return {
      token: '',
      businessList: [],
      form: {
        time: "",
        name: "",
        whaccount: "",
        mobile: "",
        result: "",
        pageSize: 10,
        pageIndex: 1,
      },
      total: 0,
      tabData: [],
      isload: false,
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    this.search();
    this.getPro()
  },
  watch: {

  },
  methods: {
    // 项目名称
    getPro() {
        this.$http
        .post("/api/check/check_name",{
          token: this.token
        })
        .then(res => {
          if (res.code == 0) { 
            this.businessList = res.data.info
          } else {
            this.$message.error(res.msg)
          }
        })
        .catch(error => {
          this.$message.error('网络错误')
        });
    },
    // 查询
    search() {
      this.isload = true;
      this.form.token = this.token;
      zyz
        .checkTotalSearch(this.form)
        .then((res) => {
          if (res.code == 0) {
            this.isload = false;
            this.tabData = res.data.data;
            this.total = res.data.count;
          } else {
            this.isload = false;
            this.$message.error(res.msg);
          }
        })
        .catch((err) => {
          this.isload = false;
          this.$message.error(err.msg);
        });
    },
    // pageSize
    handleSizeChange(val) {
      this.form.pageSize = val;
      this.search();
    },
    // pageIndex
    handleCurrentChange(val) {
      this.form.pageIndex = val;
      this.search();
    },
    dao() {
      window.location.href =
        "/api/check/total_export?token=" +
        this.token +
        "&time=" +
        this.form.time +
        "&name=" +
        this.form.name +
        "&whaccount=" +
        this.form.whaccount +
        "&mobile=" +
        this.form.mobile +
        "&result=" +
        this.form.result 
    }
  }
};
</script>
