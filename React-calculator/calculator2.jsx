class Calculator extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			displayVal:'0',
			calcArr: []
		}
	}
	//先是functions的三个方法，清零，换正负号，显示小数点
	_clearNumbers(){
		this.setState({
			displayVal:'0',
			calcArr:[]});
	}
	_swapSig(){
		let {displayVal} = this.state;
		if(displayVal[0]==='-'){
			this.setState({displayVal: displayVal.slice(1)}); 
		}else{
			this.setState({displayVal: `-${displayVal}`});
		}
	}
	_insDecimal(){
		let {displayVal} = this.state;
		if (displayVal.length >19){
			return;
		}else if(displayVal.indexOf('.') === -1){
			displayVal = `${displayVal}.`;
			this.setState({displayVal:displayVal});
		}else{
			return;
		}
	}
	//显示数字，改变displayVal
	//这个num得是string,后面改
	_displayNum(num){
		let {displayVal} = this.state;
		if(displayVal.length >19){
			return;
		}else if(displayVal === '0' || displayVal === 'undefined!'){
			this.setState({displayVal:num});
		}else{
			this.setState({displayVal:displayVal+num});
		}
	}
	//计算的两个function，第一个是把数字和符号加到calcArr里(加减乘除），第二个是计算（等号）
	_addToCalc(oper){
		const currentNum = Number.parseFloat(this.state.displayVal);
		const calc = {
			val: currentNum,
			sign: oper
		};
		const vals =[...this.state.calcArr];
		vals.push(calc);
		this.setState({
			displayVal: '0',
			calcArr: vals
		});
	}
	_calcResult(oper){
		const valsToCalc = [...this.state.calcArr],
		currentVal = Number.parseFloat(this.state.displayVal);
		let result = 0;
		valsToCalc.push({val:currentVal,sign:oper});
		for (let i=0;i<valsToCalc.length;i++){
			if(i === 0){
				result = valsToCalc[i].val;
			}else{
				switch(valsToCalc[i-1].sign){
					case '+':
					result += valsToCalc[i].val;
					break;
					case '-':
					result -= valsToCalc[i].val;
					break;
					case '*':
					result *= valsToCalc[i].val;
					break;
					case '/':
					result /= valsToCalc[i].val;
					break;
					default:
					console.log('Something went wrong...');
				}
			}
		}
		if(isNaN(result) || result == Infinity){
			result='undefined!';
		}else{
			result = result.toString();
		}
		this.setState({
				displayVal:result,
				calcArr:[]
			});
	}
	render(){
		const NUMBERS=[1,2,3,4,5,6,7,8,9,0],
			FUNCTIONS=['c','±','.'],
			OPERATIONS=['+','-','*','/','='];
		return (
			<div className='calculator'>
			<Display displayVal = {this.state.displayVal}/>		
			<Functions functionss={FUNCTIONS} _clearNumbers={this._clearNumbers.bind(this)} _insDecimal={this._insDecimal.bind(this)} _swapSig={this._swapSig.bind(this)}/>
			<Operations operationss={OPERATIONS} _addToCalc={this._addToCalc.bind(this)} _calcResult={this._calcResult.bind(this)}/>
			<Numbers numberss ={NUMBERS} _displayNum={this._displayNum.bind(this)} />
			</div>
			);
	}
}

const Display = ({displayVal}) => (
	<div className='calc-display'>
	{displayVal}
	</div>);

class Numbers extends React.Component{
	constructor(props){
		super(props);
	}
	_handleNumbers(num){
		const parseNum = num.toString();
		this.props._displayNum(parseNum);
	}
	render(){
		return (
			<div className ='calc-numbers'>
			{this.props.numberss.map((num)=>{
				return (
					<Button button={num} _handleNumbers={this._handleNumbers.bind(this)}/>);
			})}
			</div>);
	}
}

class Functions extends React.Component{
	constructor(props){
		super(props);
	}
	_handleFunc(func){
		switch(func){
			case 'c':
			this.props._clearNumbers();
			break;
			case '±':
			this.props._swapSig();
			break;
			case '.':
			this.props._insDecimal();
			break;
			default:
			console.log('Something went wrong...');
		}
	}
	render(){
		return (
			<div className='calc-func'>
			{this.props.functionss.map((func)=>{
				return (
					<Button button={func} _handleFunc = {this._handleFunc.bind(this)} />);
			})}
			</div>);
	}
}

class Operations extends React.Component{
	constructor(props){
		super(props);
	}
	_handleOper(oper){
		switch(oper){
			case '+':
			case '-':
			case '*':
			case '/':
			this.props._addToCalc(oper);
			break;
			case '=':
			this.props._calcResult(oper);
			break;
			default:
			console.log('Something went wrong...');
		}
	}
	render(){
		return (
			<div className='calc-oper'>
			{this.props.operationss.map((oper) =>{
				return (
					<Button button = {oper} _handleOper={this._handleOper.bind(this)} />);
			})}
			</div>);
	}
}

class Button extends React.Component{
	constructor(props){
		super(props);
	}
	_handleClick(e){
		switch(this.props.button){
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
			case 7:
			case 8:
			case 9:
			this.props._handleNumbers(this.props.button);
			break;
			case '+':
			case '-':
			case '*':
			case '/':
			case '=':
			this.props._handleOper(this.props.button);
			break;
			case 'c':
			case '±':
			case '.':
			this.props._handleFunc(this.props.button);
			break;
		}
	}
	render(){
		return (
			<button name ={this.props.button} onClick = {this._handleClick.bind(this)} >
			{this.props.button}
			</button>);
	}
}

ReactDOM.render(<Calculator />,document.querySelector('#app'));