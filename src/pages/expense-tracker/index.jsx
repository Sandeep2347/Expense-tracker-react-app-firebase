import { useState } from "react";
import {signOut} from "firebase/auth";
import{useNavigate} from "react-router-dom";
import{useGetTransactions} from "../../hooks/useGetTransactions"
import{auth} from "../../config/firebase-config";
import  {useAddTransaction} from "../../hooks/useAddTransaction"
import { useGetUserInfo } from "../../hooks/useGetUserInfo";
import "./style.css"
export const ExpenseTracker =()=>{
    const {addTransaction}=useAddTransaction();
    const {transactions,transactionTotals}=useGetTransactions();
    const {name,profilePhoto}=useGetUserInfo();
    const navigate=useNavigate();
    
    const [description,setDescription]=useState("");
    const [transactionAmount,setTransactionAmount]=useState(0);
    const [transactionType,setTransactionType] =useState("expense")
    
    const {balance,income,expense}=transactionTotals;

    const onSubmit=(e)=>{
        e.preventDefault()
        addTransaction({description,
        transactionAmount,
        transactionType})
    };

    const signUserOut= async ()=>{
        try{
            await signOut(auth)
            localStorage.clear();
            navigate("/");
        }catch (err){
            console.log(err);
        }
        
    }

    return <><div className="expense-tracker">
        <div className="container">
            <h1> {name}'s Expense Tracker</h1>
            <div className="balance">
                <h3>Your Balance</h3>
                {balance>=0 ? <h2>${balance}</h2>:<h2>-${balance*-1}</h2>
                }
            </div>
            <div className="summary">
                <div className="income">
                    <h4>Income</h4>
                    <p>${income}</p>
                </div>
                <div className="expense">
                    <h4>Expense</h4>
                    <p>${expense}</p>
                </div>
            </div>
            <form className="add-transaction" onSubmit={onSubmit}>
                <input type="text" placeholder="Description" required 
                onChange={(e)=>setDescription(e.target.value)}/>
                <input type="number" placeholder="Amount +ve/-" required
                onChange={(e)=>setTransactionAmount(e.target.value)}/>
                <input type="radio" value="expense" id="expense"
                checked={transactionType==="expense"}
                onChange={(e)=>setTransactionType(e.target.value)}/>
                <label htmlFor="expense">Expense</label>
                <input type="radio" value="income" id="income"
                checked={transactionType==="income"}
                onChange={(e)=>setTransactionType(e.target.value)} />
                <label htmlFor="income">Income</label>
                <button type="submit"> Add Transaction</button>
            </form>
        </div>
        {profilePhoto && <div className="profile">
             <img className="profile-photo" src={profilePhoto}/>
             <button className="sign-out-button" onClick={signUserOut}> 
             Sign Out</button>
             </div>}
    </div>
    <div className="transactions"> 
        <h3>Transactions</h3>
        <ul>
            {transactions.map((transaction)=>{
                const{description,transactionType,transactionAmount}=transaction;
                return(
                    <li>
                        <h4> {description} </h4>
                        <p> ${transactionAmount}?<label style={{color:transactionType==="expense" ?"red":"green"}}>{transactionType}</label></p>
                    </li>
                )
            })}
        </ul>
    </div>
    </>
}