import React from 'react';
import { post } from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from  '@material-ui/core/DialogTitle';
import DialogContent from  '@material-ui/core/DialogContent';
import TextField from  '@material-ui/core/TextField';
import Button from  '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withStyles } from "@material-ui/core/styles";

const  styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: '',
      open: false
    }
  }

handleFormSubmit = (e) => {//submit버튼을 눌렀을 때, 해당 input으로 부터 데이터가 들어오는 것.
  e.preventDefault() //파일이 제대로 올 수 있도록?
  this.addCustomer().then((response) => { //서버로부터 어떠한 값을 되받았을 때
    console.log(response.data);
    this.props.stateRefresh(); // 서버로 부터 응답을 받은 후에 리프레시를 할 수 있게끔 하는 것.
  });
  this.setState({
    file: null,
    userName: '',
    birthday: '',
    gender: '',
    job: '',
    fileName: '',
    open: false
  });
  // window.location.reload(); //reload windows

};

handleFileChange = (e) => { //submit버튼을 눌렀을 때, 해당 input으로 부터 데이터가 들어오는 것.
  this.setState({
    file: e.target.files[0], //target은 event가 발생한 지점 그 자체. 왜하필 첫번째냐면 하나의 파일만 업데이트할 것.
    fileName: e.target.value
  })
}

handleValueChange = (e) => {//submit버튼을 눌렀을 때, 해당 input으로 부터 데이터가 들어오는 것.
  let nextState = {};
  nextState[e.target.name] = e.target.value;
  this.setState(nextState);
}

handleValueChangeBirthday = (e) => {
    let re = /^[0-9\b]+$/;

    // if value is not blank, then test the regex
    if (e.target.value === '' || re.test(e.target.value)) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    };
}

addCustomer = () => { //state는 글로벌 변수와 비슷한 그런 개념.
  const url = 'api/customers';
  const formData = new FormData(); //이미지 데이터를 같이 전송하게 위해서 formData를 사용함.
  formData.append('image', this.state.file);
  formData.append('name', this.state.userName);
  formData.append('birthday', this.state.birthday);
  formData.append('gender', this.state.gender);
  formData.append('job', this.state.job);

  const config = { //환경설정
    headers: {
      'content-type': 'multypart/formdata'
    }
  };
  return post(url, formData, config); //post방식으로 해당 url에 어떠한 파일데이터를 가지고 설정을하여 접근함.
    //여기서 return값으로 response가 전달되어 돌아오게 됨.
}

handleClickOpen = () => { // 고객추가하기 버튼을 눌렀을 때  바인딩처리
    this.setState({
        open: true
    });
}

handleClose  = () => { // 고객추가하기 모달을 닫았을 때 바인딩처리
    this.setState({
        file: null,
        userName: '',
        birthday: '',
        gender: '',
        job: '',
        fileName: '',
        open: false
    });

}

render() { //실제 이미지가 렌더링되어 표시되는 부분
    const { classes } = this.props; // 이미지를 적용하는 부분
    return (
        <div>
            <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                Create Data
            </Button>
            <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle> Create Data </DialogTitle>
                <DialogContent>
                    <input className={classes.hidden} accept="image/*" id="raised-button-file" label="プロフィールイメージ" type="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
                    {/*classes.hidden : 위에서 정의한 안보이게하는 그것*/}
                    {/*accept : 사용자가 정해진 값으로만 넣게끔. image파일만.*/}
                    {/*id :*/}
                    <label htmlFor="raised-button-file">
                        <Button variant="contained" color="primary" component="span" name="file">
                            {this.state.fileName === "" ? " イメージ選択" : this.state.fileName}
                        </Button>
                    </label>
                    {/*htmlFor : input에서 정의한 id값. 버튼을 눌렀을 때 해당 html이 실행될 수 있도록? 하는 것. htmlFor*/}
                    {/*name : 서버로 전달될 파라미터 이름*/}
                    <br/>
                    <TextField  label="お名前" type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></TextField>
                    <br/>
                    <TextField label="生年月日 (ex. 950505)" type="text"  inputProps={{ maxLength: "6" }} name="birthday" value={this.state.birthday} onChange={this.handleValueChangeBirthday}></TextField>
                    <br/>
                    <br/>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">性別</FormLabel>
                        <RadioGroup name="gender" value={this.state.gender} onChange={this.handleValueChange} row>
                            <FormControlLabel
                                value="男"
                                control={<Radio color="primary" />}
                                label="男性"
                                labelPlacement="start"
                            />
                            <FormControlLabel
                                value="女"
                                control={<Radio color="primary" />}
                                label="女性"
                                labelPlacement="start"
                            />
                        </RadioGroup>
                    </FormControl>

                    <br/>
                    {/*<TextField label="性別" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}></TextField>*/}
                    {/*<br/>*/}
                    <TextField label="職業"   type="text" name="job" value={this.state.job} onChange={this.handleValueChange}></TextField>

                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={this.handleFormSubmit}> ADD </Button>
                    <Button variant="outlined" color="primary" onClick={this.handleClose}> CLOSE </Button>
                </DialogActions>

            </Dialog>
            
        </div>
        /*
      <form onSubmit={this.handleFormSubmit}>
        <h1> 고객 추가 </h1>
        프로필 이미지 : <input type="file" name="file" file={this.state.file} value={this.state.fileName} onChange={this.handleFileChange}></input>
        <br/>
        이름 : <input type="text" name="userName" value={this.state.userName} onChange={this.handleValueChange}></input>
        <br/>
        생년월일 : <input type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}></input>
        <br/>
        성별 : <input type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}></input>
        <br/>
         직업 : <input type="text" name="job" value={this.state.job} onChange={this.handleValueChange}></input>
       <button type="submit">추가하기</button>
      </form>
      */
        
    )
}


}

export default withStyles(styles)(CustomerAdd);
