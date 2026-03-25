import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import CreateQuotation from "./pages/CreateQuotationPage";
import SubmitQuote from "./pages/SupplierSubmissionPage";
import Dashboard from "./pages/QuatationInfo";
import QuotesList from "./pages/QuotesList";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CreateQuotation />} />
        <Route path="/quote/:shareId" element={<SubmitQuote />} />
        <Route path="/dashboard/:id" element={<Dashboard />} />
        <Route path="/quotes" element={<QuotesList />} />
      </Routes>
    </Layout>
  );
}

export default App;