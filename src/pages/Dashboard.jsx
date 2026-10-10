import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Dashboard() {

    const [medicines, setMedicines] = useState([]);

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {

        try {

            const response = await axios.get(
                "https://medicine-inventory-backend-0htm.onrender.com/api/medicines"
            );

            setMedicines(response.data);

        } catch (error) {

            console.error(
                "Error fetching medicines:",
                error
            );

        }
    };


    /* Inventory calculations */

    const totalMedicines = medicines.length;

    const availableMedicines = medicines.filter(
        (medicine) =>
            medicine.availableStock > 10
    ).length;

    const lowStockMedicines = medicines.filter(
        (medicine) =>
            medicine.availableStock > 0 &&
            medicine.availableStock <= 10
    ).length;

    const outOfStockMedicines = medicines.filter(
        (medicine) =>
            medicine.availableStock === 0
    ).length;


    return (

        <div className="dashboard-page">

            {/* ============================= */}
            {/* Project Introduction */}
            {/* ============================= */}

            <section className="dashboard-intro">

                <h1>
                    Medicine Inventory Management System
                </h1>

                <p>
                    A simple system for managing medicines,
                    monitoring stock, and handling medicine
                    billing efficiently.
                </p>

            </section>


            {/* ============================= */}
            {/* Navigation */}
            {/* ============================= */}

            <nav className="dashboard-nav">

                <Link to="/">
                    Dashboard
                </Link>

                <Link to="/inventory">
                    Inventory
                </Link>

                <Link to="/add-medicine">
                    Add Medicine
                </Link>

                <Link to="/billing">
                    Billing
                </Link>

            </nav>


            {/* ============================= */}
            {/* About the Project */}
            {/* ============================= */}

            <section className="about-project">

                <h2>
                    About the Project
                </h2>

                <p>
                    This application helps manage medicine
                    details such as name, category, price,
                    expiry date, and available stock. It also
                    allows users to monitor inventory and
                    generate bills based on the requested
                    medicine quantity.
                </p>

            </section>


            {/* ============================= */}
            {/* Inventory Overview */}
            {/* ============================= */}

            <h2 className="overview-title">
                Inventory Overview
            </h2>


            {/* ============================= */}
            {/* Overview Cards */}
            {/* ============================= */}

            <div className="overview-cards">

                <div className="overview-card">

                    <h3>
                        Total
                    </h3>

                    <p>
                        {totalMedicines}
                    </p>

                </div>


                <div className="overview-card">

                    <h3>
                        Available
                    </h3>

                    <p>
                        {availableMedicines}
                    </p>

                </div>


                <div className="overview-card">

                    <h3>
                        Low Stock
                    </h3>

                    <p>
                        {lowStockMedicines}
                    </p>

                </div>


                <div className="overview-card">

                    <h3>
                        Out of Stock
                    </h3>

                    <p>
                        {outOfStockMedicines}
                    </p>

                </div>

            </div>

        </div>
    );
}

export default Dashboard;