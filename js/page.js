const SERVER_URL = "https://request.pluteam.xyz/";
var count = 0;
var qCount = 0;

var node = document.createElement("div");
var text = document.createElement("div");
var submit = document.createElement("input");
submit.type = "button";
submit.value = "提交";

node.appendChild(text.cloneNode());
for (i=1;i<=4;i++){
  let div = text.cloneNode();
  let radio = document.createElement("input");
  radio.type = "radio";
  radio.value = i.toString();
  radio.name = "qu" + qCount;
  div.appendChild(radio);
  node.appendChild(div);
}

function updName(){
  node.childNodes.forEach(element => {
    element.name = "qu" + qCount;
  });
  qCount++;
}

function createQuestion(q){
  count++;
  let no = node.cloneNode(true);
  console.log(no);
  no.id = "q" + count;
  
  no.childNodes[0].appendChild(document.createTextNode(count + '.' + q.con))
  let j = 1;
  for(i = 0;i<no.childNodes.length;i++){
    if (i != 0){
      no.childNodes[i].appendChild(document.createTextNode(q['s' + j]));
      j++;
    }
  }

  updName();
  return no;
}

function loadTest(data){
  console.log(data);
  document.getElementById("head11").remove();
  let form = document.getElementById("q_form");

  data.q.forEach(element => {
    form.appendChild(createQuestion(element));
  });
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
      if(data.type == "err"){
        alert_text.innerHTML = ("向服务器请求时发生错误");
      }else if (data.type == "iprep"){
        alert_text.innerHTML = "您的IP与已注册ID中IP重复"
      }else if (data.type = "test"){
        alert_text.innerHTML = "加载题目..."
        loadTest(data);
      }else if (data.type == "iperr"){
        alert_text.innerHTML = "检查IP时出现错误";
      }else if (data.type == "idrep"){
        alert_text.innerHTML = "此ID已注册"
      }
    } catch (error) {
      console.error(error);
      alert_text.innerHTML = "发生错误:" + error;
    }
  }
})
  alert_text.innerHTML = "正在向服务器请求中..."
}