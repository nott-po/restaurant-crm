import { Routes, Route, Outlet } from "react-router-dom";
import Navigation from "./features/components/Navigation";

function Layout(){
    return(
        <div className="app">
            <Navigation/>
            <main className="main-content">
                <Outlet/>
            </main>
        </div>
    )
}

function PublicLayout(){
    return(
        <div className="public-layout">
            <Outlet/>
        </div>
    )
}

export default function App(){
      return (
    <Routes>
      {/* public routes - no navigation needed */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<div>Login Page - TODO</div>} />
      </Route>

      {/* protected routes with navigation layout */}
      <Route element={<Layout />}>
        <Route path="/" element={<div>Home/Dashboard - TODO</div>} />
        <Route path="/shift" element={<div>Shift Management - TODO</div>} />
        <Route path="/payroll" element={<div>Payroll - TODO</div>} />
        <Route path="/tasks" element={<div>Tasks - TODO</div>} />
        <Route path="/analytics" element={<div>Analytics - TODO</div>} />
        <Route path="/staff" element={<div>Staff List - TODO</div>} />
        <Route path="/staff/:employeeId" element={<div>Employee Detail - TODO</div>} />
        <Route path="/vacation" element={<div>Vacation Requests - TODO</div>} />
        <Route path="/sick-days" element={<div>Sick Days - TODO</div>} />
      </Route>

      {/* 404 catch-all */}
      <Route path="*" element={<div>404 - Page Not Found</div>} />
    </Routes>
  );
}