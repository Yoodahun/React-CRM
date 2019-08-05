import React from 'react';
// import './App.css';
import Customer from './components/Customer';
import CustomerAdd from './components/CustomerAdd';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

// TODO: Modal Design Using Material UI

const styles = (theme) => ({
  root: {
    width: "100%",
    marginTop: theme.spacing(3),
    overflowX: "auto"
  },
  table: {
    minWidth: 1080
  },
  progress: {
    margin: theme.spacing(2)
  }
})

//main file. 실질적으로 웹사이트에 내용 출력을 담당함.

// console.log(this.props);
class App extends React.Component {
  // function App() {
  // const { classes } = this.props;

  // state = { //데이터가 변경될 수 있을 때는 컴포넌트 내에서 변경될 수 있는 변수를 state로 선언함.
  //   customers: "",
  //   completed: 0
  // }

  //state대신 생성자 constructor를 이용해보도록 함.

  constructor(props) {
    super(props);
    this.state = {
      customers: '',
      completed: 0
    }
  }

  stateRefresh = () => {
    this.setState({
      customers: '',
      completed: 0
    });
    this.callApi()
        .then(res => this.setState({customers: res}))//호출한 callApi의 Response를 customer에 셋팅해주는 것.
        .catch(err => console.log(err)); //에러가 오면 에러 캐치

  }

  //첫 화면 초기화 당시 처
  componentDidMount() { //api서버에 변경된 데이터를 받아오는 작업은 componentDidMount. 모든 컴포넌트가 준비가 되었을 때.
    this.timer = setInterval( this.progress, 20); //timer를 이용하여 20초마다 한 번씩 실행해줌.
    this.callApi()
      .then(res => this.setState({customers: res}))//호출한 callApi의 Response를 customer에 셋팅해주는 것.
      .catch(err => console.log(err)); //에러가 오면 에러 캐치

  }

  callApi = async () => { //비동기 처리작업.
    const response = await fetch('/api/customers'); //정의된 주소에 접근하여
    const body = await response.json(); //response를 json으로 받
    return body;
  }

  progress = () => {
    const { completed } = this.state;
    this.setState({
      completed: completed >= 100 ? 0 : completed + 1
    });
  }

  render() {
    return (
      <div>
        <Paper className={this.props.classes.root}>
          <Table className={this.props.classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>No.</TableCell>
                <TableCell>Image</TableCell>
                <TableCell>名前</TableCell>
                <TableCell>生年月日</TableCell>
                <TableCell>性別</TableCell>
                <TableCell>職業</TableCell>
                <TableCell>削除ボタン</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {  /* key값은 반드시 넣어주어야함.
                App.js 에서 선언한 stateRefresh를 자식 컴포넌트에 전달하여 사용할 수 있도록 함.
                */
                this.state.customers ? this.state.customers.map(c => {
                  return (<Customer stateRefresh={this.stateRefresh} key={c.id} id={c.id} image={c.image} name={c.name} birthday={c.birthday} gender={c.gender} job={c.job}/>)
                }) :
                <TableRow>
                  <TableCell colSpan="6" align="center">
                    <CircularProgress className={this.props.classes.progress} variant="determinate" value={this.state.completed}/>
                  </TableCell>
                </TableRow>
              }
            </TableBody>
          </Table>
        </Paper>
        <CustomerAdd stateRefresh={this.stateRefresh} />
    </div>
  );
  }
}

// export default App;
export default withStyles(styles)(App);
