
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Inventory() {
    const [medicines, setMedicines] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [editingMedicine, setEditingMedicine] = useState(null);

    const API_URL = "https://medicine-inventory-backend-0htm.onrender.com/api/medicines";

    const fetchMedicines = async () => {
        try {
            const response = await axios.get(API_URL);
            setMedicines(response.data);
        } catch (error) {
            console.error("Error fetching medicines:", error);
        }
    };

    useEffect(() => {
        fetchMedicines();
    }, []);

    const getStatus = (stock) => {
        if (stock === 0) return "Out of Stock";
        if (stock <= 10) return "Low Stock";
        return "In Stock";
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            fetchMedicines();
        } catch (error) {
            console.error("Error deleting medicine:", error);
        }
    };

    const handleEdit = (medicine) => {
        setEditingMedicine({ ...medicine });
    };

    const handleUpdate = async () => {
        try {
            await axios.put(
                `${API_URL}/${editingMedicine.id}`,
                {
                    name: editingMedicine.name,
                    category: editingMedicine.category,
                    price: Number(editingMedicine.price),
                    expiryDate: editingMedicine.expiryDate,
                    availableStock: Number(editingMedicine.availableStock)
                }
            );

            setEditingMedicine(null);
            fetchMedicines();
        } catch (error) {
            console.error("Error updating medicine:", error);
        }
    };

    const filteredMedicines = medicines.filter((medicine) =>
        medicine.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="inventory-page">
            <nav className="dashboard-nav">
                <Link to="/">Dashboard</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/add-medicine">Add Medicine</Link>
                <Link to="/billing">Billing</Link>
            </nav>

            <h1>Medicine Inventory</h1>

            <div className="search-section">
                <input
                    type="text"
                    placeholder="Search medicine by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price / Tablet</th>
                        <th>Expiry Date</th>
                        <th>Available Stock</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {filteredMedicines.length > 0 ? (
                        filteredMedicines.map((medicine) => (
                            <tr key={medicine.id}>
                                <td>{medicine.name}</td>
                                <td>{medicine.category}</td>
                                <td>₹{medicine.price}</td>
                                <td>{medicine.expiryDate}</td>
                                <td>{medicine.availableStock}</td>
                                <td>{getStatus(medicine.availableStock)}</td>
                                <td>
                                    <button onClick={() => handleEdit(medicine)}>
                                        Edit
                                    </button>

                                    <button onClick={() => handleDelete(medicine.id)}>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No medicines found.</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {editingMedicine && (
                <div className="edit-section">
                    <h2>Edit Medicine</h2>

                    <label>Medicine Name</label>
                    <input
                        type="text"
                        value={editingMedicine.name}
                        onChange={(e) =>
                            setEditingMedicine({
                                ...editingMedicine,
                                name: e.target.value
                            })
                        }
                    />

                    <label>Category</label>
                    <input
                        type="text"
                        value={editingMedicine.category}
                        onChange={(e) =>
                            setEditingMedicine({
                                ...editingMedicine,
                                category: e.target.value
                            })
                        }
                    />

                    <label>Price of One Tablet</label>
                    <input
                        type="number"
                        value={editingMedicine.price}
                        onChange={(e) =>
                            setEditingMedicine({
                                ...editingMedicine,
                                price: e.target.value
                            })
                        }
                    />

                    <label>Expiry Date</label>
                    <input
                        type="date"
                        value={editingMedicine.expiryDate}
                        onChange={(e) =>
                            setEditingMedicine({
                                ...editingMedicine,
                                expiryDate: e.target.value
                            })
                        }
                    />

                    <label>Available Stock</label>
                    <input
                        type="number"
                        value={editingMedicine.availableStock}
                        onChange={(e) =>
                            setEditingMedicine({
                                ...editingMedicine,
                                availableStock: e.target.value
                            })
                        }
                    />

                    <button onClick={handleUpdate}>Save Changes</button>
                    <button onClick={() => setEditingMedicine(null)}>
                        Cancel
                    </button>
                </div>
            )}
        </div>
    );
}

export default Inventory;
