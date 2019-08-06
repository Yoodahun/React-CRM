import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from  '@material-ui/core/DialogTitle';
import DialogContent from  '@material-ui/core/DialogContent';
import Button from  '@material-ui/core/Button';
import Typography from  '@material-ui/core/Typography';


class CustomerDelete extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }

    handleClickOpen = () => { // 고객추가하기 버튼을 눌렀을 때  바인딩처리
        this.setState({
            open: true
        });
    }

    handleClose  = () => { // 고객추가하기 모달을 닫았을 때 바인딩처리
        this.setState({
            open: false
        });

    }

    deleteCustomer(id) {
        const url = '/api/customers/' + id;
        fetch(url , {
            method: 'DELETE'
        });
        this.props.stateRefresh(); //정의했었던 함수. 삭제가 된 이후 새롭게 바뀐 고객목록을 출력함.
    }

    render() {
        return  (
            <div>
              <Button variant="contained" color="secondary"  onClick={this.handleClickOpen}> Delete </Button>
              <Dialog open={this.state.open} onClose={this.handleClose}>
                <DialogTitle> Delete Message </DialogTitle>
                <DialogContent>
                    <Typography gutterBottom> 選択した情報は削除されますよ。よろしいでしょうか？　</Typography>
                    {/*gutterBottom = 밑에 마진을 넣음*/}
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={(event) => {this.deleteCustomer(this.props.id)}}> 削除 </Button>
                    <Button variant="outlined" color="primary" onClick={(event) => {this.handleClose()}}> キャンセル </Button>
                </DialogActions>
              </Dialog>
            </div>
        );
    }
}

export default CustomerDelete;

