import * as React from "react";
import { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import ImportExportIcon from '@mui/icons-material/ImportExport';

import './index.css'

const style = {
  position: "absolute",
  top: "10%",
  right: "1%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid yellow",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};


export default function DataTable() {
  const [open, setOpen] = useState(false);
  let [columnName, setColumnName] = useState("");
  const [columns, setColumns] = useState(["ID", "Course", "Price", "Rating","Action"]);
  let [rows, setRows] = useState([
    { id: 1, course: "Java", price: 20, rating: 5 },
    { id: 2, course: "C++", price: 20, rating: 2 },
    { id: 3, course: "CSS", price: 40, rating: 4 },
    { id: 4, course: "CSS", price: 20, rating: 1 },
    { id: 5, course: "CSS", price: 10, rating: 5 },
    { id: 6, course: "English", price: 24, rating: 6 },
    { id: 7, course: "CSS", price: 25, rating: 5 },
    { id: 8, course: "CSS", price: 120, rating: 5 },
    { id: 9, course: "Python", price: 30, rating: 5 },
    { id: 10, course: "CSS", price: 20, rating: 5 },
    { id: 11, course: "NodeJS", price: 20, rating: 5 },
  ]);
  const [update, setUpdate]= useState(0)
  
  const[searchValue, setSearchValue]= useState("")
  const [filter, setFilter]= useState([])

  const handleOpen = () => setOpen(true);
  const handleClose = () =>setOpen(false);
  const handleColumnName = (e) => setColumnName(e.target.value);

  const handleColumn = () => {
    if(columnName.length<=1){
      handleClose()
    }
    else{
    setColumns([...columns, columnName]); 
    setColumnName("")
    handleClose();
    }
  };

  
  const handleSearch= ((e)=>{
    setSearchValue(e.target.value)
    let searched = rows.filter((ser) => {
      if (ser.course) {
        return ser.course.toLowerCase().includes(searchValue.toLocaleLowerCase());
      }
    });
    setFilter(searched);
  })

  const handleDelete =(id)=>{
  let filteredRow= rows.filter((item,index)=>{
      return id!==index
    })
    setRows(filteredRow)
  }

  const handleSort = ()=>{
   let sortedRow= rows.sort((a,b)=>{
      return a.rating-b.rating
    })
    console.log(sortedRow);
    setRows(sortedRow)
    setUpdate((x)=>x+1)
  }

  return (
    <TableContainer component={Paper}> 
      <input type="text" onChange={handleSearch} placeholder="Search" value={searchValue} name="" id="" />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            {columns.map((item) => {
              if(item==="Rating"){
                return <TableCell>{item} <button  className="sortButton"><ImportExportIcon onClick={handleSort}/></button></TableCell>
              }
              return <TableCell>{item}</TableCell>
            })}
            <TableCell>
              {" "}
              <React.Fragment>
                <Button className="column_button" onClick={handleOpen}>Add column</Button>
                <Modal
                  hideBackdrop
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="child-modal-title"
                  aria-describedby="child-modal-description"
                >
                  <Box sx={{ ...style, width: 200 }}>
                    <input type="text" placeholder="Enter name of Column" onChange={handleColumnName} />
                    <Button onClick={handleColumn}>Done</Button>
                  </Box>
                </Modal>
              </React.Fragment>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            searchValue!==""?
          filter.map((filter, index) => (
            <TableRow
              key={filter.name}
              id={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{filter.id}</TableCell>
              <TableCell>{filter.course}</TableCell>
              <TableCell>{filter.price}</TableCell>
              <TableCell>{filter.rating}</TableCell>
              <TableCell><button className="delete" onClick={()=>handleDelete(index)}>Delete</button></TableCell>
            </TableRow>
          )):
          rows.map((row, index) => (
            <TableRow
              key={filter.name}
              id={index}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell>{row.id}</TableCell>
              <TableCell>{row.course}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.rating}</TableCell>
              <TableCell><button  className="delete"  onClick={()=>handleDelete(index)}>Delete</button></TableCell>
            </TableRow>
          ))}
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
