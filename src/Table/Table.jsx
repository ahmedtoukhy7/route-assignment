import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function Table() {

    useEffect(()=>{
        getCustomers()
        getTransaction()
    },[])

    const[customers,setCustomers]=useState([])
    const[filterArr,setFilterArr]=useState(customers)
    const[transactions ,setTransaction ]=useState([])

    async function getCustomers(){
        let {data}= await axios.get('http://localhost:4000/customers')
        console.log(data)
        setCustomers(data)
        setFilterArr(data)
    }
    async function getTransaction (){
        let {data}= await axios.get('http://localhost:4000/transactions')
        console.log(data)
        setTransaction(data)
    }

    function Search(value){

        let filterArr = customers.filter((ele)=> ele.name.toLowerCase().includes(value.toLowerCase())==true)
        console.log(filterArr)
        setFilterArr(filterArr)

    }



  return <div className='table my-5'>
    <div className='container text-center '>
        <h1 className='my-5'>customer and transaction</h1>

        <input onChange={(e)=>{
            Search(e.target.value)
        }} className="form-control mb-4 w-50 mx-auto" placeholder='Search by Name ...' />
        <table className='table table-striped table-dark'>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Customer Name</th>
                    <th>Transaction Date</th>
                    <th>Transaction Amount</th>
                    
                </tr>
            </thead>
            <tbody>
                {filterArr.length > 0 ? filterArr.map((customer,index)=>  <tr key={index}>
                <td> {customer.id} </td>
                <td> {customer.name} </td>
                <td>{transactions[index].date }
                
                </td>
                <td>{transactions[index].amount }</td>
              </tr>
                            ) : <h4>No Data To Sow</h4>}
               
               
              

            </tbody>
        </table>
    </div>
  </div>
}
