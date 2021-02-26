const SERVER_URL = "https://request.pluteam.xyz:4905";
var totalQue = 0;
var count = 0;
var qCount = 0;

const node = document.createElement("form");
const text = document.createElement("div");
const submit = document.createElement("input");
node.className = "question";
submit.type = "button";
submit.value = "提交";

function createQuestion(q){
  count++;
  qCount++;
  let no = node.cloneNode(true);
  let que = text.cloneNode();
  que.appendChild(document.createTextNode(count + "." + q.con));
  no.appendChild(que);

  for (i=1;i<=4;i++){
    let radio = document.createElement("input");
    radio.type = "radio";
    radio.value = i.toString();
    radio.name = "qu" + qCount;
    no.appendChild(radio);
    no.appendChild(document.createTextNode(q["s" + i]));
    no.appendChild(document.createElement("br"));
  }

  no.id = "q" + count;

  return no;
}

function loadTest(data){
  console.log(data);
  totalQue = data.q.length;

  document.getElementById("head11").remove();
  let form = document.getElementById("q_form");

  data.q.forEach(element => {
    form.appendChild(createQuestion(element));
  });

  let spec_div = document.createElement("div");
  spec_div.style = "text-align:center";
  spec_div.appendChild(document.createTextNode("EX.所擅长的方面:(最多20字)"));
  spec_div.appendChild(document.createElement("br"));
  let spec = document.createElement("input");
  spec.type = "text";
  spec.id = "special";
  spec_div.appendChild(spec);
  form.appendChild(spec_div);

  submit.onclick = check;
  let div = document.createElement("div");
  div.style = "text-align:center";
  div.appendChild(submit);
  let alert_text = document.createElement("b");
  alert_text.id = "alert_text";
  div.appendChild(alert_text);
  form.appendChild(div);
  
  /*let att = document.createElement("div");
  div.style = "text-align:center";
  let h = document.createElement("h3");
  h.innerHTML = "制作者"
  att.appendChild(h);
  
  let text = "";
  data.author.forEach(element => {
    text += element + "  ";
  });
  let h1 = document.createElement("b");
  h1.innerHTML = "出题者 - ";
  h1.appendChild(document.createTextNode(text));
  att.appendChild(h1);

  att.appendChild(document.createElement("br"));
  let h2 = document.createElement("b");
  h2.innerHTML = "问卷页制作 - ";
  h2.appendChild(document.createTextNode("Naraku_Night"));
  att.appendChild(h2);

  form.appendChild(att);*/
}

var q_list = {
  req:"check",
  id:"",
  ans:[],
};
function get(){
  let send = {req : "get",
    id : document.getElementById("game_id").value,
    ip : returnCitySN["cip"]
  };
  let alert_text = document.getElementById("alert_txt");
  alert_text.innerHTML = "已关服,无法认证!"

  $.ajax({type : "get",
  url : SERVER_URL,
  dataType : "json",
  data : JSON.stringify(send),
  async : true,
  error : function(err){
    alert_text.innerHTML = ("错误:\n" + err);
    console.error(err);
  },
  success : function(data){
    console.log(data.type);
    try {
      switch (data.type){
        case "err":
          alert_text.innerHTML = "错误:" + data.msg;
          break;
        case "test":
          q_list.id = document.getElementById("game_id").value;
          alert_text.innerHTML = "加载题目..."
          loadTest(data);
          break;
        default:
          alert_text.innerHTML = "无效返回";
      }
    } catch (error) {
      console.error(error);
      alert_text.innerHTML = "错误:" + error;
    }
  }
})
  alert_text.innerHTML = "请求中..."
}

var answered = 0;
var sure = false;
function check(){
  answered = 0;
  let form = document.getElementById("q_form");

  let ans = [];
  let j = 0;
  form.childNodes.forEach(element => {
    if(element.className == "question"){
      for (let i = 0; i < element.childNodes.length; i++) {
        let tepm1 = element.childNodes[i]
        if(tepm1.type == "radio"){
          if(tepm1.checked == true){
            ans[j] = parseInt(tepm1.value);
            answered++;
            break;
          }else{
            ans[j] = 0;
          }
        }
      }
      j++;
    }
  });
  ans[totalQue] = document.getElementById("special").value;
  console.log(answered);

  let alert = document.getElementById("alert_text");

  if(document.getElementById("special").value.length > 20){
    alert.innerHTML = "超过20字限制";
    return;
  }

  if(answered < totalQue || document.getElementById("special").value === ""){
    if(!sure){
      alert.innerHTML = "问卷未完成,确定要提交?(没有回答的问题视为错误)"
      sure = true;
    }else{
      q_list.ans = ans;
      post();
    }
  }else{
    q_list.ans = ans;
    post();
  }
}

function post(){
  let alert = document.getElementById("alert_text");
  alert.innerHTML = "提交中..."
  let json = JSON.stringify(q_list);
  $.ajax({
    type : "post",
    url: SERVER_URL,
    dataType : "json",
    data: json,
    async:true,
    error:function(err){
      alert.innerHTML = "发生错误:" + err;
      console.error(err);
    },
    success: function(data){
      switch(data.type){
        case "err":
          alert.innerHTML = "错误:" + data.msg;
          break;
        case "passed":
          updPage("您已成功通过!服务器白名单已更新,可以加入服务器了")
          break;
        case "no_pass":
          updPage("您未通过问卷测试,如果有特殊原因请联系服主,否则重新填写问卷。")
          break;
      }
    }
  })
}

function updPage(data){
  document.getElementById("q_form").remove();
  
  let text = document.createElement("b");
  text.innerHTML = data;
  document.getElementById("page").appendChild(text);
}