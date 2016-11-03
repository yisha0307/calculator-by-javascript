$(document).ready(function(){
	var calc = new Calc();
	calc.init();
})

var Calc = function() {
	var numexp =  /\d/g, 
	equation =   "", 
	numarr =  [0,1,2,3,4,5,6,7,8,9,"."],
	disp =  "",
	ans = null,
	operatorarr = ["+","-","*","/"],

	filterarr =  function(num, arr){
		var res = arr.filter(function(val){
				if(num==val) return true;
				else return false;
			});
		if (res.length ===0)
		{ 
			return false;
		}
		else return true;
	};

	var C = {

		init: function() {

			$(".num, .dot").click(function() {
				
				// var l = equation.length;
				// if(filterarr(equation[l-1],numarr) || equation === "" ){
				// equation = equation+$(this).text();
				// console.log(equation);
				// $(".output").text(equation);
				// console.log(filterarr(equation[l-1],numarr));
				// }else{
					if(equation ==="" && ans)
					{
						disp = "";
						ans = null; 
						equation = "" + $(this).text();
					}
					else 
					{
						equation = equation+$(this).text();
					}
					console.log(equation);
					disp = disp + $(this).text();
					$(".output").text(disp);

				// }
			})
			
			$(".operator").click(function(){
				if(equation ==="" && !ans)
				{
					equation="";
				}
				else
				{
					if(!ans){
						var l = equation.length;
						if(filterarr(equation[l-1],operatorarr))
						{
							equation = equation.substr(0,l-1)+$(this).text();
						}
						else 
						{
							equation = equation+$(this).text();
						}		
						
						disp="";
						console.log(equation);
					}
					else if(ans)
					{
						equation = String(ans)+$(this).text();
						console.log(equation);
						disp="";
					}
				}
			})
			//AC 把所有的值都清完了
			$(".AC").click(function(){
				equation="";
				$(".output").text("0");
				disp="";
				ans = null;

			})

			// C把当前的数值清除
			$(".C").click(function(){
				var temp = equation.indexOf(disp);
				equation = equation.substr(0,temp);
				disp="";
				$(".output").text("0");
				console.log(equation);
			})

			$(".equal").click(function(){
				ans = eval(equation);
				$(".output").text(ans);
				equation = "";
				disp="";
				console.log(ans);
			})
		}
	}

	return C;
}

