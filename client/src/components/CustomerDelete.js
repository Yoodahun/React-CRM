import React from 'react';

class CustomerDelete extends React.Component{

    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        fetch(url , {
            method: 'DELETE'
        });
        this.props.stateRefresh(); //정의했었던 함수. 삭제가 된 이후 새롭게 바뀐 고객목록을 출력함.
    }

    render() {
        return  (
          <button onClick={(event => {this.deleteCustomer(this.props.id)})}> Delete </button>
        );
    }
}

export default CustomerDelete;

