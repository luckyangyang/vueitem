<template>
  <el-card class="box-card">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <el-row>
      <el-col :span="24">
        <div style="margin-top: 15px;">
          <el-input placeholder="请输入内容" class="cearch" clearable v-model="srcValue">
            <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
          </el-input>
          <el-button type="primary" plain class="fl" @click="addDialogFormVisible = true">添加</el-button>
          <!-- 添加弹出框 -->
          <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
            <el-form :model="addformData"
            label-width ='80px'
            :rules="rules"
            ref="form">
              <el-form-item label="用户" prop="username">
                <el-input v-model="addformData.username" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" prop="password">
                <el-input v-model="addformData.password" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="addformData.email" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="addformData.mobile" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="addDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="addData">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 添加弹出框 结束-->
          <!-- 修改弹出框 -->
          <el-dialog title="修改用户" :visible.sync="editDialogFormVisible">
            <el-form :model="addformData"
            label-width ='80px'
            :rules="rules"
            ref="form">
              <el-form-item label="用户">
                <el-input v-model="addformData.username" auto-complete="off" disabled></el-input>
              </el-form-item>
              <el-form-item label="邮箱">
                <el-input v-model="addformData.email" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话">
                <el-input v-model="addformData.mobile" auto-complete="off"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="editDialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="editData">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 修改弹出框 结束-->
          <!-- 分配权限 -->
          <el-dialog title="分配权限" :visible.sync="allotDialogFormVisible">
            <el-form :model="addformData"
            label-width ='100px'>
              <el-form-item label="用户">
                {{ addformData.username }}
              </el-form-item>
              <el-form-item label="请选择角色">
                <el-select v-model="current">
                  <el-option
                  label="请选择"
                  :value="-1" disabled>
                  </el-option>
                  <el-option
                    v-for="item in option"
                    :key="item.id"
                    :label="item.roleName"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="closehandle">取 消</el-button>
              <el-button type="primary" @click="handleAllot">确 定</el-button>
            </div>
          </el-dialog>
          <!-- 分配权限 结束-->
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table
    v-loading="loading"
    :data="tableData"
    border
    stripe
    style="width: 100%; margin-top:15px">
      <el-table-column
      type="index"
      width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="email"
        label="邮箱"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobile"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="create_time"
        label="时间">
        <template slot-scope="scope">
         {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="用户状态">
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            inactive-color="#ff4949"
            v-model="scope.row.mg_state">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        prop="is_delete"
        label="操作">
        <!-- 操作 -->
         <template slot-scope="scope">
           <el-button type="primary" icon="el-icon-edit" size="mini" plain @click="editHandle(scope.row)"></el-button>
           <el-button @click="handleDelete(scope.row.id)" type="danger" icon="el-icon-delete" size="mini" plain>
             </el-button>
           <el-button type="success" icon="el-icon-check" size="mini" plain @click="handlejurisdiction(scope.row)"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 3, 4, 5]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data() {
    return {
      current: -1,
      tableData: [],
      loading: true,
      pagenum: 1,
      pagesize: 2,
      total: 100,
      srcValue: '',
      option: [],
      allotid: '',
      // ................添加表格数据
      addDialogFormVisible: false,
      editDialogFormVisible: false,
      allotDialogFormVisible: false,
      addformData: {
        username: '',
        password: '',
        email: '',
        mobile: '',
        id: ''
      },
      formLabelWidth: '120px',
      rules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ]
      }
    };
  },

  // 2在vue创建完成是调用方法加载数据
  created() {
    this.loadData();
  },
  // 1定义一个请求数据方法  需要的参数,  因为需要token值 所以需要设置请求头  详情看githup   axios官方文档
  // axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
  methods: {
    // 处理取消时
    closehandle() {
      this.allotDialogFormVisible = false;
      this.current = -1;
    },
    // 处理分配角色
    async handleAllot() {
      // 需要获取用户id  角色id
      const userid = this.allotid;
      const allot = this.current;
      console.log(userid);
      console.log(allot);
      const response = await this.$http.put(`users/${userid}/role`, {rid: allot});
      console.log(response);
      const {meta: {msg, status}} = response.data;
      if (status === 200) {
        this.$message.success(msg);
        this.allotDialogFormVisible = false;
      } else {
        this.$message.success(msg);
      }
      this.current = -1;
    },
    // 处理权限
    async handlejurisdiction(users) {
      const response = await this.$http.get('roles');
      const res = await this.$http.get(`users/${users.id}`);
      console.log(res);
      this.current = res.data.data.rid;
      // console.log(this.current);
      // 拿到返回的数组给数据中的数组
      this.option = response.data.data;
      this.allotid = users.id;
      // console.log(this.option);
      this.addformData.username = users.username;
      this.allotDialogFormVisible = true;
    },
    async editData() {
      const id = this.addformData.id;
      const email = this.addformData.email;
      const mobile = this.addformData.mobile;
      console.log(id);
      const response = await this.$http.put(`users/${id}`, {
        email: email,
        mobile: mobile
      });
      console.log(response);
      const {meta: {msg, status}} = response.data;
      if (status === 200) {
        this.$message.success(msg);
        this.loadData();
        this.editDialogFormVisible = false;
      } else {
        this.$message.error(msg);
      }
    },
    editHandle(user) {
      this.addformData.id = user.id;
      this.addformData.username = user.username;
      this.addformData.email = user.email;
      this.addformData.mobile = user.mobile;
      this.editDialogFormVisible = true;
    },
    loadData() {
      // 获取token
      // 将token设置给求头
      const token = sessionStorage.getItem('token');
      this.$http.defaults.headers.common['Authorization'] = token;
      this.$http.get('users', {
        params: {
          pagenum: this.pagenum,
          pagesize: this.pagesize,
          query: this.srcValue
        }
      })
        .then(Response => {
          // console.log(Response);
          // 1-1把返回的值给绑定的tableData值
          this.tableData = Response.data.data.users;
          this.total = Response.data.data.total;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.loadData();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.loadData();
    },
    searchData() {
      this.loadData();
    },
    // ...............................................................删除用户
    handleDelete(id) {
      // console.log(id);
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const response = await this.$http.delete(`users/${id}`);
        const {meta: {msg, status}} = response.data;
        if (status === 200) {
          if (this.pagenum > 1 && this.tableData.length === 1) {
            this.pagenum--;
          }
          this.$message.success(msg);
          this.loadData();
        } else {
          this.$message.error(msg);
        }
        // this.$message({
        //   type: 'success',
        //   message: '删除成功!'
        // });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    // ...............................................................添加用户
    addData() {
      this.$refs.form.validate(async(valid) => {
        if (!valid) {
          this.$message.error('表单验证失败,请正确填写表单');
          return;
        }
        const response = await this.$http.post('users', this.addformData);
        // console.log(response);
        const {meta: {msg, status}} = response.data;
        if (status === 201) {
          // 提示
          this.$message.success(msg);
          // 刷新数据
          this.loadData();
          // 关闭窗口
          this.addDialogFormVisible = false;
          // 清空input数据
          this.addformData = {};
        } else {
          // 提示
          this.$message.error(msg);
          this.addDialogFormVisible = false;
        }
      });
    }
  }
};
</script>

<style scoped>
.box-card{
  height: 100%;
}
.cearch{
  width: 300px;
}
</style>
