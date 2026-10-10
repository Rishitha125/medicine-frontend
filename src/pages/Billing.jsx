
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Billing() {
    const [medicines, setMedicines] = useState([]);
    const [medicineName, setMedicineName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [bill, setBill] = useState(null);
    const [message, setMessage] = useState("");

    const API_URL = "https://medicine-inventory-backend-0htm.onrender.com/api/medicines";
    const BILLING_URL = "https://medicine-inventory-backend-0htm.onrender.com/api/billing";

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        try {
            const response = await axios.get(API_URL);
            setMedicines(response.data);
        } catch (error) {
            console.error("Error fetching medicines:", error);
            setMessage("Unable to load medicines. Please try again.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setBill(null);

        try {
            const response = await axios.post(BILLING_URL, {
                medicineName: medicineName,
                quantity: Number(quantity)
            });

            setBill(response.data);
            setQuantity("");
            await fetchMedicines();
        } catch (error) {
            console.error("Error generating bill:", error);

            if (error.response && error.response.data) {
                const errorData = error.response.data;
                setMessage(
                    typeof errorData === "string"
                        ? errorData
                        : errorData.message || "Unable to process the bill."
                );
            } else {
                setMessage("Unable to process the bill. Please try again.");
            }
        }
    };

    const selectedMedicine = medicines.find(
        (medicine) => medicine.name === medicineName
    );

    return (
        <div className="billing-page">
            <nav className="dashboard-nav">
                <Link to="/">Dashboard</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/add-medicine">Add Medicine</Link>
                <Link to="/billing">Billing</Link>
            </nav>

            <h1>Medicine Billing</h1>

            <form onSubmit={handleSubmit}>
                <label>Medicine Name</label>

                <select
                    value={medicineName}
                    onChange={(e) => setMedicineName(e.target.value)}
                    required
                >
                    <option value="">Select Medicine</option>

                    {medicines.map((medicine) => (
                        <option key={medicine.id} value={medicine.name}>
                            {medicine.name}
                        </option>
                    ))}
                </select>

                <label>Category</label>

                <input
                    type="text"
                    value={selectedMedicine?.category || ""}
                    readOnly
                />

                <label>Quantity Requested</label>

                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="Enter quantity requested"
                    min="1"
                    required
                />

                <button type="submit">Generate Bill</button>
            </form>

            {message && (
                <p className="error-message">{message}</p>
            )}

            {bill && (
                <div className="bill-result">
                    <h2>Bill Details</h2>

                    <p>
                        <strong>Medicine:</strong> {bill.medicineName}
                    </p>

                    <p>
                        <strong>Category:</strong> {bill.category}
                    </p>

                    <p>
                        <strong>Quantity:</strong> {bill.quantity}
                    </p>

                    <p>
                        <strong>Price per Tablet:</strong> ₹{bill.pricePerTablet}
                    </p>

                    <p>
                        <strong>Total Amount:</strong> ₹{bill.totalAmount}
                    </p>
                </div>
            )}
        </div>
    );
}

export default Billing;
