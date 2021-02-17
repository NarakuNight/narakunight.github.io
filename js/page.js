const SERVER_URL = "https://request.pluteam.xyz/";
var count = 0;

function addQuestion(q,s1,s2,s3,s4){
  let form = document.createElement("form");
  form.id = "q" + count;
  document.getElementById("q_form").appendChild(form);
  count++;
}

function get(){
  let send = {req : "get",
    id : document.getElementById("game_id").value,
    ip : returnCitySN["cip"]
  };
  console.log(JSON.stringify(send));
  let alert_text = document.getElementById("alert_txt");

  $.ajax({type : "get",
  url : SERVER_URL,
  data : JSON.stringify(send),
  dataType : "json",
  async : true,
  error : function(err){
    alert_text.innerHTML = ("错误:\n" + err.code);
  },
  headers: {
    'Content-Type': 'application/json'
    },
  success : function(data){
    try {
      if(data == "err"){
        alert_text.innerHTML = ("向服务器请求时发生错误");
      }else if (data == "iprep"){
        alert_text.innerHTML = "您的IP与已注册ID中IP重复"
      }else if (datya = "idrep"){
        alert_text.innerHTML = "此ID已注册"
      }else{
        alert_text.innerHTML = data;
      }
    } catch (error) {
      alert_text.innerHTML = "发生错误:" + error;
    }
  }
})
}