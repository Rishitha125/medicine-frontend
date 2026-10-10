
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function AddMedicine() {
    const [medicine, setMedicine] = useState({
        name: "",
        category: "",
        availableStock: "",
        price: "",
        expiryDate: ""
    });

    const [message, setMessage] = useState("");

    const API_URL = "https://medicine-inventory-backend-0htm.onrender.com/api/medicines";

    const handleChange = (e) => {
        setMedicine({
            ...medicine,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post(API_URL, {
                name: medicine.name,
                category: medicine.category,
                availableStock: Number(medicine.availableStock),
                price: Number(medicine.price),
                expiryDate: medicine.expiryDate
            });

            setMessage("Medicine added successfully.");

            setMedicine({
                name: "",
                category: "",
                availableStock: "",
                price: "",
                expiryDate: ""
            });
        } catch (error) {
            console.error("Error adding medicine:", error);
            setMessage("Error adding medicine.");
        }
    };

    return (
        <div className="add-medicine-page">
            <nav className="dashboard-nav">
                <Link to="/">Dashboard</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/add-medicine">Add Medicine</Link>
                <Link to="/billing">Billing</Link>
            </nav>

            <h1>Add Medicine</h1>

            <form onSubmit={handleSubmit}>
                <label>Medicine Name</label>
                <input
                    type="text"
                    name="name"
                    value={medicine.name}
                    onChange={handleChange}
                    placeholder="Enter medicine name"
                    required
                />

                <label>Category</label>
                <input
                    type="text"
                    name="category"
                    value={medicine.category}
                    onChange={handleChange}
                    placeholder="Enter category"
                    required
                />

                <label>Adding Stock</label>
                <input
                    type="number"
                    name="availableStock"
                    value={medicine.availableStock}
                    onChange={handleChange}
                    placeholder="Enter stock being added"
                    min="0"
                    required
                />

                <label>Price of One Tablet (₹)</label>
                <input
                    type="number"
                    name="price"
                    value={medicine.price}
                    onChange={handleChange}
                    placeholder="Enter price of one tablet"
                    min="0"
                    step="0.01"
                    required
                />

                <label>Expiry Date</label>
                <input
                    type="date"
                    name="expiryDate"
                    value={medicine.expiryDate}
                    onChange={handleChange}
                    required
                />

                <button type="submit">Add Medicine</button>
            </form>

            {message && <p>{message}</p>}
        </div>
    );
}

export default AddMedicine;
