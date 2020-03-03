webpackJsonp([1],{

/***/ 228:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_List_vue__ = __webpack_require__(235);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_69156dbf_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_List_vue__ = __webpack_require__(239);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(237)
}
var normalizeComponent = __webpack_require__(4)
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_List_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_69156dbf_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_List_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\views\\product\\List.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-69156dbf", Component.options)
  } else {
    hotAPI.reload("data-v-69156dbf", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var types = exports.types = [{ label: '美食', value: '1' }, { label: '电影', value: '2' }, { label: '酒店', value: '3' }, { label: '休闲', value: '4' }, { label: '外卖', value: '5' }, { label: 'KTV', value: '6' }, { label: '丽人', value: '7' }, { label: '周边游', value: '8' }, { label: '小吃', value: '9' }, { label: '火车票', value: '10' }];

/***/ }),

/***/ 235:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__t_allTypes__ = __webpack_require__(231);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__t_allTypes___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__t_allTypes__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 引入分类数据

/* harmony default export */ __webpack_exports__["a"] = ({
    // 接收router中数据
    props: ['page'],
    // 数据
    data() {
        return {
            data: []
        };
    },
    //设置过滤器
    filters: {
        type(id) {
            let type = __WEBPACK_IMPORTED_MODULE_0__t_allTypes__["types"].find(item => item.value == id); //在types中获取分类对象
            return type ? type.label : '其它'; //返回类型名称
        }
    },
    methods: {
        removeItem(id) {
            // console.log(this)
            this.$confirm('是否要删除商品？')
            // 想服务器发送请求删除商品列表
            .then(() => {
                this.$http.post('/admin/product/remove', { id }).then(({ data }) => {
                    // console.log(data)
                    if (data.error === 0) {
                        //成功刷新页面
                        return location.reload();
                    }
                    this.$message.error(data.message);
                });
            }).catch(() => {});
        },
        // 获取list.json中数据
        getData() {
            // 解构路由数据
            let { params } = this.$route;
            this.$http.get('/admin/product/list', { params }).then(({ data }) => {
                // console.log(data)
                // 如果成功
                if (data.error === 0) {
                    this.data = data.data; //存储数据
                } else {
                    // 提示错误
                    this.$message.error(data.msg);
                    // 没有数据，清空视图
                    this.data = [];
                }
            });
        }
    },
    //组件创建完成后
    created() {
        // 获取数据
        this.getData();
    },
    //监听路由数据
    watch: {
        $route() {
            this.getData();
        }
    }
});

/***/ }),

/***/ 237:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(238);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(226).default
var update = add("6df060aa", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-69156dbf\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./List.vue", function() {
     var newContent = require("!!../../../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-69156dbf\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./List.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 238:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(225)(undefined);
// imports


// module
exports.push([module.i, "\n.page-product-list .btns {\n  padding: 40px 0 60px;\n  text-align: center;\n}\n.page-product-list .list {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n}\n.page-product-list .el-card {\n  width: 260px;\n  margin-bottom: 30px;\n  padding: 0 10px;\n}\n.page-product-list .el-card img {\n    width: 220px;\n    height: 130px;\n}\n.page-product-list .el-card h2 {\n    font-weight: normal;\n    font-size: 20px;\n    text-align: center;\n    overflow: hidden;\n    white-space: nowrap;\n    text-overflow: ellipsis;\n}\n.page-product-list .el-card .status {\n    display: flex;\n}\n.page-product-list .el-card .status .price {\n      flex: 1;\n      color: #d64825;\n}\n", ""]);

// exports


/***/ }),

/***/ 239:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "page-product-list" }, [
    _c("h1", { staticClass: "page-title" }, [_vm._v("商品列表")]),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "list" },
      _vm._l(_vm.data, function(item) {
        return _c("el-card", { key: item._id }, [
          _c("img", { attrs: { src: item.img, alt: "" } }),
          _vm._v(" "),
          _c("h2", [_vm._v(_vm._s(item.title))]),
          _vm._v(" "),
          _c("p", { staticClass: "status" }, [
            _c("span", { staticClass: "price" }, [
              _vm._v("￥" + _vm._s(item.price))
            ]),
            _vm._v(" "),
            _c("span", { staticClass: "type" }, [
              _vm._v(_vm._s(_vm._f("type")(item.type)))
            ])
          ]),
          _vm._v(" "),
          _c("p", { staticClass: "sales" }, [
            _vm._v("已销售" + _vm._s(item.sales) + "份")
          ]),
          _vm._v(" "),
          _c(
            "div",
            { staticClass: "card-btns" },
            [
              _c(
                "router-link",
                {
                  staticClass: "el-button--success el-button--mini",
                  attrs: { to: "/product/edit/" + item._id, tag: "el-button" }
                },
                [_vm._v("修改")]
              ),
              _vm._v(" "),
              _c(
                "el-button",
                {
                  attrs: { type: "danger", size: "mini" },
                  on: {
                    click: function($event) {
                      return _vm.removeItem(item._id)
                    }
                  }
                },
                [_vm._v("删除")]
              )
            ],
            1
          )
        ])
      }),
      1
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticClass: "btns" },
      [
        _c(
          "router-link",
          {
            staticClass: "is-round",
            attrs: {
              to: "/product/list/" + (_vm.page <= 1 ? 1 : _vm.page - 1),
              tag: "el-button"
            }
          },
          [_vm._v("← 上一页")]
        ),
        _vm._v(" "),
        _c(
          "router-link",
          {
            staticClass: "is-round",
            attrs: { to: "/product/list/" + (_vm.page + 1), tag: "el-button" }
          },
          [_vm._v("下一页 →")]
        )
      ],
      1
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-69156dbf", esExports)
  }
}

/***/ })

});