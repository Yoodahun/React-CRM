import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import CustomerDelete from './CustomerDelete';

class Customer extends React.Component {
  render() {
    return (
      <TableRow>
        <TableCell>{this.props.id}</TableCell>
        <TableCell><img src={this.props.image} alt="profile" width="64" height="64"/></TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.birthday}</TableCell>
        <TableCell>{this.props.gender}</TableCell>
        <TableCell>{this.props.job}</TableCell>
        <TableCell><CustomerDelete stateRefresh={this.props.stateRefresh} id={this.props.id}></CustomerDelete></TableCell>
          {/*몇번 데이터가 삭제되는 지 아이디 값을 넘겨줘야함.*/}
          {/*부모 컴포넌트에서 전달된 stateRefresh 메소드를 넘겨줌.*/}
      </TableRow>
    );
  }
}


export default Customer;
