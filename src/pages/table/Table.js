import React, { Component } from "react";
import { useTable } from 'react-table'

 
 const Table=(props)=> {
   const data = React.useMemo(
     () => props.data 
   )
 
   const columns = React.useMemo(
     () => props.columns 
   )
 
   const {
     getTableProps,
     getTableBodyProps,
     headerGroups,
     rows,
     prepareRow,
   } = useTable({ columns, data })
  
   return (
    <div className="flex w-50 mr-2 rounded py-1 px-3 text-blue-900 border-2 border-blue-900 ">
     <table {...getTableProps()} style={{ border: 'solid 1px blue'  }}>
       <thead>
         {headerGroups.map(headerGroup => (
           <tr {...headerGroup.getHeaderGroupProps()}>
             {headerGroup.headers.map(column => (
               <th
                 {...column.getHeaderProps()}
                 style={{
                   width: '200px',
                   borderBottom: 'solid 5px blue',
                   background: 'aliceblue',
                   
                   
                 }}
               >
                 {column.render('Header')}
               </th>
             ))}
           </tr>
         ))}
       </thead>
       <tbody {...getTableBodyProps()}>
         {rows.map(row => {
           prepareRow(row)
           return (
             <tr {...row.getRowProps()}>
               {row.cells.map(cell => {
                 return (
                   <td
                     {...cell.getCellProps()}
                     style={{
                       padding: '10px',
                       border: 'solid 1px blue',
                       textAlign:"center"
                     
                     }}
                   >
                     {cell.render('Cell')}
                   </td>
                 )
               })}
             </tr>
           )
         })}
       </tbody>
       </table>
       
       </div>
   )
}
 
export default Table;
