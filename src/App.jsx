import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./shared/ui/Navigation";
import Login from "./features/auth/LoginPage";
import ProtectedRoute from "./shared/ui/wrappers/ProtectedRoute";
import ErrorBoundary from "./shared/ui/ErrorBoundary";
import Dashboard from "./features/dashboard/DashboardPage";
import StaffList from "./features/staff/StaffPage";
import Tables from "./features/tables/TablesPage";
import TableDetail from "./features/tables/TableDetailPage";
import Orders from "./features/orders/OrdersPage";
import Branches from "./features/branches/BranchesPage";
import NotFound from "./shared/pages/NotFound";

function Layout(){
    return(
        <ErrorBoundary>
            <div className="app">
                <Navigation />
                <main className="main-content">
                    <Outlet />
                </main>
            </div>
        </ErrorBoundary>
    );
}

function PublicLayout(){
    return(
        <div className="public-layout">
            <Outlet />
        </div>
    );
}

export default function App(){
    return(
        <Routes>
            <Route element={<PublicLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>

            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/staff" element={<StaffList />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/tables/:tableNumber" element={<TableDetail />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/branches" element={<Branches />} />
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}
