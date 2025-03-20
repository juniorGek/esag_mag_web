import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { API_URL } from "../../config/ApiUrl";
import { useNavigate } from "react-router-dom";

function Sondage() {
  const [poll, setPoll] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  const handlePoll = async () => {
    try {
      const response = await fetch(`${API_URL}/getPollListe`);
      const data = await response.json();
      if (response.status === 200) {
        setPoll(data.polls);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handlePoll();
  }, []);

  const handleSondage = (item)=>{
    navigate(`/sondage_details/${item.id}`)
  }

  return (
    <div style={{ padding: 24 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Sondages
      </Typography>
      {loading ? (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: 16,
            }}
          ></div>
        </>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 16,
          }}
        >
          {poll.map((sondage) => (
            <Card key={sondage.id}>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {sondage.title}
                </Typography>
                <Typography color="textSecondary">
                  {sondage.description}
                </Typography>
                <Button
                  onClick={() => handleSondage(sondage)}
                  variant="contained"
                  color="primary"
                  fullWidth
                  style={{ marginTop: 16 }}
                >
                  Voir Sondage
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default Sondage;
