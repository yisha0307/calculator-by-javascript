var calc="";
var ans="";
var clear = false;


$(document).ready(function(){
 $(".num").click(function(){
 	if(clear === false){
 	calc+=$(this).text();
   $(".output").text(calc);
   ans=eval(calc);
}else{
   	calc="";
   	calc+=$(this).text();
   $(".output").text(calc);
   	clear=false;
   }
 });
$(".operator").click(function(){
 	if(clear === false && ans){
 	calc+=$(this).text();
  $(".output").text(calc);
   ans=eval(calc);
}else if(clear === true && ans){
   	clear=false;
   	calc+=$(this).text();
   $(".output").text(calc);
   }
 });
  $(".C").click(function(){
    $(".output").text("0");
    calc="";
    clear=false;
  });
  $(".fuhao").click(function(){
  	$(".output").prepend("-");
  	calc=-calc;
  	ans=eval(calc);
  });
  $(".equal").click(function(){
  	$(".output").text(ans);
  	calc=ans;
  clear=true;
  })
})