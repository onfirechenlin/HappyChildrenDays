function SelfAdaption() {
	var htmlwidth = $("html").width();
	if(htmlwidth >= 640) {
		$("html").css({
			"font-size" : "40px"
		})
		$(".wrap, .footer, .head").css({
			"width": "640px"
		})
	} else {
		if(htmlwidth <= 320) {
			$("html").css({
				"font-size" : "20px"
			})
			$(".wrap, .footer, .head").css({
				"width": "320px"
			})
		} else {
			$("html").css({
				"font-size" : htmlwidth * 40 / 640 + "px"
			})
			$(".wrap, .footer, .head").css({
				"width": htmlwidth
			})
		}
	} 	
}SelfAdaption();

var backBtn = $(".head-back-btn");

backBtn.on('tap', function() {
	event.preventDefault();
	window.history.back(-1);
});

$(window).resize(function(){
	SelfAdaption()
})

/**
 * [改变footer里的icon小图标样式的方法]
 * @param  {[对象object]} objlist [footer里的icon小图标的数组对象]
 * @param  {[对象object]} obj     [footer里的单个icon小图标]
 * 例子：var getFooterA = $("#footericon a"); getFooterA就是objlist，getFooterA下的某个单独的a标签就是obj
 * @param  {[类名]} classname     [需要给单独的icon添加的类名]
 * @param  {[布尔值boolean]} bool     [如果为true,则该方法里面的backgroud-image加前缀"../"，如果为false，则不加前缀]
 * @return {[type]}         [description]
 */
function changeFootericon(objlist, obj, classname, bool) {
	var prefix;
	if(bool) {
		prefix = "../";		
	} else {
		prefix = "";
	}
	// 先将所有的图标重置为灰色状态
	objlist.eq(0).css({
		"background": "url(" + prefix + "images/nav_index.png) no-repeat",
		"background-size": "100% 100%"
	})
	objlist.eq(1).css({
		"background": "url(" + prefix + "images/nav_mall.png) no-repeat",
		"background-size": "100% 100%"
	})
	objlist.eq(2).css({
		"background": "url(" + prefix + "images/nav_shopcar.png) no-repeat",
		"background-size": "100% 100%"
	})
	objlist.eq(3).css({
		"background": "url(" + prefix + "images/nav_center.png) no-repeat",
		"background-size": "100% 100%"
	})

	// 获取被点击图标的index索引值，用来控制该图标显示为彩色
	var index = obj.index();
	switch(index) {
		case 0: obj.css({
			"background": "url(" + prefix + "images/nav_index_select.png) no-repeat",
			"background-size": "100% 100%"
		}); break;
		case 1: obj.css({
			"background": "url(" + prefix + "images/nav_mall_select.png) no-repeat",
			"background-size": "100% 100%"
		}); break;
		case 2: obj.css({
			"background": "url(" + prefix + "images/nav_shopcar_select.png) no-repeat",
			"background-size": "100% 100%"
		}); break;
		case 3: obj.css({
			"background": "url(" + prefix + "images/nav_center_select.png) no-repeat",
			"background-size": "100% 100%"
		}); break;
	}
	// 给被点击的图标添加nav-select类，用来控制文字样式
	obj.addClass(classname).siblings().removeClass(classname);
}

// “我的收藏-编辑”
/**
 * [“我的收藏-编辑”页面中，点击某个商品，删除按钮变为可用且透明度为1，该商品变为选中状态且透明度变为0.5；当没有一个商品被选中时，删除按钮变为不可用且透明度为0.5，所有商品变为没被选中且透明度都为1]
 * @param  {[object]} goodlistobj [某个商品对象]
 * @param  {[object]} btnobj      [删除按钮对象]
 * @return {[type]}             [description]
 */
var goodlistDlIndex = 0;
function mycollectDlTapEvent(goodlistobj, btnobj) {
	// 先获取当前被点击商品的opacity，如果是1，则变为0.5和选中状态；如果不为1，则变为1和未被选中状态
	var getOpacity = goodlistobj.css("opacity");
	if(getOpacity == 1) {
		goodlistobj.css({
			"opacity": "0.5"
		})
		goodlistobj.children("dt").append("<span>√</span>")
		goodlistDlIndex++;
	} else {
		goodlistobj.css({
			"opacity": "1"
		})
		goodlistobj.children("dt").children("span").remove();
		goodlistDlIndex--;
	}

	// 没选中一个商品，goodlistDlIndex加1，如果goodlistDlIndex为0，则删除按钮不可用且透明度为0.5；如果goodlistDlIndex不为0，则删除按钮可用且透明度为1.
	if(goodlistDlIndex == 0) {
		btnobj.css({
			"opacity": "0.5"
		})
		btnobj.attr("disabled", "disabled");
	} else {
		btnobj.css({
			"opacity": "1"
		})
		btnobj.attr("disabled", null);
	}
}

function CheckBox(object, allSelectBox) {
	var _this = this;
	this.obj = object;
	this.allBox = allSelectBox;
	this.checkbox = this.obj.children('input');
	this.span = this.obj.children('span');
	this.isSlect = false;
	this.obj.on('tap', function() {
		_this.change()
	});
}

CheckBox.prototype.change = function () {
	if(this.isSlect) {
		this.span.removeClass('span-select');
		this.checkbox.attr('checked', 'false');
		if(this.allBox) {
			this.allBox.children('span').removeClass('span-select');
		}
		this.isSlect = false;
	} else {
		this.span.addClass('span-select');
		this.checkbox.attr('checked', 'true');
		this.isSlect = true;
	}
}

// 继承单个属性CheckBox
// checkboxArr: 页面main里面所有的.com-checkbox数组
function CheckBoxAll(object, checkboxArr) {
	CheckBox.call(this, object);
	this.allCheckBox = checkboxArr;
	this.len = checkboxArr.length;
}

// 重写方法
CheckBoxAll.prototype.change = function() {
	if(this.isSlect) {
		for(var i = 0; i < this.len; i++) {
			this.allCheckBox.eq(i).children("span").removeClass('span-select');
			this.allCheckBox.eq(i).children("input").attr('checked', 'false');
			this.isSlect = false;
		}
	} else {
		for(var i = 0; i < this.len; i++) {
			this.allCheckBox.eq(i).children("span").addClass('span-select');
			this.allCheckBox.eq(i).children("input").attr('checked', 'true');
			this.isSlect = true;
		}
	}
}


function ShopCarEdit(object) {
	var _this = this;
	this.title = object.children('h4');
	this.msg = object.find('.send-msg');
	this.count = object.find('.shopcar-count');
	this.sale = object.find('.send-count');
	this.comple = object.find('.shopcar-comple');
	this.edit = false;
	this.addEvent();
	this.buyCount();
}

ShopCarEdit.prototype.addEvent = function () {
	var _this = this;
	this.title.on('tap', function() {
		_this.change();
	});
	this.comple.on('tap', function() {
		_this.showEdit()
		_this.showCount();
	});
}

ShopCarEdit.prototype.change = function() {
	this.lastSize = this.msg.find('span').eq(1);
	if(this.edit) {
		this.showEdit();
	} else {
		this.hideEdit();
	}
}

ShopCarEdit.prototype.showEdit = function () {
	this.msg.show();
	this.count.hide();
	this.sale.show();
	this.comple.hide()
	this.edit = false;
	this.title.text("编辑");
}

ShopCarEdit.prototype.hideEdit = function () {
	this.msg.hide();
	this.count.show();
	this.sale.hide();
	this.comple.show()
	this.edit = true;
	this.title.text("完成");
}

// 创建购买数量操作对象
ShopCarEdit.prototype.buyCount = function () {
	this.liArr = this.count.find("li");
	this.addBtn = this.liArr.eq(0);
	this.showBox = this.liArr.eq(1);
	this.redBtn = this.liArr.eq(2);
	this.num = parseInt(this.showBox.text());
	this.changeCount();
	this.showSize();
}

// 绑定增加和减少购买数量事件
ShopCarEdit.prototype.changeCount = function () {
	var _this = this;
	this.addBtn.on('tap', function() {
		_this.num--;
		if(_this.num < 1) {
			_this.num = 1
		}
		_this.showBox.text(_this.num);	
	});
	this.redBtn.on('tap', function() {
		_this.num++;
		_this.showBox.text(_this.num);
	});
}

// 将购买数量显示在订单中
ShopCarEdit.prototype.showCount = function () {
	this.countBox = this.sale.children("span").eq(2);
	this.countBox.text(this.num);
}

// 显示尺码表
ShopCarEdit.prototype.showSize = function () {
	var _this = this;
	this.sizeBtn = this.count.find(".shopcar-choose").children('a');
	this.sizeShow = false;
	this.sizeBox = $(".sizebox");
	// 点击显示尺码表
	this.sizeBtn.on('tap', function() {
		_this.sizeBox.show();
		_this.sizeShow = true;
		_this.selectSize();
	})
}

// 选择尺码
 ShopCarEdit.prototype.selectSize = function () {
 	this.sizeList = this.sizeBox.children('span');
 	this.cofrmSize = this.sizeBox.find("em");
 	this.cancelSize = this.sizeBox.find("strong");
 	this.orderSize = this.count.find(".shopcar-choose").find('span').eq(1);
	this.comfirmSize();
 }

// 选择、确认或取消执行事件
ShopCarEdit.prototype.comfirmSize = function () {
 	var _this = this;
 	this.sizeList.on('tap', function() {
 		$(this).addClass('size-select');
 		$(this).siblings().removeClass('size-select')
 		_this.sizeNum = $(this).text();
 	});
	this.cofrmSize.on('tap', function() {
		_this.insetSize();
		_this.orderSize.text("尺码：" + _this.sizeNum);
		_this.lastSize.text("尺码：" + _this.sizeNum)
	})
	this.cancelSize.on('tap', function() {
		_this.insetSize();
	});
}

// 将选择尺码插入到订单
ShopCarEdit.prototype.insetSize = function () {
	if(this.sizeShow) {
		this.sizeBox.hide();
		this.sizeShow = false;
		this.sizeList.removeClass('size-select') 
	}
}


/**
 * [编辑所有功能]
 * @param {[type]} object [执行编辑对象]
 * @param {[type]} objArr [保存需要编辑的对象]
 */
function EditAll(object, objArr) {
	var _this = this;
	this.obj = object;
	this.arr = objArr;
	this.len = objArr.length;
	this.isEdit = false;
	this.obj.on('tap', function() {
		_this.change();
	});
}

EditAll.prototype.change = function () {
	if(this.isEdit) {
		this.obj.text("编辑全部")
		for(var k = 0; k < arr.length; k++) {
			this.arr[k].showEdit();
		}	
		this.isEdit = false;
	} else {
		this.obj.text("完成")
		for(var k = 0; k < arr.length; k++) {
			this.arr[k].hideEdit();
		}	
		this.isEdit = true;
	}
}

/**
 * [操作一个对象下的某一元素添加样式，其兄弟元素移除改样式]
 * @param  {[type]} obj       [需要改变的对象]
 * @param  {[type]} className [添加的样式]
 * @param  {[type]} ele       [元素类型]
 */
function changeStyle(obj, className, ele) {
	obj.siblings(ele).removeClass(className)
	obj.addClass(className)
}
