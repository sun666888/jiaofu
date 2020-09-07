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
        { name: 'orderdate', nickName: '下单时间', labelType: 1 },
        {
          name: 'remarks',
          nickName: '备注',
          labelType: 2,
          data: [{ name: '有' }, { name: '无' }]
        },
        {
          name: 'is_approved',
          nickName: '是否审核通过',
          labelType: 2,
          data: [{ name: '是' }, { name: '否' }]
        }
      ]"
      :tableBtn="[
        {
          transfer: 'search',
          name: '查询',
          icon: 'el-icon-search'
        }
      ]"
    />

    <!-- 批量提交 Form -->
    <el-dialog title="财务录入" :visible.sync="review" :before-close="colse">
      <el-form
        :model="examineForm"
        ref="examineForm"
        label-width="100px"
        :inline="true"
      >
        <el-form-item label="下单时间">
          <el-input
            v-model="examineForm.order_time"
            clearable
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="订购号码" prop="ordernumber">
          <el-input
            v-model="examineForm.ordernumber"
            clearable
            :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="渠道" prop="channel">
            <el-input
            v-model="examineForm.channel"
            clearable
             :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="预约号码" prop="resernumber">
          <el-input
            v-model="examineForm.resernumber"
            clearable
             :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="交付方式" prop="payment">
            <el-input
            v-model="examineForm.deliver"
            clearable
             :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="联系电话" prop="result">
          <el-input
            v-model="examineForm.mebile"
            clearable
             :disabled="true"
          ></el-input>
        </el-form-item>
        <el-form-item label="是否审核通过" prop="time">
          <el-select
            v-model="examineForm.is_approved"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in is_approved"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否外呼" prop="result">
          <el-select
            v-model="examineForm.is_outbound"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in is_outbound"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单异常原因" prop="result">
          <el-select
            v-model="examineForm.abnormal_causes"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in abnormal_causes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回访结果" prop="time">
          <el-select
            v-model="examineForm.return_results"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in return_results"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退单原因" prop="time">
          <el-select
            v-model="examineForm.chargeback_reason"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in chargeback_reason"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核类型" prop="time">
          <el-select v-model="examineForm.type" clearable placeholder="请选择">
            <el-option
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回访次数" prop="time">
          <el-select
            v-model="examineForm.returnnum"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in returnnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备 注" prop="time">
          <el-input
            v-model="examineForm.remarks"
            clearable
            placeholder="单行输入"
          ></el-input>
        </el-form-item>
        <el-form-item label="再次跟进时间" prop="time">
          <el-select
            v-model="examineForm.follow"
            clearable
            placeholder="请选择"
          >
            <el-option
              v-for="item in follow"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="colse()">取 消</el-button>
        <el-button type="primary" @click="examine_search">确 定</el-button>
      </div>
    </el-dialog>

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
          prop="remarks"
          label="备注"
          align="center"
        ></el-table-column>
        <el-table-column fixed prop="province" label="地址" align="center">
          <template slot-scope="scope">
            <span>{{
              scope.row.province + scope.row.city + scope.row.area
            }}</span>
          </template></el-table-column
        >
        <el-table-column
          fixed
          prop="orderdate"
          label="下单时间"
          align="center"
        ></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="openD(scope.row)" type="text" size="small"
              >提交</el-button
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
      token: "",
      value1: "",
      ruleForm: "",
      payment: "",
      province1: [],
      review: false,
      businessList: [],
      form: {
        ordernumber: "",
        name: "",
        ordernumbers: "",
        province1: [],
        province: "",
        city: "",
        area: "",
        mebile: "",
        payment: "",
        deliver: "",
        channel: "",
        orderdate: "",
        remarks: "",
        pageSize: 10,
        pageIndex: 1
      },

      examineForm: {
        id: "",
        orderdate: "",
        channel: "",
        deliver: "",
        ordernumbers: "",
        ordernumber: "",
        resernumber: "",
        mebile: "",
        is_approved: "",
        is_outbound: "",
        abnormal_causes: "",
        return_results: "",
        chargeback_reason: "",
        type: "",
        returnnum: "",
        remarks: "",
        follow: ""
      },
      total: 0,
      tabData: [],
      isload: false,
      formLabelWidth: "120px",
      id: [],
      channel: [
        {
          value: "商城"
        },
        {
          value: "中台"
        }
      ],
      deliver: [
        {
          value: "上门交付"
        },
        {
          value: "物流配送"
        },
        {
          value: "上门转物流"
        },
        {
          value: "无需配送"
        }
      ],
      is_approved: [
        {
          value: "是"
        },
        {
          value: "否"
        }
      ],
      is_outbound: [
        {
          value: "是"
        },
        {
          value: "否"
        }
      ],
      abnormal_causes: [
        {
          value: "超200黑名单用户"
        },
        {
          value: "无异常正常回访"
        },
        {
          value: "地址不详"
        },
        {
          value: "资料未覆盖"
        },
        {
          value: "未满16周岁"
        },
        {
          value: "重复下单"
        },
        {
          value: "测试单"
        },
        {
          value: "国政通校验异常"
        },
        {
          value: "信安黑名单"
        },
        {
          value: "照片审核不合格"
        },
        {
          value: "无业务放装能力"
        },
        {
          value: "一证五户"
        },
        {
          value: "专员回退"
        },
        {
          value: "身份证号码与姓名不一致"
        },
        {
          value: "国政通无此身份证"
        }
      ],
      return_results: [
        {
          value: "退单"
        },
        {
          value: "未接通通过"
        },
        {
          value: "接通通过"
        },
        {
          value: "无人接听"
        },
        {
          value: "拒接"
        },
        {
          value: "关机"
        },
        {
          value: "拒访"
        },
        {
          value: "非本人"
        },
        {
          value: "接通保留"
        },
        {
          value: "无法接通"
        },
        {
          value: "空号"
        },
        {
          value: "停机"
        },
        {
          value: "忙音"
        }
      ],
      chargeback_reason: [
        {
          value: "未接通退单"
        },
        {
          value: "不需要了"
        },
        {
          value: "无资源"
        },
        {
          value: "重复下单"
        },
        {
          value: "测试"
        },
        {
          value: "超时效退单"
        }
      ],
      type: [
        {
          value: "初审"
        },
        {
          value: "复审"
        }
      ],
      returnnum: [
        {
          value: "1"
        },
        {
          value: "2"
        },
        {
          value: "3"
        },
        {
          value: "4"
        },
        {
          value: "5"
        },
        {
          value: "0"
        }
      ],
      follow: [
        {
          value: "2小时内"
        },
        {
          value: "3小时外"
        }
      ],
      remarks: [
        {
          value: "有"
        },
        {
          value: "无"
        }
      ],
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
    change(e) {
      this.$forceUpdate();
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
    // 查询
    search() {
      this.isload = true;
      this.form.token = this.token;
      if (!this.form.pageSize) {
        this.form.pageSize = 10;
      }
      //判断拿到的省市区是否为空
      if (this.form.province1[0] != null) {
        this.form.city = this.form.province1[1];
        this.form.area = this.form.province1[2];
        console.log(typeof this.form.province1[0]);
        let str = this.form.province1[0];
        this.form.province = str.substring(0, str.length - 1);
      } else {
        console.log("条件为空");
      }
      zyz
        .examine_search(this.form)
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
    //审核筛选信息
    screen_info() {
      zyz.screen_info({ token: this.token }).then(res => {
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
    openD(obj) {
      this.examineForm = obj;
      this.review = true;
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
    colse() {
      this.$refs.examineForm.resetFields()
      this.review = false;
    },
    examine_search() {
      let examine = new FormData();
      let d = new Date();
      var a =
        d.getFullYear() +
        "-" +
        (d.getMonth() + 1) +
        "-" +
        d.getDate() +
        " " +
        d.getHours() +
        ":" +
        d.getMinutes() +
        ":" +
        d.getSeconds();
      examine.append("id", this.examineForm.id);
      examine.append("orderdate", a);
      examine.append("channel", this.examineForm.channel);
      examine.append("deliver", this.examineForm.deliver);
      examine.append("ordernumbers", this.examineForm.ordernumbers);
      examine.append("ordernumber", this.examineForm.ordernumber);
      examine.append("resernumber", this.examineForm.resernumber);
      examine.append("mebile", this.examineForm.mebile);
      examine.append("is_approved", this.examineForm.is_approved);
      examine.append("is_outbound", this.examineForm.is_outbound);
      examine.append("abnormal_causes", this.examineForm.abnormal_causes);
      examine.append("return_results", this.examineForm.return_results);
      examine.append("chargeback_reason", this.examineForm.chargeback_reason);
      examine.append("type", this.examineForm.type);
      examine.append("returnnum", this.examineForm.returnnum);
      examine.append("remarks", this.examineForm.remarks);
      examine.append("follow", this.examineForm.follow);
      examine.append("token", this.token);
      zyz.examine(examine).then(res => {
        if (res.code == 0) {
          console.log(res.data);
          this.review = false;
          this.search()
        } else {
          this.isload = false;
          this.$message.error(res.msg);
        }
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
    handleSelectionChange(order) {
      this.examineForm.id = order[order.length - 1].id;
      this.examineForm.ordernumbers = order[order.length - 1].ordernumbers;
    }
  }
};
</script>
