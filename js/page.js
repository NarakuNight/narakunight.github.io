const SERVER_URL = "https://request.pluteam.xyz/";
var totalQue = 0;
var count = 0;
var qCount = 0;

const node = document.createElement("form");
const text = document.createElement("div");
const submit = document.createElement("input");
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
  spec_div.appendChild(document.createTextNode("EX.所擅长的方面:(最多20字)"));
  spec_div.appendChild(document.createElement("br"));
  let spec = document.createElement("input");
  spec.type = "text";
  spec.id = "special";
  spec_div.appendChild(spec);
  spec_div.style = "text-align:center";
  form.appendChild(spec_div);

  let div = document.createElement("div");
  div.style = "text-align:center";
  div.appendChild(submit);
  form.appendChild(div);
  
  let att = document.createElement("div");
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

  form.appendChild(att);
}

function get(){
  let send = {req : "get",
    id : document.getElementById("game_id").value,
    ip : returnCitySN["cip"]
  };
  let alert_text = document.getElementById("alert_txt");

  $.ajax({type : "get",
  url : SERVER_URL,
  dataType : "json",
  data : JSON.stringify(send),
  async : true,
  error : function(err){
    alert_text.innerHTML = ("错误:\n" + err.code);
    console.error(err);
  },
  success : function(data){
    console.log(data.type);
    try {
      switch (data.type){
        case "err":
          alert_text.innerHTML = "向服务器请求时发生错误";
          break;
        case "iprep":
          alert_text.innerHTML = "您的IP与已注册ID中IP重复";
          break;
        case "iperr":
          alert_text.innerHTML = "检查IP时出现错误";
          break;
        case "idrep":
          alert_text.innerHTML = "此ID已注册";
          break;
        case "iderr":
          alert_text.innerHTML = "请检查你的id是否有效";
          break;
        case "test":
          alert_text.innerHTML = "加载题目..."
          loadTest(data);
          break;
        default:
          alert_text.innerHTML = "无效返回";
      }
    } catch (error) {
      console.error(error);
      alert_text.innerHTML = "发生错误:" + error;
    }
  }
})
  alert_text.innerHTML = "正在向服务器请求中...(原谅我们的土豆服务器)"
}

var q_list = {
  id:"",
  ip:"",
  ans:[],
  spec:""
};
function check(){
  let form = document.getElementById("q_form");

  let ans = [];
  form.childNodes.forEach(element => {
    
  });
}