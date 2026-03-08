
import React from 'react';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard-container">
      <h1>LM_ASSET Dashboard</h1>
      <div className="dashboard-cards">
        <div className="card">Total Properties</div>
        <div className="card">Active Bookings</div>
        <div className="card">Monthly Revenue</div>
        <div className="card">Expenses</div>
        <div className="card">Net Profit</div>
        <div className="card">Occupancy Rate</div>
        <div className="card">ADR</div>
      </div>
      <div className="dashboard-charts">
        <div className="chart">Receita Mensal</div>
        <div className="chart">Ocupação</div>
        <div className="chart">Receita por Imóvel</div>
      </div>
    </div>
  );
};

export default Dashboard;
