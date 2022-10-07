import { marked } from './node_modules/marked/lib/marked.esm.js'//导入markdwon
let mark = marked.parse("**阳阳小法师的笔记**")
console.log(mark)
//添加序号 模式属性
let button = document.querySelector("#button")
let menu = document.querySelector("#menu")
let notebook = document.querySelector("#notebook")
let adds = document.querySelectorAll(".add")
let spans = document.querySelector("span")
let nowcell = 0
let i = 0


//第一个cell的初始化
notebook.appendChild(initcell())
notebook.children[0].setAttribute("cell_number", 0)
notebook.children[0].children[0].innerHTML = mark

//左边导航栏隐藏与显示
button.onclick = (event) => {
    if (button.getAttribute("value") == "隐藏") {
        menu.style.left = "-100px"
        button.style.right = "-43px"
        button.style.left = null
        button.setAttribute("value", "显示")
    }
    else {
        button.style.left = "0"
        menu.style.left = "0px"
        button.style.right = null
        button.setAttribute("value", "隐藏")
    }
}

//上方添加

adds[0].onclick = function addcell() {
    //在未选中情况下，默认在“阳阳小法师”上新建
    notebook.insertBefore(initcell(), notebook.children[nowcell])//第一个参数创建节点，第二个参数创建节点位置
    nowcell++

    let contents = document.querySelectorAll(".cell")
    for (let i = 0; i < contents.length; i++) {
        contents[i].setAttribute("cell_number", i)
    }
}

//下方添加
adds[1].onclick = function insertAfter() {
    //在未选中情况下，默认在“阳阳小法师”下新建

    notebook.children[nowcell].after(initcell())

    let contents = document.querySelectorAll(".cell")
    for (let i = 0; i < contents.length; i++) {
        contents[i].setAttribute("cell_number", i)
    }
}

//上移
function move(diction) {
    let div_1 = null
    if (diction == -1) {
        div_1 = notebook.children[nowcell - 1]
    }
    else {
        div_1 = notebook.children[nowcell + 1]
    }
    let div_2 = notebook.children[nowcell]

    let contents_one = document.querySelectorAll(".cell")
    let length = contents_one.length

    let newnode = document.createElement("div")
    newnode.className = "cell"
    if ((nowcell == 0 && diction == -1) || (nowcell == length - 1 && diction == 1)) {
        alert("不可移动")
    }
    else {
        notebook.insertBefore(newnode, div_2)
        notebook.insertBefore(div_2, div_1)
        notebook.insertBefore(div_1, newnode)
        notebook.removeChild(newnode)
        if (diction == 1) {
            nowcell++
        }
        else {
            nowcell--
        }

    }
    let contents = document.querySelectorAll(".cell")
    for (let i = 0; i < contents.length; i++) {
        contents[i].setAttribute("cell_number", i)
    }

    spans.innerHTML = "序号：" + nowcell
}

adds[2].onclick = () => {
    move(-1)
}

adds[3].onclick = () => {
    move(1)
}

//删除
adds[4].onclick = () => {

    notebook.removeChild(notebook.children[nowcell])

    let contents = document.querySelectorAll(".cell")
    for (let i = 0; i < contents.length; i++) {
        contents[i].setAttribute("cell_number", i)
    }
}
//创建节点
function initcell() {
    i++
    let Odiv = document.createElement("div")
    Odiv.className = "cell"
    Odiv.setAttribute("moshi", 0)
    let content=document.createElement("div")
    content.className="content"
    Odiv.appendChild(content)
    //单击选中事件
    Odiv.onclick = function (e) {
        let contents = document.querySelectorAll(".cell")
        for (let j = 0; j < contents.length; j++) {
            contents[j].style.border = "1px solid rgb(54, 61, 142)";
        }
        e.currentTarget.style.border = "5px solid #ccc"
        nowcell = Number(e.currentTarget.getAttribute('cell_number'))
        spans.innerHTML = "序号：" + nowcell
    }

    Odiv.addEventListener("dblclick", (event) => {

        //双击事件进行模式的切换
        if (event.currentTarget.getAttribute("moshi") == "0") {
            event.currentTarget.setAttribute("moshi", 1)

            Odiv.children[0].style.display="none"
            Odiv.children[1].style.display="block"

        }
        else {
            event.currentTarget.setAttribute("moshi", 0)
            Odiv.children[0].style.display="block"
            Odiv.children[1].style.display="none"
        }

    })
    //新节点cell添加p标签
    let Op = document.createElement("p")
    content.appendChild(Op)

    let Textarea=document.createElement("textarea")
    Odiv.appendChild(Textarea)
    Textarea.style.display="none"
    
    //添加导航栏
    let Op_one = document.createElement("p")
    menu.appendChild(Op_one)
    Op_one.innerHTML = "笔记" + i
    Op_one.style.cssText = "text-align:center"

    Odiv.style.cssText = "width:100% padding:10px border:1px solid rgb(54,61,142)"
    Op.innerHTML = "这是一篇新笔记" + i

    return Odiv//返还节点
}