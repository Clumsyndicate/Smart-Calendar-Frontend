import React, {Component} from 'react'
import ImageUploader from 'react-images-upload';

class ImgUpload extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] , uploaded: false};
         this.onDrop = this.onDrop.bind(this);
    }
  
    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
            uploaded:true
        });
       
         alert("Upload Success!")
    }
  
    render() {
        return (
            <ImageUploader
                withIcon={true}
                buttonText='Choose images'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.png', '.jpeg']}
                maxFileSize={5242880}
            />
            
            
        );
    }
  }

  export default ImgUpload