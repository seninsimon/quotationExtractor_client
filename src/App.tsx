import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import Layout from "./components/Layout";
import Loader from "./components/Loader";

import CreateQuotation from "./pages/CreateQuotationPage";
import SubmitQuote from "./pages/SupplierSubmissionPage";
import QuotesList from "./pages/QuotesList";
import QuatationInfo from "./pages/QuatationInfo";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const wakeUpServer = async () => {
      try {
        await axios.get(`${import.meta.env.VITE_API_URL}/api/health`);
      } catch (error) {
        console.log("Server waking up...");
      } finally {
        setLoading(false);
      }
    };

    wakeUpServer();
  }, []);

  if (loading) return <Loader />;

  return (
    <Routes>
      <Route path="/quote/:shareId" element={<SubmitQuote />} />

      <Route
        path="/"
        element={
          <Layout>
            <CreateQuotation />
          </Layout>
        }
      />
      <Route
        path="/quotes"
        element={
          <Layout>
            <QuotesList />
          </Layout>
        }
      />
      <Route
        path="/quatation/:id"
        element={
          <Layout>
            <QuatationInfo />
          </Layout>
        }
      />
    </Routes>
  );
}

export default App;