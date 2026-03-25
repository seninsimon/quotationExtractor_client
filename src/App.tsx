import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";

import CreateQuotation from "./pages/CreateQuotationPage";
import SubmitQuote from "./pages/SupplierSubmissionPage";
import QuotesList from "./pages/QuotesList";
import QuatationInfo from "./pages/QuatationInfo";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<CreateQuotation />} />
        <Route path="/quote/:shareId" element={<SubmitQuote />} />
        <Route path="/quatation/:id" element={<QuatationInfo />} />
        <Route path="/quotes" element={<QuotesList />} />
      </Routes>
    </Layout>
  );
}

export default App;