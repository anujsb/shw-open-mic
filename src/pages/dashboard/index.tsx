import React from "react";
import DashboardLayout from "~/components/layout/dashboard";
import OpenMicBot from "~/components/molecules/OpenMicBot";

const Dashboard = () => {
  return (
    <div>
      <DashboardLayout>
        <OpenMicBot />
      </DashboardLayout>
    </div>
  );
};

export default Dashboard;
