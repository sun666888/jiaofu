<template>
  <div class="dispatch">
    <div class="center father">
      <el-card>
          <el-form
            class="diaplayinformationcenter"
            ref="form"
            :model="form"
            label-width="100px"
            :inline="true"
          >
            <el-form-item label="订单编号" prop="ordernumber">
              <el-input v-model="form.ordernumber" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="订购号码" prop="ordernumbers">
              <el-input v-model="form.ordernumbers" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="上班日期" prop="workday">
              <el-date-picker
              v-model="form.workday"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="成交时间" prop="deal_at">
              <el-date-picker
              v-model="form.deal_at"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="联系电话" prop="mobile">
              <el-input v-model="form.mobile" clearable placeholder="请输入号码"></el-input>
            </el-form-item>
            <el-form-item label="派单状态" prop="distribute">
              <el-select v-model="form.distribute" clearable placeholder="请选择">
                <el-option label="首次派单" value="首次派单"></el-option>
                <el-option label="再次派单" value="再次派单"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作时间" prop="updated_at">
              <el-date-picker
              v-model="form.updated_at"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-button type="primary" style="margin-left: 20px;" size="medium" icon="el-icon-search" @click="search">查询</el-button>
            <el-button type="primary" style="margin-left: 20px;" size="medium" icon="el-icon-check" @click="getPi">批量领取</el-button>
          </el-form>
        </el-card>
        <el-card style="margin-top: 20px">
          <el-table
            :data="tabData"
            border
            ref="tab"
            height="500"
            v-loading="isload"
            @selection-change="handleSelectionChange"
            style="width: 100%; margin:20px auto;"
          >
            <!-- <el-table-column type="selection" label="全选" align="center"></el-table-column> -->
            <el-table-column prop="ordernumber" label="订单编号"  align="center"></el-table-column>
            <el-table-column prop="ordernumbers" label="订购号码" align="center"></el-table-column>
            <el-table-column prop="mobile" label="联系电话"  align="center"></el-table-column>
            <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
            <el-table-column prop="updated_at" label="操作时间" align="center"></el-table-column>
            <el-table-column prop="deal_at" label="成交时间" align="center"></el-table-column>
            <el-table-column prop="address" label="地址" align="center" width='400'></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope" >
                <el-button type="primary" size="mini" icon="el-icon-check"  @click="ling(scope.row)">领取</el-button>
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

        <el-dialog title="批量领取" :visible.sync="piShow" :before-close="piClose">
          <el-form ref="piForm" :model="piForm">
            <el-form-item label="可领取订单：" prop="nums">
              <el-input style="width:100px" v-model="piForm.nums" readonly auto-complete="off"></el-input>  单
            </el-form-item>
            <el-form-item label="领取订单数：" prop="num">
              <el-input style="width:100px" v-model="piForm.num" clearable auto-complete="off"></el-input>  单
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="piClose">取 消</el-button>
            <el-button type="primary" :loading="isloadBtn" @click="pi">确 定</el-button>
          </div>
        </el-dialog>

    </div>
  </div>
</template>

<script>
import zyz from "./../services/zyz";
export default {
  name: "dispatch",
  inject:['reload'], 
  data() {
    return {
      token: '',
      platformList: [],
      businessList: [],
      date: [],
      form: {
        ordernumber: '',
        ordernumbers: '',
        workday: '',
        deal_at: '',
        mobile: '',
        distribute: '',
        updated_at: '',
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      tabData: [],
      isload:false,
      piShow: false,
      piForm: {
        nums: 0,
        num: 0
      },
      isloadBtn: false

    };
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    this.search()
  },
  watch: {
    
  },
  methods: {
    search() {
      this.isload = true
      this.form.token = this.token
      zyz.dispatchList(this.form).then(res => {
        if (res.code == 0) {
          this.isload = false
          this.total = res.data.count
          this.tabData = res.data.data
        } else {
          this.isload = false
          this.$message.error(res.msg)
        }
      })
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
      
    },
    ling(rowData) {
      zyz.singleReceive(rowData.id, this.token).then(res => {
        if (res.code == 0) {
          this.$message.success('领取成功')
          this.search()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    getPi() {
      this.piShow = true
      zyz.receiveCount(this.token).then(res => {
        if (res.code == 0) {
          this.piForm.nums = res.data.count
        }
      })
    },
    piClose() {
      this.$refs.piForm.resetFields()
      this.piShow = false
    },
    pi() {
      this.isloadBtn = true
      zyz.receive(this.piForm.num,this.token).then(res => {
        if (res.code == 0) {
          this.isloadBtn = false
          this.$message.success('领取成功')
          this.piShow = false
          this.$refs.piForm.resetFields()
          this.search()
        } else {
          this.isloadBtn = false
          this.$message.error(res.msg)
        }
      })
    }
  }
};
</script>

<style lang="scss">
.dispatch {
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
  
}
.el-pagination{
    margin: 20px auto;
		text-align: center;
	}
</style>
