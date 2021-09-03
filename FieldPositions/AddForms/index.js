import React, { useState, useEffect} from 'react';
import { Link ,useHistory } from 'react-router-dom';
import ContentWrapper from '../../Layout/ContentWrapper'
import firebase from 'firebase';
import Loader from '../../Loader';
import Button from "@material-ui/core/Button";
import {
  Card,
  CardBody,
  FormGroup,
  CardHeader,
  Input
} from 'reactstrap';
import { firestore } from '../../../firebaseConfig';

const AddForm = (props) => {
  const [title, setTitle] = useState('');
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const history = useHistory();

  useEffect(() => {
    const id = props.match.params.id
    if (id) {
      setIsEditing(true)
      getFieldPosition(id)
      
    }
  }, [])

  const getFieldPosition = (id) => {
    setIsLoading(true);
    setIsEditing(true);
    var docRef = firestore.collection("FieldPositions").doc(id);
    docRef.get().then((doc) => {
       setIsLoading(false);
       setIsEditing(false);
      if (doc.exists) {
        const data = doc.data();
        setTitle(data.title);
        
      } else {
        console.log("No such document!");
      }
    });

  }
  const save = (event) => {
    event.preventDefault();
    setIsLoading(true);
    firestore.collection("FieldPositions").add({
      title: title,
      created_at: firebase.firestore.FieldValue.serverTimestamp(),
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(() =>{
      setIsLoading(false);
      history.goBack();
    });
  }
  const update = (event) => {
    event.preventDefault();
    setIsLoading(true);
    const id = props.match.params.id
    firestore.collection("FieldPositions").doc(id).update({
      title: title,
      updated_at: firebase.firestore.FieldValue.serverTimestamp(),
    }).then(()=>{
      setIsLoading(false);
    });
  }
  return (
    <>
      <ContentWrapper>
        <div className="content-heading">
          <span> Field Positions</span>
          <div className="col-10">
            <Link to='/fieldpositions'>
              <Button variant="contained" color="primary" style={{ float: 'right' }}> back </Button>
            </Link>
          </div>
        </div>

        <Card className="card-default">
          <CardHeader>
            <div className="card-title">Add Field Positions </div>
          </CardHeader>

          <CardBody>
            <form>
              <FormGroup>
                <label>Name</label>
                <Input type="text" name="title" placeholder="Name" value={title}
                  onChange={(e) => setTitle(e.target.value)} />
              </FormGroup>

              <Button className="btn btn-sm btn-secondary" type="save" onClick={isEditing ? update : save}>save</Button>
              <Button className="danger" type="submit">clear</Button>
            </form>
          
             <Loader isLoading={isLoading}/>
            
           
          </CardBody>
        </Card>
      </ContentWrapper>
    </>

  )
}

export default AddForm
