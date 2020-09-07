<template>
  <div class="scalping">
    <div class="center father">
      <el-card>
          <el-form
            class="diaplayinformationcenter"
            ref="form"
            :model="form"
            label-width="100px"
            :inline="true"
          > 
            <el-form-item label="渠道" prop="channel">
              <el-select v-model="form.channel" clearable placeholder="请选择">
                <el-option v-for="(item, index) in channelList" :key="index" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="操作时间" prop="opt_at">
              <el-date-picker
              v-model="form.opt_at"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="处理人" prop="handler">
              <el-select v-model="form.handler" clearable placeholder="请选择">
                <el-option v-for="(item, index) in userList" :key="index" :label="item.account" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否有订单" prop="is_has">
              <el-select v-model="form.is_has" clearable placeholder="请选择">
                <el-option label="是" :value="1"></el-option>
                <el-option label="否" :value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" style="margin-left: 20px;" size="medium" icon="el-icon-search" @click="search">查询</el-button>
            <el-button type="primary" style="margin-left: 20px;" size="medium" icon="el-icon-download" @click="dao">导出</el-button>
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
            <el-table-column prop="opt_at" label="操作时间"  align="center"></el-table-column>
            <el-table-column prop="channel" label="渠道" align="center"></el-table-column>
            <el-table-column prop="is_has" label="是否有订单"  align="center">
              <template slot-scope="scope" >
                <span :style="{color: scope.row.is_has == 0 ? 'red' : 'green'}" >{{ scope.row.is_has == 0 ? '否' : '是' }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="imgurl" label="图片" align="center">
              <template slot-scope="scope">
                <viewer class="imgUrl"> 
                  <img v-show="scope.row.imgurl" style="cursor: pointer;" width="100px" height="100px" :src="url + scope.row.imgurl" alt="">
                </viewer>
              </template>
            </el-table-column>
            <el-table-column prop="handler" label="处理人" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope" >
                <el-button :type="scope.row.status == 0 ? 'primary' : 'success'" size="mini" :icon="scope.row.status == 0 ? 'el-icon-edit' : 'el-icon-check'"  @click="handle(scope.row)">{{ scope.row.status == 0 ? '处理' : '已处理' }}</el-button>
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
        <audio id="bgMusic" hidden preload="auto" controls="controls" ref="audio"></audio>
        
    </div>
  </div>
</template>

<script>
import zyz from "./../services/zyz";
import lxw from "./../services/lxw";
export default {
  name: "scalping",
  inject:['reload'], 
  data() {
    return {
      token: '',
      channelList: [],
      userList: [],
      date: [],
      form: {
        opt_at: '',
        channel: '',
        handler: '',
        is_has: '',
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      tabData: [],
      isload:false,
      url: 'http://deliverrobot.yslwebsite.com:8085/uploads/images/',
      dingData: []

    };
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    this.search()
    this.getChannel()
    this.getUser()
    this.getDing()
    setInterval(this.getDing,120000)
    
  },
  watch: {
    'dingData': function() {
      if (this.dingData.length > 0) {
        this.$refs.audio.src = 'http://deliverrobot.yslwebsite.com:8085/html/yinxiao.mp3'
        this.$refs.audio.addEventListener('canplay', () => {
          this.$refs.audio.play()
        })
      }
    },
  },
  methods: {
    getDing() {
      let data = {
        token: this.token,
        is_has: 1
      }
      lxw.shuaList(data).then(res => {
        if (res.code == 0) {
          this.dingData = res.data.data
        } else {
          this.$message.error(res.msg)
        }
      })

    },
    getChannel() {
      lxw.realChannel().then(res => {
        if (res.code == 0) {
          this.channelList = res.data
        }
      })
    },
    getUser() {
        zyz.dispatchUser(this.token).then(res => {
            if (res.code == 0) {
                this.userList = res.data.data
            }
        })
    },
    search() {
      this.isload = true
      this.form.token = this.token
      lxw.shuaList(this.form).then(res => {
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
      window.location.href = '/api/refresh/export?token=' + this.token + '&opt_at=' + this.form.opt_at + '&channel=' + this.form.channel + '&handler=' + this.form.handler + '&is_has=' + this.form.is_has
    },
    // 处理
    handle(rowData) {
      lxw.shuaHandle(rowData.id, this.token).then(res => {
        if (res.code == 0) {
          this.$message.success('处理成功')
          this.search()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    
  }
};
</script>

<style lang="scss">
.scalping {
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
