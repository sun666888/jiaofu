<template>
  <div class="search">
    <tableHead
      :title="'审核财务'"
      :form="form"
      :labelModel="[
        { name: 'ordernumber', nickName: '订单编号', labelType: 3 },
        { name: 'ordernumbers', nickName: '订购号码', labelType: 3 },
        { name: 'mebile', nickName: '联系电话', labelType: 3 },
        //省市县
        {
          name: 'province1',
          nickName: '归属省份',
          labelType: 4,
          data: province1
        },

        { name: 'name', nickName: '商品名称', labelType: 3 },
        { name: 'channel', nickName: '推广渠道', labelType: 2, data: channel },
        { name: 'payment', nickName: '付款方式', labelType: 2, data: payment },
        { name: 'deliver', nickName: '配送方式', labelType: 2, data: deliver },

        {
          name: 'platform',
          nickName: '回退筛选',
          labelType: 2,
          data: [{ name: '是' }, { name: '否' }]
        }
      ]"
      :tableBtn="[
        {
          transfer: 'search',
          name: '查询',
          icon: 'el-icon-search'
        },
        {
          transfer: 'pllq',
          name: '批量领取',
          icon: 'el-icon-download'
        }
      ]"
    />
    <!--批量领取 Form -->
    <el-dialog title="批量订单领取" :visible.sync="dialogFormVisible">
      <el-form :model="formGet" class="batch">
        <el-form-item label="可领取订单:" :label-width="formLabelWidth">
          <el-input :placeholder="formGet.count" disabled="false"></el-input>
        </el-form-item>
        <el-form-item label="领取订单数:" :label-width="formLabelWidth">
          <el-input type="number" v-model="formGet.num"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="
            dialogFormVisible = false;
            receive();
          "
          >确 定</el-button
        >
      </div>
    </el-dialog>
    <!-- 表格 -->
    <el-card class="box-card" style="margin-top:20px;">
      <el-table
        :data="tabData"
        border
        ref="tab"
        height="500"
        v-loading="isload"
        style="width: 100%; margin:20px auto;"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          fixed
          type="index"
          label="#"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          prop="ordernumber"
          label="订单编号"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          prop="ordernumbers"
          label="订单号码"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          prop="mebile"
          label="联系电话"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          prop="name"
          label="商品名称"
          align="center"
        ></el-table-column>
        <el-table-column
          fixed
          prop="username"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column fixed prop="first_result" label="地址" align="center"
          ><template slot-scope="scope">
            <span>{{
              scope.row.province + scope.row.city + scope.row.area
            }}</span>
          </template></el-table-column
        >
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button
              @click="single_receive(scope.row)"
              type="text"
              size="small"
              >{{ scope.row.uid != 0 ? "领取" : "未领取" }}</el-button
            >
          </template>
        </el-table-column>
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
.el-pagination {
  margin: 20px auto;
  text-align: center;
}
// .el-icon-star-on:before {
//   color: white;
//   content: "\e787";
// }
// .el-submenu .el-menu-item .el-icon-document:before {
//   color: white !important;
//   content: "";
// }
.batch {
  font-size: 20px;
  font-weight: bold;
}
</style>

<script>
import zyz from "./../services/zyz";
import tableHead from "./../models/tableHead";
export default {
  name: "search",
  inject: ["reload"],
  data() {
    return {
      channel: {},
      deliver: {},
      province1: [],
      dialogFormVisible: false,
      formGet: {
        count: "",
        num: ""
      },
      token: "",
      businessList: [],
      payment: "",
      form: {
        time: "",
        whaccount: "",
        mobile: "",
        result: "",
        payment: "",
        mebile: "",
        ordernumbers: "",
        deliver: "",
        channel: "",
        name: "",
        platform: "",
        ordernumber: "",
        pageSize: 10,
        pageIndex: 1
      },
      total: 0,
      tabData: [],
      isload: false,
      formLabelWidth: "120px",
      id: [],
      orderInfo: [],
      city: {},
      area: {}
    };
  },
  components: {
    tableHead
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    this.search();
    this.screen_info();
  },
  watch: {},
  methods: {
    //审核筛选信息
    screen_info() {
      let that = this;
      zyz.screen_info({ token: that.token }).then(res => {
        if (res.code == 0) {
          this.channel = this.getObj(res, "channel");
          this.payment = this.getObj(res, "payment");
          this.deliver = this.getObj(res, "deliver");
          this.tabData = res.data.data;
        } else {
          this.isload = false;
          this.$message.error(res.msg);
        }
      });
      zyz.gettocity().then(res => {
        console.log(res);
        this.province1 = this.getObj(res, "label", 1);
      });
    },
    getObj(res, key, type) {
      let channel = res.data ? res.data[key] : res;
      let obj = [];
      for (let index in channel) {
        if (!type) {
          obj[obj.length] = { name: channel[index][key] };
        } else {
          let children = channel[index].children;
          if (children) {
            children = this.getObj(children, key, type);
          }
          obj[obj.length] = {
            label: channel[index][key],
            value: channel[index][key],
            children: children
          };
        }
      }
      return obj;
    },
    // 项目名称
    getPro() {
      this.$http
        .post("/api/check/check_name", {
          token: this.token
        })
        .then(res => {
          if (res.code == 0) {
            this.businessList = res.data.info;
          } else {
            this.$message.error(res.msg);
          }
        })
        .catch(error => {
          this.$message.error("网络错误");
        });
    },
    handleSelectionChange(aaa) {
      console.log(aaa);
    },
    //可领取条数
    dialogForm() {
      zyz.receive_count(this.token).then(res => {
        if (res.code == 0) {
          this.formGet.count = res.data.count;
        } else {
          this.isload = false;
          this.$message.error(res.msg);
        }
      });
    },
    // //提交领取
    receive() {
      console.log(this.formGet.num);

      let rec = new FormData();
      rec.append("num", this.formGet.num);
      rec.append("token", this.token);

      zyz.receive(rec).then(res => {
        if (res.code == 0) {
          console.log(res.data);
          this.search()
        } else {
          this.isload = false;
          this.$message.error(res.msg);
        }
      });
    }, // //单个领取
    single_receive(aa) {
      let rec = new FormData();
      rec.append("id", aa.id);
      rec.append("token", this.token);

      zyz.single_receive(rec).then(res => {
        if (res.code == 0) {
          this.$message({
            message: "领取成功",
            type: "success"
          });
          this.search()
        } else {
          this.isload = false;
          this.$message.error(res.msg);
        }
      });
    },
    // 查询
    search() {
      this.isload = true;
      this.form.token = this.token;

      if (!this.form.pageSize) {
        this.form.pageSize = 10;
      }
         //判断拿到的省市区是否为空
      if (this.form.province1 != null) {
        this.form.city = this.form.province1[1];
        this.form.area = this.form.province1[2];
        let str = this.form.province1[0];
        if(this.form.province1[0]!=null){
        this.form.province = str.substring(0, str.length - 1);
        }
      } else {
        console.log("错误");
      }
      zyz
        .search(this.form)
        .then(res => {
          if (res.code == 0) {
            this.isload = false;
            this.tabData = res.data.data;
            this.total = res.data.count;
          } else {
            this.isload = false;
            this.$message.error(res.msg);
          }
        })
        .catch(err => {
          this.isload = false;
          this.$message.error(err.msg);
        });
    },
    batch() {
      this.isShow = true;
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
    pllq() {
      this.dialogFormVisible = true;
      this.dialogForm();
    }
  }
};
</script>
