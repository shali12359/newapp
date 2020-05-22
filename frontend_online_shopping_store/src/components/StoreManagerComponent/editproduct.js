import React, { Component } from 'react'
import {Button, Col, Form} from 'react-bootstrap';
import axios from 'axios';
import Cookies from "universal-cookie";
import ImageUpload from '../StoreManagerComponent/ImageUpload';
import Pitem from './list';
import { Image } from 'semantic-ui-react'

export class EditProductPage extends Component {

    constructor(props) {
        const cookies = new Cookies();
        let user = cookies.get('user');
        super(props);
        this.state = {
            user: user,
            DressCode: '',
            description: '',
            Category:'None',
            DressType:'',
            Subtype:'',
            images: [],
            DressPrice: 0,
            Discount : 0,
            ArrayCategory:[],
            stages:[
                {stage:""}
            ],
           
        }
    }


    componentDidMount(){
        axios.get('http://localhost:5000/category/')
            .then(response => {
                this.setState({ ArrayCategory: response.data });
            })
            .catch(function (error) {
                console.log(error);
            })
 
    
            axios.get('http://localhost:5000/product/'+this.props.match.params.id)
            .then(response => {
                console.log(response.data);
                this.setState({
                    DressCode: response.data.DressCode,
                    Category :  response.data.Category,
                    DressType: response.data.DressType,
                    images: response.data.images,
                    Subtype: response.data.Subtype,
                    description :  response.data.description,
                    DressPrice: response.data.DressPrice,
                    Discount: response.data.Discount
                });
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    onChangeDressCode = (e) => {
        this.setState({ DressCode: e.target.value })
    }

    OnchaneCategory = (e) => {
        this.setState({ 
            Category: e.target.value
        })
    }

    handleChangeDressType = (e) => {
        this.setState({ DressType: e.target.value })
    }

    onChangeDressDesciption = (e) => {
        // console.log(event.currentTarget.value)
        this.setState({ description: e.target.value })
    }

    onCheckComplete = (id) =>{
        const crossItem = this.state.ArrayCategory.find( itemCross => itemCross.CategoryID === id);
      
       
        this.state.ArrayCategory.forEach(element => {
            if(crossItem.CategoryID === element.CategoryID){

                axios.get('http://localhost:5000/category/' + element._id)
                .then(response => {
                    this.setState({ 
                        stages: response.data.stages,
                        Category:response.data.CategoryType,
                        DressType:response.data.SubType
                    });
                })
                .catch(function (error) {
                    console.log(error);
                })
            }
        });
    }

    onChangeDressPrice = (e) => {
        this.setState({ DressPrice: e.target.value })
    }

    onChangeDiscount = (e) => {
        this.setState({ Discount: e.target.value })
    }

    onChangeSubtype = (e) => {
        this.setState({ Subtype: e.target.value })
    }

    onSubmit = (e) => {
        e.preventDefault();

        const obj = {
            user: this.state.user.userId,
            DressCode: this.state.DressCode,
            description: this.state.description,
            Category: this.state.Category,
            DressType: this.state.DressType,
            images: this.state.images,
            Subtype:this.state.Subtype,
            DressPrice: this.state.DressPrice,
            Discount:this.state.Discount,
        }
      
        axios.put('http://localhost:5000/product/update/'+this.props.match.params.id, obj)
            .then(response => {
                if (response.data.success) {
                    alert('Product Updated Successfully')
                   
                } else {
                    alert('Failed to Update Product')
                }
            })

            this.setState({
                DressCode: '',
                description : '',
                Category : '',
                DressType:'',
                images:[],
                Subtype:'',
                description : '',
                DressPrice:0,
                Discount:0
    
            });
            window.location.href = "/log/StoreManager/ViewDressDetails";
           
    }

    updateFiles = (newImages) => {
        console.log(newImages)
        this.setState({ images: newImages })
    }



    render() {
        return (
            <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <h3 class = "x"> !!! Upload Item Here !!! </h3>
            </div>
            <br /> <br />
                <label> Enter Dress Image </label> <br />
                <div> <ImageUpload refreshFunction = {this.updateFiles} /> </div>

                <div  className="ui image header">
                    <Image   src={`http://localhost:5000/${this.state.images[0]}`} alt={`productImg-${0}`} /> 
                </div>

                 <Form onSubmit = {this.onSubmit}>
                
            

                  <Form.Group as ={Col} >
                  <Form.Label>Dress Code</Form.Label>
                  <Form.Control required 
                                type="text" 
                                id = "dcode" 
                                name = "dresscode" 
                                value = {this.state.DressCode} 
                                onChange = {this.onChangeDressCode}  />
                  </Form.Group>

                  <Form.Group as ={Col} >
                  <Form.Label>  Select Dress Category   </Form.Label>
                        
                        <Pitem 
                        TodoItem={this.state.ArrayCategory} 
                        onCheckComplete={this.onCheckComplete}/>
                     
                   </Form.Group>  

                  
                   <Form.Group as={Col}>
                  <Form.Label>Select Dress Type</Form.Label>
                  <Form.Control required 
                                type="text" 
                                id = "dtype" 
                                name = "dresstype" 
                                value = {this.state.DressType} 
                                onChange = {this.handleChangeDressType}  >
                  </Form.Control>
                  </Form.Group>

                  <Form.Group as={Col}>
                  <Form.Label>Select Sub Dress Type</Form.Label>
                  <Form.Control as="select" 
                        id="Dtype"
                        name="Dtype"
                        value={this.state.Subtype}
                        onChange={this.onChangeSubtype} >
                       
                    {
                        this.state.stages.map((item, idx) => {
                            return <option 
                            key={idx}
                            value={this.state.stages[idx].stage}>{this.state.stages[idx].stage}
                            </option>;
                        })
                    }
                  </Form.Control>
                  </Form.Group>


                  <Form.Group as ={Col} >
                  <Form.Label>Dress Description</Form.Label>
                  <Form.Control required 
                                type="text" 
                                id = "description" 
                                name = "dressdescription" 
                                value = {this.state.description} 
                                onChange = {this.onChangeDressDesciption}  />
                  </Form.Group>

                  <Form.Group as ={Col} >
                  <Form.Label>Dress Price</Form.Label>
                  <Form.Control required 
                                type="number" 
                                id = "dprice" 
                                name = "dressprice" 
                                value = {this.state.DressPrice} 
                                onChange = {this.onChangeDressPrice}  />
                  </Form.Group>

                  <Form.Group as ={Col} >
                  <Form.Label>Dress Discount</Form.Label>
                  <Form.Control required 
                                type="number" 
                                id = "discount" 
                                name = "dressdiscount" 
                                value = {this.state.Discount} 
                                onChange = {this.onChangeDiscount}  />
                  </Form.Group>


              
              <Button variant="outline-primary" type="submit">SUBMIT</Button>

                </Form>
        </div>
        )
    }
}

export default EditProductPage
