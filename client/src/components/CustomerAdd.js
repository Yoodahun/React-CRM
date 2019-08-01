import React from 'react';
import { post } from 'axios';

class CustomerAdd extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      file: null,
      userName: '',
      birthday: '',
      gender: '',
      job: '',
      fileName: ''
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
    fileName: ''
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

addCustomer = () => {
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

render() { //실제 이미지가 렌더링되어 표시되는 부분
    return (
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
    )
}


}

export default CustomerAdd;
