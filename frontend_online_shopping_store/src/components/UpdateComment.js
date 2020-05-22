import React,{Component} from 'react';
import Cookies from "universal-cookie";
import { Comment, Header, Rating } from 'semantic-ui-react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import NavBar from './Home/NavBar';
import Card from 'react-bootstrap/Card';

export default class UpdateComment extends Component{
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
    this.getState = this.getState.bind(this);
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/comment/" + this.props.match.params.id)
      .then((response) => {
        this.setState({
          Comment: response.data.Comment,
          Review: response.data.Review,
          id:  response.data._id,
          ProductId: response.data.ProductId
          });
      })
      .catch(function (error) {
        console.log(error);
      });
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

      const comment = {
        Comment: this.state.Comment,
        Review: this.state.Review,
        date: this.state.date
      }

      axios.post('http://localhost:5000/comment/update/'+this.props.match.params.id, comment)
      .then(res => console.log(res.data));

      alert('Comment Updated...');

      window.location = '/description/' + this.state.ProductId;
      window.opener.location.reload();

  }

  getState() {
    console.log(this.state.Review);
  }

  render(){
    return (
      <div>
        <NavBar/>
        <div className="main-container">
        <div className="row justify-content-md-center">
        <div className="col-md-6 mr-3 ml-3 text-center mt-5">
          <Card className="mt-5">
            <h2 className="mt-4">Update Comment</h2>
            <Form onSubmit={this.onSubmit} className="mt-3 mb-5">
              <Form.Group className="mr-5 ml-5">
                <Form.Control type="text" value={this.state.Comment} onChange={this.onChangeComment} placeholder="Edit Your Comment..." required/>
              </Form.Group>
              <Rating icon='star' rating={this.state.Review}  maxRating={4} onRate={this.onChangeReview} size='huge'/><br/>
              <Button className="mt-3" variant="dark" type="submit">Update</Button>
            </Form>
          </Card>
        </div>
        </div>
        </div>
      </div>
    );
  }
}
