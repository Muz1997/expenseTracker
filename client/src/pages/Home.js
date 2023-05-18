import React from "react";
import { useEffect, useState } from "react";
import TransactionForm from "../components/TransactionForm";
import TransactionsList from "../components/TransactionsList";
import { Container } from "@mui/material";

export default function Home() {
  const [transactions, setTransactions] = useState([]);
  const [editTransaction, setEditTraction] = useState({});

  useEffect(() => {
    fetchTransaction();
  }, []);

  async function fetchTransaction() {
    const res = await fetch("http://localhost:4000/transaction");
    const { data } = await res.json();
    setTransactions(data);
  }

  return (
    <Container>
      <TransactionForm
        fetchTransaction={fetchTransaction}
        editTransaction={editTransaction}
      />
      <TransactionsList
        transactions={transactions}
        fetchTransaction={fetchTransaction}
        setEditTraction={setEditTraction}
      />
    </Container>
  );
}
