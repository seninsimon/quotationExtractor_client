function Loader() {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <p style={styles.text}>Waking up server...</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#F9FAFB",
  },
  card: {
    padding: "20px 30px",
    borderRadius: "8px",
    background: "#fff",
    border: "1px solid #D1D5DB",
    boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
  },
  text: {
    color: "#1F2937",
    fontSize: "16px",
    fontWeight: 500,
  },
};

export default Loader;