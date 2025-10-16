import React from "react";
import HomePage from "@/pages/HomePage";
import { Navigate, Route, Routes } from "react-router-dom";
import ProductPage from "@/pages/ProductPage";
import ProductDetailsPage from "@/pages/ProductDetailsPage";
import ProfilePage from "@/pages/ProfilePage";
import SettingsPage from "@/pages/SettingsPage";
import Navbar from "@/pages/Navbar";
import { Toaster } from "sonner";

const RouteHandler = () => {
  return (
    <>
      <Routes>
        <Route
          path="/home"
          element={<Navigate to="/home/products" replace />}
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<Navbar />}>
          <Route path="profile" element={<ProfilePage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="products" element={<ProductPage />} />
          <Route path="products/:id" element={<ProductDetailsPage />} />
        </Route>
      </Routes>
      <Toaster />
    </>
  );
};

export default RouteHandler;
