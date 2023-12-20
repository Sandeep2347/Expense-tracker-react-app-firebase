import { query ,collection,where, orderBy, onSnapshot} from "firebase/firestore";
import {db} from "../config/firebase-config";
import { useEffect } from "react";
import { useState } from "react";
import {useGetUserInfo} from "./useGetUserInfo"
export const useGetTransactions = () => {
    const {userID}=useGetUserInfo();
    const transactioncCollectionref=collection(db,"transactions");
    const [transactions,setTransactions]=useState([]);
    const [transactionTotals,setTransactionTotals]=useState({
        balance:0.0,
        income:0.0,
        expense:0.0
    })
    const getTransactions= async ()=>{
        let unsubscribe
        try{
            const queryTransactions=query(transactioncCollectionref
                ,where("userID","==",userID),
                orderBy("createdAt"));
               unsubscribe= onSnapshot(queryTransactions,(snapshot)=>{
                let docs=[];
                let totalIncome=0;
                let totalExpense=0;
                
                snapshot.forEach((doc)=>{
                    const data=doc.data();
                    const id=doc.id
                    docs.push({...data,id});

                    if(data.transactionType==="expense")
                    {
                        totalExpense+=Number(data.transactionAmount);
                    }else{
                        totalIncome+=Number(data.transactionAmount);
                    }
                })
                setTransactions(docs);

                let balance=totalIncome-totalExpense;
                setTransactionTotals({
                    balance,
                    expense:totalExpense,
                    income:totalIncome,
                })
            })
        }catch(err){
            console.log(err);
        }
        return ()=>unsubscribe();
    }
    useEffect(()=>{
        getTransactions()
    },[])
    return { transactions,transactionTotals};
}