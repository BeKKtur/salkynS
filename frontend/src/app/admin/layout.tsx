"use client";
import AdminHeader from "@/components/layout/adminHeader/AdminHeader";
import React from "react";
type ChildrenProps = {
  children: React.ReactNode;
};

const AdminLayout = ({ children }: ChildrenProps) => {
  return (
    <div className="layout">
      <AdminHeader />
      <main>{children}</main>
    </div>
  );
};

export default AdminLayout;
