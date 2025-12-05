import React, { useEffect, useState, useMemo } from "react";
import { getAllLoans } from "../../../api/adminApi";
import { useNavigate } from "react-router-dom";
import { FaFileInvoiceDollar, FaSpinner, FaExclamationCircle } from "react-icons/fa";
import { AgGridReact } from 'ag-grid-react';
import { ModuleRegistry, AllCommunityModule } from 'ag-grid-community';

// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

const AllLoansList = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            setLoading(true);
            const data = await getAllLoans();
            setLoans(data || []);
        } catch (err) {
            console.error("Error fetching all loans:", err);
            setError("Failed to load loans.");
        } finally {
            setLoading(false);
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case "APPROVED": return "bg-green-100 text-green-800";
            case "PENDING": return "bg-yellow-100 text-yellow-800";
            case "REJECTED": return "bg-red-100 text-red-800";
            case "DISBURSED": return "bg-blue-100 text-blue-800";
            case "VERIFIED": return "bg-green-100 text-green-800";
            case "EVALUATED": return "bg-indigo-100 text-indigo-800";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    // Column Definitions
    const columnDefs = useMemo(() => [
        {
            headerName: "Loan ID",
            field: "loanId",
            sortable: true,
            filter: true,
            width: 100,
            cellRenderer: (params) => <span className="font-medium text-gray-900">#{params.value}</span>
        },
        {
            headerName: "CIF",
            field: "cifNumber",
            sortable: true,
            filter: true,
            width: 120
        },
        {
            headerName: "Type",
            field: "loanType",
            sortable: true,
            filter: true,
            width: 120,
            cellRenderer: (params) => (
                <div className="flex items-center gap-2">
                    <FaFileInvoiceDollar className="text-gray-400" />
                    {params.value}
                </div>
            )
        },
        {
            headerName: "Amount",
            field: "requestedAmount",
            sortable: true,
            filter: 'agNumberColumnFilter',
            width: 150,
            valueFormatter: (params) => `₹${params.value?.toLocaleString()}`,
            cellStyle: { fontWeight: '500' }
        },
        {
            headerName: "Status",
            field: "status",
            sortable: true,
            filter: true,
            width: 150,
            cellRenderer: (params) => (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(params.value)}`}>
                    {params.value}
                </span>
            )
        },
        {
            headerName: "History",
            valueGetter: (params) => {
                const active = params.data.activeLoans?.length || 0;
                const closed = params.data.closedLoans?.length || 0;
                return `Active: ${active}, Closed: ${closed}`;
            },
            width: 180,
            cellRenderer: (params) => (
                <div className="text-xs text-gray-500">
                    <div>Active: {params.data.activeLoans?.length || 0}</div>
                    <div>Closed: {params.data.closedLoans?.length || 0}</div>
                </div>
            )
        },
        {
            headerName: "Action",
            field: "loanId",
            width: 120,
            cellRenderer: (params) => (
                <button
                    onClick={() => navigate(`/admin/loans/${params.value}/evaluate`, { state: { loan: params.data } })}
                    className="text-blue-600 hover:text-blue-900 text-sm font-medium"
                >
                    View Details
                </button>
            ),
            sortable: false,
            filter: false
        }
    ], [navigate]);

    const defaultColDef = useMemo(() => ({
        resizable: true,
        sortable: true
    }), []);

    if (loading) return <div className="flex justify-center p-8"><FaSpinner className="animate-spin text-blue-600 text-2xl" /></div>;
    if (error) return <div className="text-red-500 p-4 flex items-center gap-2"><FaExclamationCircle /> {error}</div>;

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden mt-8">
            <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                <h2 className="text-lg font-semibold text-gray-900">All Loan Applications</h2>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                    Total: {loans.length}
                </span>
            </div>


            <div className="no-tailwind">
                <div className="ag-theme-quartz" style={{ height: 600 }}>
                    <AgGridReact
                        rowData={loans}
                        columnDefs={columnDefs}
                        defaultColDef={defaultColDef}
                        pagination={true}
                        paginationPageSize={10}
                        animateRows={true}
                        rowSelection="single"
                        onRowClicked={(event) => navigate(`/admin/loans/${event.data.loanId}/evaluate`, { state: { loan: event.data } })}
                    />
                </div>
            </div>
        </div>
    );
};

export default AllLoansList;
