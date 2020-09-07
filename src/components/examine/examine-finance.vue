<template>
  <div class="search">
    <tableHead
      :title="'审核财务'"
      :form="form"
      :labelModel="[
        { name: 'updated_at', nickName: '下单日期', labelType: 1 },
        {
          name: 'is_approved',
          nickName: '是否审核通过',
          labelType: 2,
          data: [{ name: '是' }, { name: '否' }]
        },
        { name: 'returnnum', nickName: '回访次数', labelType: 3 },
        { name: 'ordernumber', nickName: '订购号码', labelType: 3 },
        {
          name: 'is_outbound',
          nickName: '是否外呼',
          labelType: 2,
          data: [{ name: '是' }, { name: '否' }]
        },
        { name: 'resernumber', nickName: '预约号码', labelType: 3 },
        { name: 'abnormal_causes', nickName: '订单异常原因', labelType: 3 },
        {
          name: 'type',
          nickName: '审单类型',
          labelType: 2,
          data: [{ name: '初审' }, { name: '复审' }]
        },
        { name: 'mebile', nickName: '联系电话', labelType: 3 }
      ]"
      :tableBtn="[
        {
          transfer: 'search',
          name: '查询',
          icon: 'el-icon-search'
        },
        {
          transfer: 'export_A',
          name: '导出',
          icon: 'el-icon-search'
        }
      ]"
    />

    <!-- 批量提交 Form -->
    <el-dialog title="批量订单领取" :visible.sync="review" :before-close="close">
      <el-form ref="examineForm" :model="examineForm" label-width="100px" :inline="true">
        <el-form-item label="下单时间" prop="orderdate">
          <el-date-picker v-model="examineForm.orderdate" type="datetime" placeholder="选择日期时间"></el-date-picker>
        </el-form-item>
        <el-form-item label="订购号码" prop="ordernumber">
          <el-input v-model="examineForm.ordernumber" clearable placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="渠道" prop="channel">
          <el-select v-model="examineForm.channel" clearable placeholder="请选择渠道">
            <el-option
              v-for="item in channel"
              :key="item.value"
              :label="item.value"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="预约号码" prop="resernumber">
          <el-input v-model="examineForm.resernumber" clearable placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="交付方式" prop="deliver">
          <el-select v-model="examineForm.deliver" clearable placeholder="请选择">
            <el-option
              v-for="item in deliver"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系电话" prop="mebile">
          <el-input v-model="examineForm.mebile" clearable placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="是否审核通过" prop="is_approved">
          <el-select v-model="examineForm.is_approved" clearable placeholder="请选择">
            <el-option
              v-for="item in is_approved"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否外呼" prop="is_outbound">
          <el-select v-model="examineForm.is_outbound" clearable placeholder="请选择">
            <el-option
              v-for="item in is_outbound"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单异常原因" prop="abnormal_causes">
          <el-select v-model="examineForm.abnormal_causes" clearable placeholder="请选择">
            <el-option
              v-for="item in abnormal_causes"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回访结果" prop="return_results">
          <el-select v-model="examineForm.return_results" clearable placeholder="请选择">
            <el-option
              v-for="item in return_results"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="退单原因" prop="chargeback_reason">
          <el-select v-model="examineForm.chargeback_reason" clearable placeholder="请选择">
            <el-option
              v-for="item in chargeback_reason"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核类型" prop="type">
          <el-select v-model="examineForm.type" clearable placeholder="请选择">
            <el-option
              v-for="item in type"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="回访次数" prop="returnnum">
          <el-select v-model="examineForm.returnnum" clearable placeholder="请选择">
            <el-option
              v-for="item in returnnum"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="备 注" prop="remarks">
          <el-input v-model="examineForm.remarks" clearable placeholder="单行输入"></el-input>
        </el-form-item>
        <el-form-item label="再次跟进时间" prop="follow">
          <el-select v-model="examineForm.follow" clearable placeholder="请选择">
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
        <el-button @click="close">取 消</el-button>
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
        <el-table-column type="index" label="#" align="center"></el-table-column>
        <el-table-column prop="ordernumber" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="ordernumbers" label="订单号码" align="center"></el-table-column>
        <el-table-column prop="mebile" label="联系电话" align="center"></el-table-column>
        <el-table-column prop="name" label="商品名称" align="center"></el-table-column>
        <el-table-column prop="remarks" label="下单方式" align="center"></el-table-column>
        <el-table-column prop="province" label="地址" align="center">
          <template slot-scope="scope">
            <span class="dizhi" @click="getMap(scope.row)">
              {{
              scope.row.province + scope.row.city + scope.row.area
              }}
            </span>
          </template>
        </el-table-column>
        <el-table-column prop="updated_at" label="下单时间" align="center"></el-table-column>
        <el-table-column prop="is_approved" label="是否审核通过" align="center"></el-table-column>
        <el-table-column fixed="right" label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="openD(scope.row)" type="text" size="small">编辑</el-button>
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

    <div v-if="isMapShow" style="border:1px solid #000;height:500px;margin-top:20px">
      <el-amap
        ref="map"
        vid="amapDemo"
        :amap-manager="amapManager"
        :center="center"
        :zoom="zoom"
        class="amap-demo"
      >
        <el-amap-marker vid="orderdot1" :position="position"></el-amap-marker>
      </el-amap>
    </div>
  </div>
</template>

<style lang="scss">
.map {
  width: 100%;
  height: 300px;
}
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
.dizhi {
  cursor: pointer;
}
</style>
<script>
let amapManager = new VueAMap.AMapManager();
import VueAMap from "vue-amap";
import { lazyAMapApiLoaderInstance } from "vue-amap";
import zyz from "./../services/zyz";
//form 表单组件
import tableHead from "./../models/tableHead";
import Axios from "axios";
export default {
  name: "search",
  inject: ["reload"],
  data() {
    return {
      token: "",
      value1: "",
      ruleForm: "",
      payment: "",
      review: false,
      center: "",
      businessList: [],
      form: {
        pageIndex: 1,
        pageSize: 10,
        channel: "",
        deliver: "",
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
        token: "",
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
        follow: "",
      },
      total: 0,
      tabData: [],
      isload: false,
      formLabelWidth: "120px",
      id: [],
      channel: [
        {
          value: "商城",
        },
        {
          value: "中台",
        },
      ],
      deliver: [
        {
          value: "上门交付",
        },
        {
          value: "物流配送",
        },
        {
          value: "上门转物流",
        },
        {
          value: "无需配送",
        },
      ],
      is_approved: [
        {
          value: "是",
        },
        {
          value: "否",
        },
      ],
      is_outbound: [
        {
          value: "是",
        },
        {
          value: "否",
        },
      ],
      abnormal_causes: [
        {
          value: "超200黑名单用户",
        },
        {
          value: "无异常正常回访",
        },
        {
          value: "地址不详",
        },
        {
          value: "资料未覆盖",
        },
        {
          value: "未满16周岁",
        },
        {
          value: "重复下单",
        },
        {
          value: "测试单",
        },
        {
          value: "国政通校验异常",
        },
        {
          value: "信安黑名单",
        },
        {
          value: "照片审核不合格",
        },
        {
          value: "无业务放装能力",
        },
        {
          value: "一证五户",
        },
        {
          value: "专员回退",
        },
        {
          value: "身份证号码与姓名不一致",
        },
        {
          value: "国政通无此身份证",
        },
      ],
      return_results: [
        {
          value: "退单",
        },
        {
          value: "未接通通过",
        },
        {
          value: "接通通过",
        },
        {
          value: "无人接听",
        },
        {
          value: "拒接",
        },
        {
          value: "关机",
        },
        {
          value: "拒访",
        },
        {
          value: "非本人",
        },
        {
          value: "接通保留",
        },
        {
          value: "无法接通",
        },
        {
          value: "空号",
        },
        {
          value: "停机",
        },
        {
          value: "忙音",
        },
      ],
      chargeback_reason: [
        {
          value: "未接通退单",
        },
        {
          value: "不需要了",
        },
        {
          value: "无资源",
        },
        {
          value: "重复下单",
        },
        {
          value: "测试",
        },
        {
          value: "超时效退单",
        },
      ],
      type: [
        {
          value: "初审",
        },
        {
          value: "复审",
        },
      ],
      returnnum: [
        {
          value: "1",
        },
        {
          value: "2",
        },
        {
          value: "3",
        },
        {
          value: "4",
        },
        {
          value: "5",
        },
        {
          value: "0",
        },
      ],
      follow: [
        {
          value: "2小时内",
        },
        {
          value: "3小时外",
        },
      ],
      remarks: [
        {
          value: "有",
        },
        {
          value: "无",
        },
      ],
      mapForm: {},
      amapManager,
      // 缩放比
      zoom: 11,

      // 地图中心
      center: [121.5273285, 31.21515044],

      // 比例尺
      plugin: [
        {
          pName: "Scale",
        },
      ],
      // 标点地址
      position: [121.5273285, 31.21515044],
      isMapShow: false,
    };
  },
  //引入form表单组件
  components: {
    tableHead,
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    this.search();
    this.screen_info();
  },
  methods: {
    getMap(rowData) {
      let that = this;
      const loading = this.$loading({
        lock: true,
        text: "正在获取定位中...",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      that.isMapShow = true;
      // 高德sdk
      let geocoder = new AMap.Geocoder({
        city: "全国",
      });
      let lng = "";
      let lat = "";
      geocoder.getLocation(
        rowData.province + rowData.city + rowData.area,
        function (status, result) {
          if (status === "complete" && result.info === "OK") {
            if (result && result.geocodes) {
              loading.close();
              let lng = result.geocodes[0].location.lng;
              let lat = result.geocodes[0].location.lat;
              that.center = [lng, lat];
              that.position = [lng, lat];
            }
          } else {
            that.$message.error("地址没找到");
          }
        }
      );
    },
    change(e) {
      this.$forceUpdate();
    },
    // 查询
    search() {
      if (!this.form.pageSize) {
        this.form.pageSize = 10;
      }
      this.form.token = this.token;
      zyz
        .standing_book(this.form)
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
    //审核筛选信息
    screen_info() {
      zyz.screen_info({ token: this.token }).then((res) => {
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
    },
    openD(obj) {
      this.examineForm = obj;
      this.review = true;
    },
    getObj(res, key) {
      let channel = res.data[key];
      let obj = [];
      for (let index in channel) {
        obj[obj.length] = { name: channel[index][key] };
      }
      return obj;
    },
    //导出
    export_A() {
      console.log(this.form);
      window.location.href =
        "/api/examine/export?token=" +
        this.token +
        "&channel=" +
        this.form.channel +
        "&deliver=" +
        this.form.deliver +
        "&ordernumber=" +
        this.form.ordernumber +
        "&resernumber=" +
        this.form.resernumber +
        "&mebile=" +
        this.form.mebile +
        "&is_approved=" +
        this.form.is_approved +
        "&is_outbound=" +
        this.form.is_outbound +
        "&abnormal_causes=" +
        this.form.abnormal_causes +
        "&return_results=" +
        this.form.return_results +
        "&chargeback_reason=" +
        this.form.chargeback_reason +
        "&type=" +
        this.form.type +
        "&returnnum=" +
        this.form.returnnum;
    },
    close() {
      this.review = false;
      console.log(this.$refs.examineForm);
      this.$nextTick(() => {
        this.$refs.examineForm.resetFields();
      });
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
      zyz.examine_info(examine).then((res) => {
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
    },
  },
};
</script>
