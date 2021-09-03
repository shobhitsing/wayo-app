import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import swal from 'sweetalert';
import ContentWrapper from '../Layout/ContentWrapper'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from "@material-ui/core/Button";
import { firestore } from '../../firebaseConfig'

const columns: GridColDef[] = [

    { field: 'sr_no', headerName: 'SR.No', sortable: false },
    { field: 'title', headerName: 'Title', width: 700 },
    {
        field: "action",
        headerName: "Action",
        sortable: false,
        width: 150,
        renderCell: (params) => {
            const removeData = () => {
                firestore.collection("FieldPositions").doc(params.row.id).delete().then((removeData) => {
                    if (removeData) {
                      swal("Poof! Your file has been deleted!", {
                        icon: "success",
                      });
                    } else {
                      swal("Your file is safe!");
                    }
                  });
            }
            return <div>

                <Button onClick={removeData}><DeleteIcon /></Button>
                <Link to={`/fieldpositions/add-edit/${params.row.id}`}>
                    <Button > <EditIcon /></Button>
                </Link>
            </div>;
        }
    },
]

const FieldPositions = () => {
    const [fieldPositions, setFieldPositions] = useState([])

    useEffect(() => {
        fetchFieldPosition()

    }, [])
    const fetchFieldPosition = () => {
        firestore.collection("FieldPositions")
            .onSnapshot((snapshot) => {
                const FieldPositions = snapshot.docs.map((doc, index) => {
                    return { id: doc.id, sr_no: index + 1, ...doc.data() }
                })
                // console.log('FieldPositions', FieldPositions)
                setFieldPositions(FieldPositions)
            })
    }
    return (
        <>
            <ContentWrapper>
                <div className="content-heading">
                    <div><span>Field Positions</span> </div>

                    <div className="col-10">
                        <Link to='/fieldpositions/add-edit' style={{ float: 'right' }}>
                            <Button variant="contained" color="primary" style={{ float: 'right' }} > Add </Button>
                        </Link>

                    </div>
                </div>
                <div style={{ height: 400, width: '100%' }}>

                    <DataGrid
                        rows={fieldPositions}
                        columns={columns}
                        pageSize={10}
                    />

                </div>
            </ContentWrapper>
        </>
    )
}
export default FieldPositions






