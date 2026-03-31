import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import CreateQuotation from "./pages/CreateQuotationPage";
import SubmitQuote from "./pages/SupplierSubmissionPage";
import QuotesList from "./pages/QuotesList";
import QuatationInfo from "./pages/QuatationInfo";

function App() {
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
