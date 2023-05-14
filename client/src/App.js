import { useState } from "react";
function App() {
  const [form, setForm] = useState({
    amount: 0,
    descritpion: "",
    date: "",
  });

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("http://localhost:4000/transaction", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "content-type": "application/json",
      },
    });
    const data = await res.json();
    console.log(data);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleInput}
          placeholder="Enter transaction amout"
        />
        <input
          type="text"
          value={form.descritpion}
          onChange={handleInput}
          name="descritpion"
          placeholder="Enter transaction detail"
        />
        <input
          type="date"
          value={form.date}
          onChange={handleInput}
          name="date"
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default App;
