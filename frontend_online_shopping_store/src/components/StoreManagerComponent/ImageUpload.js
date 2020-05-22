import React, { Component } from 'react'
import Dropzone from 'react-dropzone'
import Axios from 'axios';

class ImageUpload extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            Images:[]
         }
    }


    onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        Axios.post('http://localhost:5000/product/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {

                    this.setState({
                        Images : [...this.state.Images, response.data.image]
                    })
                    
                    this.props.refreshFunction([...this.state.Images, response.data.image])

                } else {
                    alert('Failed to save the Image in Server')
                }
            })
    }

    onDelete = (image) => {
        const currentIndex = this.state.Images.indexOf(image);

        let newImages = [...this.state.Images]
        newImages.splice(currentIndex, 1)

        this.setState({
            Images:newImages
        })
       
        this.props.refreshFunction(newImages)
    }



    render() { 
        return ( 
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                 <Dropzone
                onDrop={this.onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '300px', height: '240px', border: '1px solid lightgray',
                        display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        <i class="fas fa-plus"></i>


                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '350px', height: '240px', overflowX: 'scroll' }}>

            {this.state.Images.map((image, index) => (
                    <div onClick={() => this.onDelete(image)}>
                        <img style={{ minWidth: '300px', width: '300px', height: '240px' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>
         

            </div>
        );
    }
}
 
export default ImageUpload;

