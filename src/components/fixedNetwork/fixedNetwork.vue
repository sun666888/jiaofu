<template>
  <div class="fixedNetwork">
    <div class="center father">
      <el-card>
          <el-form
            class="diaplayinformationcenter"
            ref="form"
            :model="form"
            label-width="100px"
            :inline="true"
          >
            <el-form-item label="账号" prop="account">
              <el-input v-model="form.account" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="发起人" prop="promoter">
              <el-input v-model="form.promoter" clearable placeholder="请输入"></el-input>
            </el-form-item>
            <el-form-item label="上班日期" prop="workday">
              <el-date-picker
              v-model="form.workday"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="渠道" prop="channel">
              <el-select v-model="form.channel" clearable placeholder="请选择">
                <el-option v-for="(item, index) in channelList" :key="index" :label="item.name" :value="item.name"></el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="激活时间" prop="activited_at">
              <el-date-picker
              v-model="form.activited_at"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item> -->
            <el-form-item label="处理人" prop="handler">
              <el-select v-model="form.handler" clearable placeholder="请选择">
                <el-option v-for="(item, index) in userList" :key="index" :label="item.account" :value="item.account"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="primary" style="margin-left: 20px;" size="medium" icon="el-icon-search" @click="search">查询</el-button>
            <el-button type="primary" style="margin-left: 20px;" size="medium" icon="el-icon-upload" @click="dialogVisible = true">批量导入</el-button>
            <el-button type="primary" style="margin-left: 20px;" size="medium" icon="el-icon-date" @click="result">导入结果</el-button>
          </el-form>
        </el-card>
        <el-card style="margin-top:20px">
          <el-table
            :data="tabData"
            border
            ref="tab"
            height="500"
            v-loading="isload"
            style="width: 100%; margin:20px auto;"
          >
            <el-table-column prop="account" label="账号"  align="center"></el-table-column>
            <el-table-column prop="require" label="支撑需求" align="center"></el-table-column>
            <el-table-column prop="workday" label="上班时间"  align="center"></el-table-column>
            <el-table-column prop="channel" label="渠道" align="center"></el-table-column>
            <el-table-column prop="promoter" label="发起人" align="center"></el-table-column>
            <el-table-column prop="address" label="地址" align="center"></el-table-column>
            <el-table-column prop="handler" label="处理人" align="center"></el-table-column>
            <el-table-column fixed="right" label="操作" align="center">
              <template slot-scope="scope" >
                <el-button type="primary" size="mini" icon="el-icon-edit"  @click="edit(scope.row)">编辑</el-button>
                <el-button type="danger" size="mini" icon="el-icon-delete"  @click="del(scope.row)">删除</el-button>
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

        <el-dialog title="编辑" :visible.sync="editShow" :before-close="editClose">
          <el-form ref="editForm" :model="editForm" :inline="true">
            <el-form-item label="上班日期" prop="workday">
              <el-date-picker
              v-model="editForm.workday"
              type="datetime"
              value-format="yyyy-MM-dd HH:mm:ss"
              placeholder="请选择时间"
              ></el-date-picker>
            </el-form-item>
            <el-form-item label="账号" prop="account">
              <el-input v-model="editForm.account" clearable placeholder="请输入" @input="change"></el-input>
            </el-form-item>
            <el-form-item label="订单渠道" prop="channel">
              <el-select v-model="editForm.channel" clearable placeholder="请选择" @change="change">
                <el-option v-for="(item, index) in channelList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="支撑需求" prop="require">
              <el-input v-model="editForm.require" clearable placeholder="请输入" @input="change"></el-input>
            </el-form-item>
            <el-form-item label="发起人" prop="promoter">
              <el-input v-model="editForm.promoter" clearable placeholder="请输入" @input="change"></el-input>
            </el-form-item>
            <el-form-item label="处理人" prop="handler">
              <el-select v-model="editForm.handler" clearable placeholder="请选择" @change="change">
                <el-option v-for="(item, index) in userList" :key="index" :label="item.account" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="地址" prop="address">
              <el-input style="width:300px" type="textarea" :rows="5" v-model="editForm.address" clearable placeholder="请输入" @input="change"></el-input>
            </el-form-item>
            
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="editClose">取 消</el-button>
            <el-button type="primary" :loading="isloadBtn" @click="editBtn">确 定</el-button>
          </div>
        </el-dialog>


        <el-dialog title="信息表导入" :visible.sync="dialogVisible" width="50%" :before-close="handleClose">
        <el-form
          class="diaplayinformationcenter"
          ref="uploadForm"
          :model="uploadForm"
          label-width="80px"
        >
          <el-form-item>
            <el-upload
              class="upload-demo"
              drag
              action="https://jsonplaceholder.typicode.com/posts/"
              :before-upload="uploadFile"
              multiple
            >
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
                <br />只支持扩展名：.xlsx
              </div>
            </el-upload>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="handleClose">取 消</el-button>
          <el-button v-loading="isBtnLoad" type="primary" @click="uploadBtn">确 定</el-button>
        </span>
      </el-dialog>

      <el-dialog title="导入结果"  :visible.sync="resultShow" width="80%" :before-close="resultClose">
        <el-table
            :data="resultData"
            border
            ref="tab"
            height="500"
            v-loading="isloadResult"
            style="width: 100%; margin:20px auto;"
          >
            <el-table-column prop="name" label="文件名称"  align="center" width="300"></el-table-column>
            <el-table-column prop="batch" label="导入批次" align="center"></el-table-column>
            <el-table-column prop="number" label="导入数量"  align="center" ></el-table-column>
            <el-table-column prop="created_at" label="导入时间" align="center"></el-table-column>
            <el-table-column prop="result" label="导入结果" align="center"></el-table-column>
            <el-table-column prop="account" label="操作工号" align="center"></el-table-column>
            <el-table-column prop="remark" label="备注" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope" >
                <el-button type="danger" size="mini" icon="el-icon-delete"  @click="resultdDel(scope.row)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>

          <el-pagination
            @size-change="resultSizeChange"
            @current-change="resultCurrentChange"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="resultForm.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="resultForm.total">
          </el-pagination>
        <span slot="footer" class="dialog-footer">
          <el-button @click="resultClose">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import zyz from "./../services/zyz";
import lxw from "./../services/lxw";
import whr from "./../services/whr";
export default {
  name: "fixedNetwork",
  inject:['reload'], 
  data() {
    return {
      token: '',
      channelList: [],
      userList: [],
      date: [],
      form: {
        account: '',
        promoter: '',
        workday: '',
        channel: '',
        handler: '',
        pageIndex: 1,
        pageSize: 10,
      },
      total: 0,
      tabData: [],
      isload:false,
      dialogVisible: false,
      uploadForm: {
        file: "",
      },
      isBtnLoad: false,
      resultShow: false,
      resultForm: {
        type: 2,
        pageIndex: 1,
        pageSize: 10,
        total: 0
      },
      isloadResult: false,
      resultData: [],
      editShow: false,
      editForm: {},
      isloadBtn: false,
    };
  },
  mounted() {
    this.token = sessionStorage.getItem("token");
    this.search()
    this.getUser()
    this.getChannel()
  },
  watch: {
    
  },
  methods: {
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
      whr.guList(this.form).then(res => {
        if (res.code == 0) {
          this.isload = false
          this.tabData = res.data.data
          this.total = res.data.count
        } else {
          this.isload = false
          this.$message.error(res.msg)
        }
      })
    },
    // 防止表单点击修改无反应
    change(){
      this.$forceUpdate()
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
    editClose() {
      this.$refs.editForm.resetFields()
      this.editForm = {}
      this.editShow = false
    },
    edit(rowData) {
      this.editShow = true
      this.editForm.id = rowData.id
      this.editForm.workday = rowData.workday
      this.editForm.account = rowData.account
      this.editForm.require = rowData.require
      this.editForm.channel = rowData.channel
      this.editForm.promoter = rowData.promoter
      this.editForm.handler = rowData.handler
      this.editForm.address = rowData.address
    },
    editBtn() {
      this.isloadBtn = true
      this.editForm.token = this.token
      whr.guEdit(this.editForm).then(res => {
        if (res.code == 0) {
          this.isloadBtn = false
          this.$message.success('编辑成功')
          this.$refs.editForm.resetFields()
          this.editForm = {}
          this.editShow = false
          this.search()
        } else {
          this.isloadBtn = false
          this.$message.error(res.msg)
        }
      })
    },
    del(rowData){
      whr.guDel(rowData.id,this.token).then(res => {
        if (res.code == 0) {
          this.$message.success('删除成功')
          this.search()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    handleClose() {
      this.uploadForm = {};
      this.dialogVisible = false;
    },
    // 上传
    uploadFile(file) {
      let fd = new FormData();
      fd.append("file", file);
      lxw.upload(fd).then((res) => {
        if (res.code == 0) {
          this.$message.success("上传成功~");
          this.uploadForm.file = res.data.path;
        } else {
          this.$message.error("上传失败");
        }
      });
    },
    // 提交
    uploadBtn() {
      this.isBtnLoad = true;
      this.uploadForm.token = this.token;
      if (this.uploadForm.file == "") {
        this.$message.error("请先上传文件");
        this.isBtnLoad = false;
      } else {
        whr.importData(this.uploadForm).then((res) => {
          if (res.code == 0) {
            this.isBtnLoad = false;
            this.$message.success("导入成功");
            this.dialogVisible = false;
            this.uploadForm = {};
            this.search();
          } else {
            this.isBtnLoad = false;
            this.$message.error(res.msg);
          }
        });
      }
    },
    result() {
      this.resultShow = true
      this.getResult()
    },
    resultClose() {
      this.resultShow = false
      this.resultData = []
    },
    getResult() {
      this.isloadResult = true
      this.resultForm.token = this.token
      lxw.resultData(this.resultForm).then(res => {
        if (res.code == 0) {
          this.isloadResult = false
          this.resultData = res.data.data
          this.resultForm.total = res.data.count
        } else {
          this.isloadResult = false
          this.$message.error(res.msg)
        }
      })
    },
    resultdDel(rowData) {
      lxw.resultDel(rowData.id,this.token, 2).then(res => {
        if (res.code == 0) {
          this.$message.success('删除成功')
          this.getResult()
        } else {
          this.$message.error(res.msg)
        }
      })
    },
    // pageSize
    resultSizeChange(val) {
      this.form.pageSize = val;
      this.search();
    },
    // pageIndex
    resultCurrentChange(val) {
      this.form.pageIndex = val;
      this.search();
    },
  }
};
</script>

<style lang="scss">
.fixedNetwork {
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
  
}
.el-pagination{
    margin: 20px auto;
		text-align: center;
	}
</style>
