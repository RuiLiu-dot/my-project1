webpackJsonp([2],{

/***/ 227:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Create_vue__ = __webpack_require__(230);
/* empty harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_177e7e46_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Create_vue__ = __webpack_require__(234);
var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(232)
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
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_bustCache_Create_vue__["a" /* default */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_177e7e46_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_bustCache_Create_vue__["a" /* default */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src\\views\\product\\Create.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-loader/node_modules/vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-177e7e46", Component.options)
  } else {
    hotAPI.reload("data-v-177e7e46", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 230:
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


/* harmony default export */ __webpack_exports__["a"] = ({
    data() {
        let rules = {};
        // 设置规则,让所有的校验规则都是相同的 ,将所有的prop放在数组里，并遍历每一个要校验的prop
        ['img', 'title', 'description', 'sales', 'price', 'originPrice', 'type', 'evaluate', 'storeName', 'storeAddress', 'storeNum', 'content'].forEach(key => {
            rules[key] = [{ trigger: 'blur', required: true, message: '请输入内容' }];
        });
        return {
            types: __WEBPACK_IMPORTED_MODULE_0__t_allTypes__["types"], // 分类数据
            data: {},
            rules, //规则校验
            title: '创建商品',
            submitUrl: '/admin/product/create'
        };
    },
    computed: {
        dealData() {
            ['sales', 'price', 'originPrice', 'evaluate', 'storeNum'].forEach(key => {
                this.data[key] = +this.data[key]; //更改原来数据中的属性值为数字类型
            });
            return this.data;
        }
    },
    methods: {

        uploadSuccess({ error, data, msg }) {
            // console.log('success', e)  //先验证是否方法成功
            if (error === 0) {
                this.$set(this.data, 'img', data);
                // console.log(this.data) //防止数据丢失
            } else {

                this.$message.error(msg);
            }
        },
        uploadError(e) {
            // console.log('fail', e)
            this.$message.error('上传失败');
        },
        submitData() {
            this.$refs.product.validate(valid => {
                if (valid) {
                    //提交数据时 发送请求，提交数据 ，需要在服务器端定义请求接口
                    this.$http.post(this.submitUrl, this.dealData).then(({ data }) => {
                        if (data.error === 0) {
                            //如果提交成功，进入列表页(切换方法)
                            this.$router.replace('/product/list/1');
                        } else {
                            this.$message.error(data.msg);
                        }
                    });
                }
            });
        }
    }
});

/***/ }),

/***/ 231:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var types = exports.types = [{ label: '美食', value: '1' }, { label: '电影', value: '2' }, { label: '酒店', value: '3' }, { label: '休闲', value: '4' }, { label: '外卖', value: '5' }, { label: 'KTV', value: '6' }, { label: '丽人', value: '7' }, { label: '周边游', value: '8' }, { label: '小吃', value: '9' }, { label: '火车票', value: '10' }];

/***/ }),

/***/ 232:
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(233);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(226).default
var update = add("f5395742", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-177e7e46\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Create.vue", function() {
     var newContent = require("!!../../../../../../../../../../../node_modules/css-loader/index.js!../../../../../../../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-177e7e46\",\"scoped\":false,\"hasInlineConfig\":false}!../../../../../../../../../../../node_modules/sass-loader/lib/loader.js!../../../../../../../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0&bustCache!./Create.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ 233:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(225)(undefined);
// imports


// module
exports.push([module.i, "\n.ickt-upload-tip {\n  margin-left: 10px;\n  color: #dad2d2;\n}\n.ickt-upload-img {\n  margin-top: 20px;\n  max-height: 200px;\n}\n", ""]);

// exports


/***/ }),

/***/ 234:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "page-product-create" },
    [
      _c("h1", { staticClass: "page-title" }, [_vm._v(_vm._s(_vm.title))]),
      _vm._v(" "),
      _c(
        "el-form",
        {
          ref: "product",
          attrs: { "label-width": "200px", model: _vm.data, rules: _vm.rules }
        },
        [
          _c(
            "el-form-item",
            { attrs: { label: "商品名称", prop: "title" } },
            [
              _c("el-input", {
                attrs: { placeholder: "请输入商品名称" },
                model: {
                  value: _vm.data.title,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "title", $$v)
                  },
                  expression: "data.title"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "商品描述", prop: "description" } },
            [
              _c("el-input", {
                attrs: { placeholder: "请输入商品描述", type: "textarea" },
                model: {
                  value: _vm.data.description,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "description", $$v)
                  },
                  expression: "data.description"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "商品价格", prop: "price" } },
            [
              _c("el-input", {
                attrs: { placeholder: "请输入商品价格", type: "number" },
                model: {
                  value: _vm.data.price,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "price", $$v)
                  },
                  expression: "data.price"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "商品原价", prop: "originPrice" } },
            [
              _c("el-input", {
                attrs: { placeholder: "请输入商品原价", type: "number" },
                model: {
                  value: _vm.data.originPrice,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "originPrice", $$v)
                  },
                  expression: "data.originPrice"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "商品评分", prop: "evaluate" } },
            [
              _c("el-rate", {
                attrs: { "allow-half": "", "show-score": "" },
                model: {
                  value: _vm.data.evaluate,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "evaluate", $$v)
                  },
                  expression: "data.evaluate"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "商品分类", prop: "type" } },
            [
              _c(
                "el-select",
                {
                  attrs: { placeholder: "请选择商品分类" },
                  model: {
                    value: _vm.data.type,
                    callback: function($$v) {
                      _vm.$set(_vm.data, "type", $$v)
                    },
                    expression: "data.type"
                  }
                },
                _vm._l(_vm.types, function(item) {
                  return _c("el-option", {
                    key: item.value,
                    attrs: { label: item.label, value: item.value }
                  })
                }),
                1
              )
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "商品销量", prop: "sales" } },
            [
              _c("el-input", {
                attrs: { placeholder: "请输入商品销量", type: "number" },
                model: {
                  value: _vm.data.sales,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "sales", $$v)
                  },
                  expression: "data.sales"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "商品店名", prop: "storeName" } },
            [
              _c("el-input", {
                attrs: { placeholder: "请输入商品店名" },
                model: {
                  value: _vm.data.storeName,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "storeName", $$v)
                  },
                  expression: "data.storeName"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "商品地址", prop: "storeAddress" } },
            [
              _c("el-input", {
                attrs: { placeholder: "请输入商品地址" },
                model: {
                  value: _vm.data.storeAddress,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "storeAddress", $$v)
                  },
                  expression: "data.storeAddress"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "商品分店", prop: "storeNum" } },
            [
              _c("el-input", {
                attrs: { placeholder: "请输入商品分店", type: "number" },
                model: {
                  value: _vm.data.storeNum,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "storeNum", $$v)
                  },
                  expression: "data.storeNum"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "商品图片", prop: "img" } },
            [
              _c(
                "el-upload",
                {
                  attrs: {
                    action: "/admin/product/upload",
                    "on-success": _vm.uploadSuccess,
                    "on-error": _vm.uploadError,
                    "show-file-list": false
                  }
                },
                [
                  _c("el-button", { attrs: { type: "primary" } }, [
                    _vm._v("上传")
                  ]),
                  _vm._v(" "),
                  _c(
                    "span",
                    {
                      staticClass: "ickt-upload-tip",
                      attrs: { slot: "tip" },
                      slot: "tip"
                    },
                    [_vm._v("请选择商品的图片")]
                  )
                ],
                1
              ),
              _vm._v(" "),
              _vm.data.img
                ? _c("img", {
                    staticClass: "ickt-upload-img",
                    attrs: { src: _vm.data.img, alt: "" }
                  })
                : _vm._e()
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            { attrs: { label: "商品内容", prop: "content" } },
            [
              _c("quill-editor", {
                model: {
                  value: _vm.data.content,
                  callback: function($$v) {
                    _vm.$set(_vm.data, "content", $$v)
                  },
                  expression: "data.content"
                }
              })
            ],
            1
          ),
          _vm._v(" "),
          _c(
            "el-form-item",
            [
              _c(
                "el-button",
                { attrs: { type: "success" }, on: { click: _vm.submitData } },
                [_vm._v("提交")]
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
var esExports = { render: render, staticRenderFns: staticRenderFns }
/* harmony default export */ __webpack_exports__["a"] = (esExports);
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-loader/node_modules/vue-hot-reload-api")      .rerender("data-v-177e7e46", esExports)
  }
}

/***/ })

});