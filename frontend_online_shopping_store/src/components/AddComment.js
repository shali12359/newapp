import React,{Component} from 'react';
import Cookies from "universal-cookie";
import { Comment, Header, Rating } from 'semantic-ui-react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

export default class AddComment extends Component{
  constructor(props) {
    const cookies = new Cookies();
    let user = cookies.get('user');
    super(props);

    this.state = {
      user: user,
      Comment: '',
      date: new Date().toLocaleDateString(),
      Review: 1,
      Username: '',
      ProductId: ''
    }


    this.onChangeComment = this.onChangeComment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeReview = this.onChangeReview.bind(this);
  }

  onChangeComment(e) {
    this.setState({
      Comment: e.target.value
    });
  }

  onChangeReview = (event, data) => {
    this.setState({
      Review: data.rating
    });
  }

  onSubmit(e) {
      e.preventDefault();

      const cookies = new Cookies();
      let user = cookies.get('user');

      const {productid} = this.props;

      if (user) {
        const comment = {
          Comment: this.state.Comment,
          Review: this.state.Review,
          date: this.state.date,
          ProductId: productid,
          UserId: user.userId,
          Username: user.username
        }

        console.log(comment);

        axios.post('http://localhost:5000/comment/create', comment)
          .then(res => console.log(res.data));

        this.setState({
          Comment: ''
        })

        window.location.reload();
      }

      else {
        alert('Please Login First..!');
        window.location.href = "/sign-in";
      }

  }

  render(){

    return (
      <div className="mt-5">
        <h2>Add Comments</h2>
        <Form onSubmit={this.onSubmit}>
          <Form.Group>
            <Form.Control type="text" value={this.state.Comment} onChange={this.onChangeComment} placeholder="Add Your Comment..." required/>
          </Form.Group>
          <Rating icon='star' defaultRating={this.state.Review} value={this.state.Review}  maxRating={4} onRate={this.onChangeReview} size='huge'/><br/>
          <Button className="mt-3" variant="dark" type="submit">Submit</Button>
        </Form>
      </div>
    );
  }
}
