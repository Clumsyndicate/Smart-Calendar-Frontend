import React, {Component} from 'react'
import ImageUploader from 'react-images-upload';

class ImgUpload extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: undefined , uploaded: false};
         this.onDrop = this.onDrop.bind(this);
    }
  
    onDrop(picture,pic) {
        this.props.saveNewAvatar(picture,pic)
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