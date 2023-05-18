import { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const InitialForm = {
  amount: 0,
  descritpion: "",
  date: new dayjs(),
};

export default function TransactionForm({ fetchTransaction, editTransaction }) {
  const [form, setForm] = useState(InitialForm);

  useEffect(() => {
    if (editTransaction.amount !== undefined) {
      const form2 = {
        amount: editTransaction.amount,
        descritpion: editTransaction.descritpion,
        date: dayjs(editTransaction.date),
      };
      setForm(form2);
    }
  }, [editTransaction]);

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = editTransaction.amount === undefined ? create() : update();
    reload(res);
  }

  function reload(res) {
    if (res.ok) {
      setForm(InitialForm);
      fetchTransaction();
    }
  }
  async function create() {
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    reload(res);
  }
  async function update() {
    const res = await fetch(
      `http://localhost:4000/transaction/${editTransaction._id}`,
      {
        method: "PATCH",
        body: JSON.stringify(form),
        headers: {
          "content-type": "application/json",
        },
      }
    );
    reload(res);
  }

  function handleDate(newValue) {
    setForm({ ...form, date: newValue });
  }
  return (
    <Card sx={{ minWidth: 275, marginTop: 10 }}>
      <CardContent>
        <Typography variant="h6">Add New Transaction:</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Amount"
            variant="outlined"
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleInput}
          />
          <TextField
            sx={{ marginRight: 5 }}
            size="small"
            id="outlined-basic"
            label="Description"
            variant="outlined"
            name="descritpion"
            value={form.descritpion}
            onChange={handleInput}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Transaction Date"
              sx={{ marginRight: 5 }}
              slotProps={{ textField: { size: "small" } }}
              value={form.date}
              onChange={handleDate}
            />
          </LocalizationProvider>
          {editTransaction.amount !== undefined && (
            <Button type="submit" variant="secondary">
              Update
            </Button>
          )}
          {editTransaction.amount === undefined && (
            <Button type="submit" variant="contained">
              Submit
            </Button>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
