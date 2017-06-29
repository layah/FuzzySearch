;(function(window) {
	function SeachFuzzy(config) {
		this.data = config.data;
		this.el = getElementId.call(this, config.el);
		this.tabId = config.tabID;
		this.styleShift = config.style;
		this.toggle = config.toggle;
		init.call(this, this.el, this.toggle, this.data.state);
		seachFile.call(this);
	}
	
	// 监听input事件
	function seachFile(val) {
		var that = this;
		var oInput = that.el.getElementsByTagName("input")[0];
		var oUl = document.createElement("ul");
		var Oli = document.getElementsByClassName(that.data.el);
		oUl.id = "selectBox";
		if (that.toggle == true) {
			var selectObj = document.getElementsByClassName("selectText")[0];
			var val;
			selectObj.onchange = function() {
				var cont = oInput.value;
				val = selectObj.value;
				var listBox = selectText(cont, Oli, val);
				renderList(listBox, that.el, oUl, Oli, that.toggle);
				selectVal(that.el, that.tabId, that.styleShift);
			}
		}
		
		oInput.onkeyup = function() {
			var cont = oInput.value;
			if (!(cont === "" || undefined)) {
				var listBox;
				if (that.toggle == true) {
					var selectObj = document
							.getElementsByClassName("selectText")[0];
					var val = selectObj.value;
					listBox = selectText(cont, Oli, val);
				} else {
					listBox = searchResults(cont, Oli);
				}
				renderList(listBox, that.el, oUl, Oli, that.toggle);
				selectVal(that.el, that.tabId, that.styleShift);
			} else {
				oUl.style.display = "none";
			}
		}
	}
	
	// 初始化input组件
	function init(p, t, s) {
		var inputEl = document.createElement("input");
		inputEl.type = "text";
		inputEl.className = "input_seach";
		inputEl.placeholder = "输入查询公司名称";
		p.appendChild(inputEl);
		if (t === true) {
			var Oselect = document.createElement("select");
			Oselect.className = "selectText";
			for (var i = 0; i < s.length; i++) {
				var Opction = document.createElement("option");
				Opction.value = s[i].value;
				Opction.innerText = s[i].text;
				Oselect.appendChild(Opction);
			}
			p.appendChild(Oselect);
		}
	}
	
	// 获取input父元素id
	function getElementId(el) {
		var element;
		if (el.match("#").index === 0) {
			var e = el.replace('#', "");
			element = document.getElementById(e);
		}
		return element;
	}
	
	// 查询数据列表
	function searchResults(keyWord, list) {
		// if(!(list instanceof Array)){
		//     return ;
		// };
		var len = list.length;
		var arr = [];
		for (var i = 0; i < len; i++) {
			//如果字符串中不包含目标字符会返回-1
			if (list[i].textContent.indexOf(keyWord) >= 0) {
				//记录搜索到的值在表格中行号索引
				arr.push({index : i, value : list[i].textContent});
			}
		}
		return arr;
	}
	
	//记录select值变化
	function selectText(keyWord, list, val) {
		var state = [];
		var len = list.length;
		for (var i = 0; i < len; i++) {
			//如果字符串中不包含目标字符会返回-1
			if (list[i].textContent.indexOf(keyWord) >= 0) {
//				if (list[i].dataset.state == val) {
//					state.push({index : i, value : list[i].textContent});
//				}
				state.push({index : i, value : list[i].textContent});
			}
		}
		return state;
	}
	// 加载搜索结果清单
	function renderList(data, el, u, Oli, toggle) {
		if (!(data instanceof Array)) {
			return ;
		}
		el.appendChild(u);
		u.innerHTML = "";
		var len = data.length;
		var item = null;
		for (var i = 0; i < len; i++) {
			item = document.createElement('li');
			item.innerHTML = data[i].value;
			item.setAttribute("id", data[i].index);
			if (toggle == true) {
				item.dataset.state = Oli[i].dataset.state;
			}
			u.appendChild(item);
		}
		u.style.display = "block";
	}
	
	// 选中值添加到input
	function selectVal(e, tabId, styleShift) {
		var Oli = e.getElementsByTagName("li");
		var liVal = Oli.innerHTML;
		var Oinput = document.getElementsByClassName("input_seach")[0];
		var inputVal;
		var selectBox = document.getElementById('selectBox');
		for (var v = 0; v < Oli.length; v++) {
			Oli[v].onclick = (function(b) {
				return function() {
					var that = this;
					inputVal = Oli[b].innerHTML;
					Oinput.value = inputVal;
					showList(inputVal, tabId, styleShift, that);
					selectBox.style.display = "none";
					Oinput.value = null;
				}
			})(v);
		}
	}
	
	function showList(val, arg, styleShift, u) {
		var nav = document.getElementById(arg[0]);
		var navLi = nav.getElementsByTagName(arg[1]);
		var navTop = nav.offsetTop;
//		for (var i = 0; i < navLi.length; i++) {
//			if (navLi[i].textContent.match(val)) {
//				nav.scrollTop = navLi[i].offsetTop;
//				navLi[i].className = styleShift;
//				var silblings = Esiblings(navLi[i]);
//				for (var c = 0; c < silblings.length; c++) {
//					if (silblings[c].className == styleShift) {
//						silblings[c].className = "";
//					}
//				}
//			}
//		}
		var index = u.getAttribute("id");  //行号索引
		var target = navLi[index];
		nav.scrollTop = target.offsetTop;
		target.className = styleShift;
		var silblings = Esiblings(target);
		for (var c = 0; c < silblings.length; c++) {
			if (silblings[c].className == styleShift) {
				silblings[c].className = "";
			}
		}
	}
	
	function Esiblings(elem) {
		var len = 0;
		var children = elem.parentNode.childNodes;
		var siblings = [];
		for (var i = 0, len = children.length; i < len; i++) {
			if (children[i].nodeType == 1 && children[i] != elem) {
				siblings.push(children[i]);
			}
		}
		return siblings;
	}
	window.SeachFuzzy = SeachFuzzy;
})(window)