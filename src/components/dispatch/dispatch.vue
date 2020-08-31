<template>
  <div class="open">
    <div class="center father">
      <el-card>
          <el-form
            class="diaplayinformationcenter"
            ref="form"
            :model="form"
            label-width="100px"
            :inline="true"
          >
            <el-form-item label="开发时间" prop="develop_at">
              <el-date-picker
              v-model="form.develop_at"
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
            <el-form-item label="号码" prop="mobile">
              <el-input v-model="form.mobile" clearable placeholder="请输入号码"></el-input>
            </el-form-item>
            <el-form-item label="开通状态" prop="kt_state">
              <el-select v-model="form.kt_state" clearable placeholder="请选择">
                <el-option label="待开户" value="0"></el-option>
                <el-option label="开户成功" value="1"></el-option>
                <el-option label="开户失败" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" style="margin-left: 20px;" size="medium" icon="el-icon-download" @click="dao">导出</el-button>
          </el-form>
        </el-card>
        <el-card>
          <el-table
            :data="tabData"
            border
            ref="tab"
            height="500"
            v-loading="isload"
            @selection-change="handleSelectionChange"
            style="width: 100%; margin:20px auto;"
          >
            <el-table-column type="selection" label="全选" align="center"></el-table-column>
            <el-table-column prop="name" label="项目名称"  align="center" width='300'></el-table-column>
            <el-table-column prop="city" label="地市" align="center"></el-table-column>
            <el-table-column prop="mobile" label="号码"  align="center" width='150'></el-table-column>
            <el-table-column prop="develop_at" label="开发时间" align="center" width='150'></el-table-column>
            <el-table-column prop="platform" label="平台" align="center"></el-table-column>
            <el-table-column prop="username" label="员工姓名" align="center"></el-table-column>
            <el-table-column prop="return_remarks" label="回访备注" align="center" width='200'></el-table-column>
            <el-table-column fixed="right" label="操作" align="center" width='300'>
              <template slot-scope="scope" >
                <el-button type="primary" size="mini" icon="el-icon-caret-right"  @click="open(scope.row)">开户</el-button>
              </template>
            </el-table-column>
          </el-table>

          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="form.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-card>
    </div>
  </div>
</template>

<script>
import zyz from "./../services/zyz";
export default {
  name: "open",
  inject:['reload'], 
  data() {
    return {
      token: '',
      platformList: [],
      businessList: [],
      date: [],
      form: {
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      tabData: [],
      isload:false,
      multipleSelection: []
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    zyz.caiName(this.token).then(res => {
      if (res.code == 0) {
        this.businessList = res.data.info
      } else {
        this.$message.error(res.msg)
      }
    })
  },
  watch: {
    
  },
  methods: {
    search() {

    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val;
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
      
    }
  }
};
</script>

<style lang="scss">
.open {
  .father:after {
    content: '';
    display: block;
    height: 0;
    clear: both;
  }

  .father {
    zoom: 1;
  }

  .fl {
    float: left;
  }

  .fr {
    float: right;
  }
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
  .center {
    width: 100%;
    margin: 20px 0;
  }
  .left {
    width: 15%;
    height: 850px;
    float: left;
    background: #eee;
    overflow-y: auto;
    box-shadow: 0 10px 12px rgba(0, 0, 0, 0.1);
    border: 1px solid #ccc;
    border-radius: 5px;
    .box-card {
      width: 90%;
      margin: 10px auto;
      cursor: pointer;
      .left_header {
        font-size: 18px;
        font-weight: 700;
        text-align: center;
      }
      .left_progress {
        margin: 20px 0;
        .el-progress {
          width: 58%;
          display: inline-block;
        }
        span {
          margin-left: 10px;
        }
      }
      .left_bot {
        margin-top: 20px;
      }
    }
    .box_blue {
      border: 2px solid blue;
    }
  }
  .right {
    width: 84%;
    float: left;
    height: 850px;
    margin-left: 0.5%;
    background: #fff;
    border-radius: 5px;
    .right_header {
      padding: 20px 0;
      border-bottom: 1px solid #eee;
      .el-form-item {
        margin-bottom: 10px;
      }
      // .caozuo {
      //   display: inline-block;
      //   float: right;
      //   margin-right: 50px;
      // }
    }
    .right_content {
      width: 98%;
      margin: 0 auto;
    }
  }
}
.el-pagination{
    margin: 20px auto;
		text-align: center;
	}
</style>
