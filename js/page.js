const SERVER_URL = "http://zn.sakurayun.com:3140/";

function loadQuestions(){
  $.ajax({type : "get",
  url : SERVER_URL,
  data : "qu",
  async : true,
  error : function(err){
    alert("错误:\n" + err.code);
  },
  success : function(data){
    alert(data);
  }
})
}

function submitID(){
  $.ajax({type : "get",
  url : SERVER_URL,
  data : "id" + document.getElementById("game_id").value,
  async : true,
  error : function(err){
    alert("错误:\n" + err.code);
  },
  success : function(data){
    if(data == "true"){
      loadQuestions();
    }
  }
})
}