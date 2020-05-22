import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'
import axios from 'axios';
import NavBar from './Home/NavBar';

class Signup extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            fname:'',
            Username: '',
            Password: '',
            message: ''
         }
    }

    onChangeFname =(e)=> {
        this.setState({
            fname: e.target.value
        });
    }


    onChangeUsername =(e)=> {
        this.setState({
            Username: e.target.value
        });
    }
    onChangePassword = (e) =>{
        this.setState({
            Password: e.target.value
        });
    }

    onSubmit = (e)=> {
        e.preventDefault();
        const obj = {
            fname: this.state.fname,
            Username: this.state.Username,
            Password: this.state.Password,
        };


        axios.post('http://localhost:5000/user/sign-up', obj)
        .then(res => {
                this.setState({
                    message: res.data.message
                });
                console.log(res.data.message);
            }
        );
        
        this.setState({
            fname:'',
            Username: '',
            Password: '',
            

        });

        if(this.state.message === 'User Created') {
            window.location.href = "/sign-in";
        }
        

       
       
    }
    render() { 
        return ( 

            <div>
            <NavBar/>
            <div className="container">
           
            <form onSubmit={this.onSubmit}>
            <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
            <Grid.Column style={{ maxWidth: 400 }}>
              <Header as='h2' color='teal' textAlign='center'>
                Sign-Up 
              </Header>
              <form onSubmit={this.onSubmit}>
              <Form  onSubmit={this.onSubmit} size='large'>
                <Segment stacked>
                <Form.Input 
                    required
                    fluid icon='user' 
                    iconPosition='left' 
                    placeholder='First Name' 
                    value={this.state.Fname}
                    onChange={this.onChangeFname}
                  />
                  <Form.Input 
                    required
                    fluid icon='user' 
                    iconPosition='left' 
                    placeholder='E-mail address' 
                    value={this.state.username}
                    onChange={this.onChangeUsername}
                  />
                  <Form.Input
                    fluid
                    required
                    icon='lock'
                    iconPosition='left'
                    placeholder='Password'
                    type='password'
                    value={this.state.password}
                    onChange={this.onChangePassword}/>
                  
        
                  <Button color='teal' fluid size='large' type="submit">
                    Sign up
                  </Button>
                </Segment>
              </Form>
              </form>

              {   (this.state.message !== '') ? 

                    (
                        (this.state.message === 'User Created') ? 
                        
                        (   <div>
                            <Message color='green'>
                                <center>{this.state.message}</center>
                            </Message>

                            <Message color='olive'>
                                    Account created Successfully..  <Link to="/sign-in"className="edit">Sign In</Link>
                            </Message>
                            </div>
                        )

                        :

                        (   <Message color='red'>
                                 <center>{this.state.message}</center>
                            </Message>
                        )

                    )
                    :
                    <Message color='olive'>
                        Already have an account?  <Link to="/sign-in"className="edit">Sign In</Link>
                    </Message>
          

            }
            </Grid.Column>
            </Grid>
            </form>
          </div>
          </div>
         );
    }
}
 
export default Signup;