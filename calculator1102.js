$(document).ready(function(){
	var calc = new Calc();
	calc.init();
})

var Calc = function() {
	var C = {
		numexp: /\d/g, 
		equation:  "", 
		numarr: [0,1,2,3,4,5,6,7,8,9,"."],
		disp: "",
		ans:null,
		operatorarr:["+","-","*","/"],

		filterarr: function(num, arr){
			var res = arr.filter(function(val){
					if(num==val) return true;
					else return false;
				});
			if (res.length ===0)
			{ 
				return false;
			}
			else return true;
		},

		init: function() {

			var _self = this;

			$(".num, .dot").click(function() {
				
				// var l = equation.length;
				// if(filterarr(equation[l-1],numarr) || equation === "" ){
				// equation = equation+$(this).text();
				// console.log(equation);
				// $(".output").text(equation);
				// console.log(filterarr(equation[l-1],numarr));
				// }else{
					if(_self.equation ==="" && _self.ans)
					{
						_self.disp = "";
						_self.ans = null; 
						_self.equation = "" + $(this).text();
					}
					else 
					{
						_self.equation = _self.equation+$(this).text();
					}
					console.log(_self.equation);
					_self.disp = _self.disp + $(this).text();
					$(".output").text(_self.disp);

				// }
			})
			
			$(".operator").click(function(){
				if(_self.equation ==="" && !_self.ans)
				{
					_self.equation="";
				}
				else
				{
					if(!_self.ans){
						var l = _self.equation.length;
						if(_self.filterarr(_self.equation[l-1],_self.operatorarr))
						{
							_self.equation = _self.equation.substr(0,l-1)+$(this).text();
						}
						else 
						{
							_self.equation = _self.equation+$(this).text();
						}		
						
						_self.disp="";
						console.log(_self.equation);
					}
					else if(_self.ans)
					{
						_self.equation = String(_self.ans)+$(this).text();
						console.log(_self.equation);
						_self.disp="";
					}
				}
			})
			//AC 把所有的值都清完了
			$(".AC").click(function(){
				_self.equation="";
				$(".output").text("0");
				_self.disp="";
				_self.ans = null;

			})

			// C把当前的数值清除
			$(".C").click(function(){
				var temp = _self.equation.indexOf(_self.disp);
				_self.equation = _self.equation.substr(0,temp);
				_self.disp="";
				$(".output").text("0");
				console.log(_self.equation);
			})

			$(".equal").click(function(){
				_self.ans = eval(_self.equation);
				$(".output").text(_self.ans);
				_self.equation = "";
				_self.disp="";
				console.log(_self.ans);
			})
		}
	}

	return C;
}

